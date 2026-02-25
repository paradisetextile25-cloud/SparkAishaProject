# Git Setup and Push Instructions

## Prerequisites
? Git must be installed on your system
- Download from: https://git-scm.com/downloads
- Verify installation: `git --version`

## Step-by-Step Instructions

### 1?? Verify Repository Status

```powershell
cd C:\SparkAishaProject
git status
```

### 2?? Check Current Remote

```powershell
git remote -v
```

Expected output:
```
origin  https://github.com/paradisetextile25-cloud/SparkAishaProject.git (fetch)
origin  https://github.com/paradisetextile25-cloud/SparkAishaProject.git (push)
```

If not set, configure remote:
```powershell
git remote add origin https://github.com/paradisetextile25-cloud/SparkAishaProject.git
```

### 3?? Verify Branch is 'main'

```powershell
git branch
```

If on different branch, switch or rename:
```powershell
# Switch to main if it exists
git checkout main

# Or rename current branch to main
git branch -M main
```

### 4?? Stage Backend Files

```powershell
# Remove any cached secrets first
git rm --cached backend/SparkAisha.API/appsettings.Development.json -f
git rm --cached backend/SparkAisha.API/**/*.user -f

# Stage backend files
git add backend/

# Verify what will be committed
git status
```

### 5?? Verify No Secrets Are Staged

Check that these are NOT in staging:
- ? `backend/**/bin/`
- ? `backend/**/obj/`
- ? `backend/**/.vs/`
- ? `backend/**/appsettings.Development.json`
- ? `*.user` files
- ? `*.suo` files

```powershell
# List staged files
git diff --cached --name-only
```

### 6?? Commit Changes

```powershell
git commit -m "Add backend to monorepo structure

- Added ASP.NET Core 8 Web API project
- Configured JWT authentication and authorization
- Implemented Entity Framework Core with SQL Server
- Added Controllers: Auth, Spas, Services, Bookings, Reviews, Offers, WeatherForecast
- Configured Swagger/OpenAPI documentation
- Secured sensitive configuration (excluded from repo)
- Updated .gitignore for backend artifacts
- Added backend README with setup instructions"
```

### 7?? Push to GitHub

```powershell
# Push to main branch
git push origin main

# If this is the first push and tracking is not set
git push -u origin main

# If you need to force push (use with caution!)
git push origin main --force
```

### 8?? Verify Push Success

```powershell
# Check remote status
git fetch
git status

# View commit history
git log --oneline -5
```

Visit GitHub to verify: https://github.com/paradisetextile25-cloud/SparkAishaProject

---

## ?? Authentication Troubleshooting

### Issue: Authentication Required

**Solution 1: Use Personal Access Token (PAT)**

1. Generate a PAT:
   - Go to GitHub ? Settings ? Developer settings ? Personal access tokens ? Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (full control)
   - Copy the token

2. Use when prompted for password:
   ```
   Username: your-github-username
   Password: ghp_YOUR_PERSONAL_ACCESS_TOKEN
   ```

**Solution 2: Configure Git Credential Manager**

```powershell
# Windows Credential Manager (recommended for Windows)
git config --global credential.helper wincred

# Or use Git Credential Manager Core
git config --global credential.helper manager-core
```

**Solution 3: Use SSH Instead of HTTPS**

1. Generate SSH key:
   ```powershell
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

2. Add SSH key to GitHub:
   - Copy public key: `Get-Content ~/.ssh/id_ed25519.pub`
   - GitHub ? Settings ? SSH and GPG keys ? New SSH key

3. Change remote URL:
   ```powershell
   git remote set-url origin git@github.com:paradisetextile25-cloud/SparkAishaProject.git
   ```

### Issue: Permission Denied

Ensure you have write access to the repository:
- Check repository settings
- Verify you're a collaborator or owner

### Issue: Protected Branch

If `main` branch has protection rules:
1. Go to GitHub repository settings
2. Branches ? Branch protection rules
3. Adjust rules or push to a feature branch first

---

## ?? Alternative Workflow (Feature Branch)

If direct push to `main` is blocked or you want to use Pull Requests:

```powershell
# Create and switch to feature branch
git checkout -b feature/add-backend

# Stage and commit
git add backend/
git commit -m "Add backend to monorepo structure"

# Push feature branch
git push origin feature/add-backend

# Create Pull Request on GitHub
# Merge after review
```

---

## ? Verification Checklist

After pushing, verify on GitHub:

- [ ] `backend/SparkAisha.API/` folder structure is visible
- [ ] `backend/README.md` is present
- [ ] All Controllers, Models, Services are present
- [ ] `Program.cs` and `.csproj` are present
- [ ] `appsettings.json` shows placeholder values (no secrets)
- [ ] `appsettings.Development.json` is NOT in repository ?
- [ ] No `bin/` or `obj/` folders ?
- [ ] No `.vs/` folder ?
- [ ] No `*.user` files ?
- [ ] Updated `.gitignore` is present
- [ ] Frontend folder still exists

---

## ?? Emergency: Secrets Committed by Accident

If you accidentally committed secrets:

```powershell
# Remove file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/SparkAisha.API/appsettings.Development.json" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (overwrites remote history)
git push origin main --force

# IMPORTANT: Rotate all exposed secrets immediately!
# - Generate new JWT keys
# - Change database passwords
# - Update connection strings
```

**Better approach using BFG Repo-Cleaner:**
```powershell
# Download BFG from: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files appsettings.Development.json
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin main --force
```

---

## ?? What Gets Committed

### ? Included:
- Source code (`.cs` files)
- Project files (`.csproj`)
- Configuration templates (`appsettings.json` with placeholders)
- Documentation (`README.md`)
- Launch settings (sanitized)
- Database migrations
- DTOs, Models, Controllers, Services, Repositories

### ? Excluded (via .gitignore):
- Build artifacts (`bin/`, `obj/`)
- User-specific files (`*.user`, `.vs/`)
- Secrets (`appsettings.Development.json`)
- NuGet packages (`packages/`)
- Temporary files (`.cache`, `.tmp`)

---

## ?? Quick Command Summary

```powershell
# Full workflow
cd C:\SparkAishaProject
git status
git add backend/
git status
git commit -m "Add backend to monorepo structure"
git push origin main

# Verify
git log --oneline -1
```

---

## ?? Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Credential Manager: https://github.com/git-ecosystem/git-credential-manager
