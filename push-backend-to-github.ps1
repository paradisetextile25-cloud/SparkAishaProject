# ============================================
# SparkAisha Backend - Git Push Automation
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "?? SparkAisha Backend - Git Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to project root
$projectRoot = "C:\SparkAishaProject"
Set-Location $projectRoot
Write-Host "?? Working directory: $projectRoot" -ForegroundColor Green
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "? Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "? ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "? ERROR: Not a Git repository" -ForegroundColor Red
    Write-Host "   Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "? Git repository initialized" -ForegroundColor Green
}

# Check remote
Write-Host "?? Checking Git remote..." -ForegroundColor Cyan
$remotes = git remote -v
if ($remotes -match "origin") {
    Write-Host "? Remote 'origin' is configured:" -ForegroundColor Green
    git remote -v
} else {
    Write-Host "??  Remote 'origin' not found. Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/paradisetextile25-cloud/SparkAishaProject.git
    Write-Host "? Remote added" -ForegroundColor Green
}
Write-Host ""

# Check current branch
Write-Host "?? Checking branch..." -ForegroundColor Cyan
$currentBranch = git branch --show-current
Write-Host "   Current branch: $currentBranch" -ForegroundColor White

if ($currentBranch -ne "main") {
    Write-Host "   Switching to 'main' branch..." -ForegroundColor Yellow
    try {
        git checkout main
    } catch {
        Write-Host "   Creating 'main' branch..." -ForegroundColor Yellow
        git checkout -b main
    }
    Write-Host "? On 'main' branch" -ForegroundColor Green
}
Write-Host ""

# Clean cache of ignored files
Write-Host "?? Cleaning Git cache of ignored files..." -ForegroundColor Cyan
git rm -r --cached backend/SparkAisha.API/bin 2>$null
git rm -r --cached backend/SparkAisha.API/obj 2>$null
git rm -r --cached backend/.vs 2>$null
git rm --cached backend/SparkAisha.API/appsettings.Development.json 2>$null
git rm --cached backend/**/*.user 2>$null
Write-Host "? Cache cleaned" -ForegroundColor Green
Write-Host ""

# Stage backend files
Write-Host "?? Staging backend files..." -ForegroundColor Cyan
git add backend/
git add .gitignore
git add GIT_SETUP_INSTRUCTIONS.md
Write-Host "? Files staged" -ForegroundColor Green
Write-Host ""

# Show what will be committed
Write-Host "?? Files to be committed:" -ForegroundColor Cyan
$stagedFiles = git diff --cached --name-only
if ($stagedFiles) {
    $stagedFiles | ForEach-Object { Write-Host "   ? $_" -ForegroundColor White }
} else {
    Write-Host "   (No new changes to commit)" -ForegroundColor Yellow
}
Write-Host ""

# Security check
Write-Host "?? Security check..." -ForegroundColor Cyan
$dangerousFiles = git diff --cached --name-only | Where-Object { 
    $_ -match "appsettings\.Development\.json" -or 
    $_ -match "\.user$" -or 
    $_ -match "bin/" -or 
    $_ -match "obj/" 
}

if ($dangerousFiles) {
    Write-Host "??  WARNING: Potentially sensitive files detected:" -ForegroundColor Red
    $dangerousFiles | ForEach-Object { Write-Host "   ? $_" -ForegroundColor Red }
    Write-Host ""
    $continue = Read-Host "Do you want to continue anyway? (yes/no)"
    if ($continue -ne "yes") {
        Write-Host "? Aborted by user" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "? No sensitive files detected" -ForegroundColor Green
}
Write-Host ""

# Commit
Write-Host "?? Committing changes..." -ForegroundColor Cyan
$commitMessage = @"
Add backend to monorepo structure

- Added ASP.NET Core 8 Web API project
- Configured JWT authentication and authorization
- Implemented Entity Framework Core with SQL Server
- Added Controllers: Auth, Spas, Services, Bookings, Reviews, Offers, WeatherForecast
- Configured Swagger/OpenAPI documentation
- Secured sensitive configuration (excluded from repo)
- Updated .gitignore for backend artifacts
- Added backend README with setup instructions
"@

try {
    git commit -m $commitMessage
    Write-Host "? Commit successful" -ForegroundColor Green
} catch {
    if ($LASTEXITCODE -eq 0) {
        Write-Host "??  No changes to commit" -ForegroundColor Yellow
    } else {
        Write-Host "? Commit failed" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Push to GitHub
Write-Host "?? Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "   Remote: origin" -ForegroundColor White
Write-Host "   Branch: main" -ForegroundColor White
Write-Host ""

try {
    git push origin main
    Write-Host ""
    Write-Host "? Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "??  Push failed. Trying with upstream tracking..." -ForegroundColor Yellow
    try {
        git push -u origin main
        Write-Host "? Successfully pushed to GitHub!" -ForegroundColor Green
    } catch {
        Write-Host ""
        Write-Host "? Push failed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common solutions:" -ForegroundColor Yellow
        Write-Host "1. Authentication required - use Personal Access Token" -ForegroundColor White
        Write-Host "2. Pull latest changes first: git pull origin main --rebase" -ForegroundColor White
        Write-Host "3. Force push (if safe): git push origin main --force" -ForegroundColor White
        Write-Host ""
        Write-Host "See GIT_SETUP_INSTRUCTIONS.md for detailed troubleshooting" -ForegroundColor Cyan
        exit 1
    }
}
Write-Host ""

# Verify
Write-Host "?? Verification..." -ForegroundColor Cyan
$lastCommit = git log --oneline -1
Write-Host "   Last commit: $lastCommit" -ForegroundColor White

$remoteStatus = git fetch 2>&1
$status = git status -sb
Write-Host "   Status: $status" -ForegroundColor White
Write-Host ""

Write-Host "? ALL DONE! ??" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit: https://github.com/paradisetextile25-cloud/SparkAishaProject" -ForegroundColor White
Write-Host "2. Verify backend/ folder is visible" -ForegroundColor White
Write-Host "3. Check that no secrets are exposed" -ForegroundColor White
Write-Host "4. Configure local appsettings.Development.json for development" -ForegroundColor White
Write-Host ""
Write-Host "Repository structure:" -ForegroundColor Cyan
Write-Host "  SparkAishaProject/" -ForegroundColor White
Write-Host "  ??? frontend/" -ForegroundColor White
Write-Host "  ??? backend/" -ForegroundColor Green
Write-Host "  ?   ??? SparkAisha.API/" -ForegroundColor Green
Write-Host "  ?   ??? README.md" -ForegroundColor Green
Write-Host "  ??? .gitignore" -ForegroundColor White
Write-Host "  ??? README.md" -ForegroundColor White
Write-Host ""

# Open browser to GitHub
$openBrowser = Read-Host "Open GitHub repository in browser? (yes/no)"
if ($openBrowser -eq "yes") {
    Start-Process "https://github.com/paradisetextile25-cloud/SparkAishaProject"
}

Write-Host "Script completed successfully! ?" -ForegroundColor Green
