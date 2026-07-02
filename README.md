# PTA Auto Solver — Claude Code Skill

一键安装 PTA 自动解题 Skill（中英文双语版）：

```bash
npx jaceyone/pta-auto-solver
```

装完重启 Claude Code，说 **"做 PTA 题"** 即可使用。

## 前置依赖

```bash
npx playwright install chromium
```

在 `~/.claude/settings.json` 中添加：

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

## 目录结构

```
pta-auto-solver/
├── skill/          # 中文版 skill
├── skill-en/       # English skill
├── bin/install.js  # npx 安装脚本
├── package.json
└── README.md
```

## License

MIT
