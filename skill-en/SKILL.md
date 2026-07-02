---
name: pta-auto-solver
description: Automatically open the PTA (pintia.cn) platform via Playwright MCP, fetch problems, auto-solve, and submit answers. This skill MUST be used when the user mentions PTA, Pintia, programming experiment platform, auto-solving, batch answering, auto-submitting code, or wants the browser to log into PTA and complete problems — even if the user doesn't explicitly say "use this skill". Suitable for batch-selecting multiple-choice questions, injecting code for programming problems, and recognizing/solving image-based problems.
---

# PTA Auto Solver & Submission

Automates the full PTA workflow: "Login → Fetch Problems → Solve → Submit." The core challenge is that PTA uses the CodeMirror 6 editor, where ordinary paste often fails, so this skill provides an internal API injection solution.

## Interaction Principle: Act Autonomously by Default, Stop Only When Necessary

This skill aims to minimize back-and-forth interruptions. By default, **proceed autonomously and continuously** through the entire workflow, choosing reasonable defaults for reversible steps without asking for permission at every step. This is because most steps (selecting the kernel, navigating pages, clicking answers, moving to the next problem) are easy to correct even if the judgment is slightly off — frequent confirmation slows the user down and drains patience.

Only stop for input at the following **three truly high-risk or irreversible** points:

1. **Credentials required** — The user must enter their PTA account password personally.
2. **Determining the fetch scope** — The first time, you need to know which category/type of problems the user wants to work on, to avoid fetching a large batch of irrelevant problems.
3. **Encountering an unsolvable problem** — Do not fabricate answers; hand it back to the user.

For everything else, make decisions and proceed independently. If a default choice might be controversial, use the approach of "execute first, then briefly explain what I did and how to undo it," rather than stopping to confirm beforehand.

## Prerequisite: Check and Install Playwright MCP

Before opening the browser, ensure Playwright MCP is ready. Follow this sequence — complete automatically whatever can be done without asking the user:

### 1. Check if already installed

Check whether Playwright MCP already exists in the current MCP configuration (e.g., check the MCP client configuration file for `@playwright/mcp` or `playwright` entries, or try listing its available tools). If it exists and is usable, skip installation and go directly to "Launch."

### 2. Install MCP Service

If not detected, install the official Playwright MCP. The typical approach is to add a service entry in the MCP client configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Or pre-fetch in the terminal: `npx -y @playwright/mcp@latest --help` to confirm it's executable. If the environment lacks Node/npm, first prompt the user to install Node.js (this is an environment issue that needs to be communicated).

### 3. Confirm Browser Kernel

Playwright requires a browser kernel. **Default to chromium** (widest compatibility) — no need to interrupt the user for this. Only switch to another kernel if the user has expressed a preference, or if chromium installation fails. The three kernel options:

- **chromium** — Chrome / Edge / 360 / QQ and all Chromium-based browsers (default)
- **firefox** — Mozilla Firefox (Gecko)
- **webkit** — Mac / iOS Safari (WebKit)

On first run, the kernel needs to be downloaded: `npx playwright install chromium` (or `firefox` / `webkit`). Download may be slow — this is normal.

### 4. Launch and Verify

Launch the browser via Playwright MCP and run a lightweight verification (e.g., open a blank page or proceed directly to the PTA homepage) to confirm the toolchain is working. If launch fails, read the error and attempt common fixes (reinstall kernel, switch kernel, check network). Only report the specific error to the user after multiple failed attempts.

## Step 1: Login and Navigate to Problem List

1. Open https://pintia.cn/home
2. **Stop and let the user enter their account credentials** (one of the required confirmation points — never guess or store credentials)
3. After successful login, automatically proceed to the problem list — no further confirmation needed

## Step 2: Analyze Page Structure

After entering the page, automatically analyze the problem structure via the DOM, identifying problem buttons, options, input fields, code areas, etc.

- PTA's code editor is **CodeMirror 6**, with container class `.cm-editor`
- See `references/selectors.md` for the full selector list

## Step 3: Fetch Problems

1. Automatically check what problem categories are available on the platform
2. **Stop and let the user select which category to fetch** (second required confirmation point, to avoid fetching irrelevant problems)
3. Once confirmed, spawn sub-agents to automatically paginate and fetch all problems in that category — no per-page confirmation needed

## Step 4: Solve and Auto-Submit

Once the scope is determined, solve problems continuously without asking about each one.

### Multiple Choice / True-False (Direct Click)

For true-false, single-choice, and multiple-choice questions, directly click the correct options. Batch-click all correct options using a script, then click the "Save" button to submit.

### Programming Problems (Code Input)

Automatically check whether the current editor supports paste:

- **Pasteable**: Paste the code directly and submit
- **Not pasteable**: Use the CodeMirror 6 internal API injection (`content.cmTile.view.dispatch()`) to handle line breaks and indentation properly. See `scripts/inject_code.js` for the script and `references/codemirror.md` for details.

### Image-Based Problems

- **Image recognition available**: Recognize and solve directly
- **Cannot recognize**: Download the image to the working directory, then **stop and notify the user that automatic solving is not possible** (third required confirmation point). Ask the user to provide the problem content in text, then fill in the solution.

## Session and State Management

- Batch problem-solving makes the context grow long. **Proactively remind** the user: if the context is too long, suggest running `/clear` (this is a reminder, not a request for permission).
- At the start of each session, determine the interface state independently. Only briefly ask when you cannot determine the user's intent (starting a new task vs. continuing a previously `/clear`'d task).

## Security and Boundaries

- Never store or echo the user's PTA credentials
- If a problem cannot be solved, report truthfully — do not fabricate answers
