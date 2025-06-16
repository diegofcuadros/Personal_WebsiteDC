@echo off
echo Installing Claude Code in WSL Ubuntu...
wsl -d Ubuntu -- npm install -g @anthropic-ai/claude-code
echo.
echo Testing claude command...
wsl -d Ubuntu -- claude --version
echo.
echo Running claude command...
wsl -d Ubuntu -- claude
pause 