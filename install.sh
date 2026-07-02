#!/usr/bin/env bash
set -euo pipefail

# PTA Auto Solver — Claude Code Skill Installer
# Usage: bash <(curl -s https://raw.githubusercontent.com/<你的用户名>/pta-auto-solver/main/install.sh)

CLAUDE_SKILLS_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
REPO_URL="https://github.com/jaceyone/pta-auto-solver.git"
TARGET_DIR="$CLAUDE_SKILLS_DIR/pta-auto-solver"

echo "📦 Installing PTA Auto Solver skill..."

# 1. Check prerequisites
if ! command -v git &> /dev/null; then
    echo "❌ git is required. Please install git first."
    exit 1
fi

# 2. Create skills directory if needed
mkdir -p "$CLAUDE_SKILLS_DIR"

# 3. Clone or update
if [ -d "$TARGET_DIR" ]; then
    echo "↻ Updating existing installation..."
    cd "$TARGET_DIR" && git pull
else
    git clone --depth 1 "$REPO_URL" "$TARGET_DIR"
fi

echo ""
echo "✅ Installed to: $TARGET_DIR"
echo ""
echo "📖 Usage in Claude Code:"
echo "   /skill pta-auto-solver/skill    # 中文版"
echo "   /skill pta-auto-solver/skill-en # English version"
echo ""
echo "🔧 Or add to ~/.claude/settings.json:"
echo '   { "skills": [ "'"$TARGET_DIR/skill"'" ] }'
