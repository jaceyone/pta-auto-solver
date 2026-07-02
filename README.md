# PTA Auto Solver — Claude Code Skill

<p align="center">
  <a href="https://www.npmjs.com/package/@jaceyone/pta-auto-solver">
    <img src="https://img.shields.io/npm/v/@jaceyone/pta-auto-solver" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/@jaceyone/pta-auto-solver-en">
    <img src="https://img.shields.io/npm/v/@jaceyone/pta-auto-solver-en" alt="npm en">
  </a>
  <a href="https://github.com/jaceyone/pta-auto-solver/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/jaceyone/pta-auto-solver" alt="MIT">
  </a>
</p>

---

## 🇨🇳 中文版

自动在 PTA（拼题A）平台完成**登录 → 抓题 → 解答 → 提交**全流程。

```bash
npx -y @jaceyone/pta-auto-solver
```

## 🇬🇧 English Version

Automate PTA (pintia.cn) platform: **Login → Fetch → Solve → Submit**.

```bash
npx -y @jaceyone/pta-auto-solver-en
```

---

## Prerequisites

```bash
npx playwright install chromium
```

Add to `~/.claude/settings.json`:
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

## Directory Structure

```
pta-auto-solver/
├── skill/          # 中文版 skill
├── skill-en/       # English skill
├── packages/
│   ├── cn/         # @jaceyone/pta-auto-solver (中文 npx 包)
│   └── en/         # @jaceyone/pta-auto-solver-en (English npx package)
├── README.md
├── LICENSE
└── .gitignore
```

## License

[MIT](./LICENSE)
