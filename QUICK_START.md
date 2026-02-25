# ?? Quick Start - Push Backend to GitHub

## Prerequisites Check
```powershell
git --version  # Should show Git version
cd C:\SparkAishaProject
git remote -v  # Should show GitHub URL
```

## One-Command Push (Recommended)
```powershell
.\push-backend-to-github.ps1
```

## Manual Push (4 Steps)
```powershell
# 1. Stage files
git add backend/ .gitignore *.md *.ps1

# 2. Commit
git commit -m "Add backend to monorepo structure"

# 3. Push
git push origin main

# 4. Verify
Start-Process "https://github.com/paradisetextile25-cloud/SparkAishaProject"
```

## ?? Before Pushing - Security Check
```powershell
# Verify no secrets staged
git diff --cached --name-only | Select-String "Development.json"
# Should return: NOTHING (no Development.json files)
```

## ?? What Gets Committed

### ? YES (Safe to commit)
- `backend/SparkAisha.API/*.cs` - Source code
- `backend/SparkAisha.API/*.csproj` - Project file
- `backend/SparkAisha.API/appsettings.json` - Templates only
- `backend/SparkAisha.API/Controllers/` - All controllers
- `backend/README.md` - Documentation

### ? NO (Gitignored)
- `backend/**/bin/` - Build artifacts
- `backend/**/obj/` - Build artifacts
- `backend/**/.vs/` - IDE files
- `backend/**/appsettings.Development.json` - **SECRETS!**
- `**/*.user` - User settings

## ?? Secrets Location

### Production appsettings.json (COMMITTED)
Location: `backend/SparkAisha.API/appsettings.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "REPLACE_WITH_YOUR_CONNECTION_STRING"
  },
  "Jwt": {
    "Key": "REPLACE_WITH_YOUR_SECRET_KEY"
  }
}
```
? Placeholders only - Safe

### Development appsettings (NOT COMMITTED)
Location: `backend/SparkAisha.API/appsettings.Development.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-IC9F4GQ\\SQLEXPRESS;..."
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyAtLeast32CharsLong!!"
  }
}
```
?? Real secrets - GITIGNORED

## ?? Quick Troubleshooting

### Git not found
```powershell
# Install Git
Start-Process "https://git-scm.com/downloads"
```

### Authentication failed
```powershell
# Use Personal Access Token as password
# Generate at: https://github.com/settings/tokens
```

### Secrets committed by accident
```powershell
# Remove from Git cache
git rm --cached backend/SparkAisha.API/appsettings.Development.json
git commit -m "Remove secrets"
git push origin main --force

# THEN: Rotate all secrets immediately!
```

### Push rejected
```powershell
# Pull first, then push
git pull origin main --rebase
git push origin main
```

## ? Success Verification

Visit GitHub and verify:
- [ ] `backend/` folder exists
- [ ] `backend/SparkAisha.API/Controllers/` has all controllers
- [ ] `appsettings.json` shows only placeholders
- [ ] No `appsettings.Development.json` visible
- [ ] No `bin/`, `obj/`, `.vs/` folders
- [ ] `README.md` files render correctly

## ?? Full Documentation

- **Detailed Git Guide**: `GIT_SETUP_INSTRUCTIONS.md`
- **Backend Setup**: `backend/README.md`
- **Complete Checklist**: `BACKEND_INTEGRATION_CHECKLIST.md`

## ?? After Successful Push

```powershell
# View repository
Start-Process "https://github.com/paradisetextile25-cloud/SparkAishaProject"

# Test backend locally
cd backend\SparkAisha.API
dotnet run
Start-Process "https://localhost:7077/swagger"
```

---

**Current Status**: ? All files prepared and secured
**Next Action**: Run `.\push-backend-to-github.ps1`
