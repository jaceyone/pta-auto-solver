# PTA Auto Solver — Claude Code Skill

[中文](#中文) · [English](#english)

---

## 中文

**PTA 自动解题与提交** — 一个 [Claude Code](https://claude.ai/code) Skill，通过 Playwright MCP 自动打开 [PTA（拼题A）](https://pintia.cn/) 平台，完成 **登录 → 抓题 → 解答 → 提交** 全流程。

### 功能特性

- ✅ **自动登录** — 引导用户登录 PTA 平台（不存储凭据）
- ✅ **批量抓题** — 自动翻页抓取指定分类的全部题目
- ✅ **选择题 / 判断题** — 自动点选正确选项并保存
- ✅ **编程题（CodeMirror 6）** — 通过 CM6 内部 API 注入代码，解决普通粘贴失效问题
- ✅ **带图片题目** — 识别图片内容并解答，无法识别的交回用户处理

### 快速开始

1. **安装依赖**：确保 Node.js 已安装，然后安装 Playwright MCP：

   ```json
   // 添加到 ~/.claude/settings.json 的 mcpServers
   {
     "playwright": {
       "command": "npx",
       "args": ["-y", "@playwright/mcp@latest"]
     }
   }
   ```

2. **安装浏览器内核**：

   ```bash
   npx playwright install chromium
   ```

3. **安装 Skill**：将 `skill/` 目录放入 Claude Code 的 skills 目录，或在 Claude Code 中通过 `/skill` 加载。

4. **启动**：在 Claude Code 中运行 `pta-auto-solver` 即可。

### 目录结构

```
pta-auto-solver/
├── skill/              # 中文版 Skill（Claude Code 用）
│   ├── SKILL.md        # — 技能指令
│   ├── scripts/        # — 注入脚本
│   └── references/     # — 技术参考
├── skill-en/           # 英文版 Skill
├── README.md           # 本文件
└── LICENSE             # MIT
```

### 安全声明

- 绝不存储或回显用户的 PTA 账号密码
- 遇到无法解答的题目如实告知，不伪造答案

---

## English

**PTA Auto Solver & Submission** — A [Claude Code](https://claude.ai/code) skill that automates the full [PTA (Pintia)](https://pintia.cn/) platform workflow via Playwright MCP: **Login → Fetch Problems → Solve → Submit**.

### Features

- ✅ **Auto Login** — Guides the user through PTA login (no credential storage)
- ✅ **Batch Fetch** — Automatically paginates and fetches all problems in a category
- ✅ **MCQ / True-False** — Automatically clicks correct options and saves
- ✅ **Programming Problems (CodeMirror 6)** — Injects code via CM6 internal API, bypassing paste restrictions
- ✅ **Image-based Problems** — Recognizes image content; falls back to user when unsolvable

### Quick Start

1. **Dependencies**: Ensure Node.js is installed, then configure Playwright MCP:

   ```json
   // Add to ~/.claude/settings.json under mcpServers
   {
     "playwright": {
       "command": "npx",
       "args": ["-y", "@playwright/mcp@latest"]
     }
   }
   ```

2. **Install browser**:

   ```bash
   npx playwright install chromium
   ```

3. **Install Skill**: Place the `skill-en/` directory into your Claude Code skills directory.

4. **Launch**: Run `pta-auto-solver` within Claude Code.

### Directory Structure

```
pta-auto-solver/
├── skill/              # Chinese Skill (for Claude Code)
│   ├── SKILL.md        # — Skill instructions
│   ├── scripts/        # — Injection scripts
│   └── references/     # — Technical references
├── skill-en/           # English Skill
├── README.md           # This file
└── LICENSE             # MIT
```

### Security Statement

- Never stores or echoes user PTA credentials
- Reports unsolvable problems truthfully — no fabricated answers

---

## License

[MIT](./LICENSE)
