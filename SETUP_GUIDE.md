# 🚀 Quick Setup Guide for Team Members

## The Problem

When you pull this project from Git and try to access `http://localhost:3000/login`, it doesn't work because:

1. **Dependencies aren't installed** - The `node_modules` folder is not pushed to Git
2. **Development server isn't running** - Next.js needs to be started locally
3. **Backend dependency** - The app expects a backend server on port 8080

## ✅ Quick Fix (Choose Your Method)

### Method 1: Automated Setup (Recommended)

**For Windows:**

1. Double-click `setup.bat`
2. Wait for installation to complete
3. Run `npm run dev` in terminal
4. Open http://localhost:3000/login

**For Mac/Linux:**

1. Open terminal in project folder
2. Run `./setup.sh` (or `bash setup.sh`)
3. Run `npm run dev`
4. Open http://localhost:3000/login

### Method 2: Manual Setup

```bash
# 1. Navigate to project folder
cd "v0-cadient-frontend/New Upgraded UI"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:3000/login
```

## 🔧 Troubleshooting

### "Login page not loading"

- ✅ Check: Did you run `npm install`?
- ✅ Check: Is `npm run dev` running?
- ✅ Check: Are you going to `localhost:3000/login` (not just `localhost:3000`)?

### "Port 3000 already in use"

- Next.js will automatically use port 3001, 3002, etc.
- Check the terminal output for the correct port number

### "API errors"

- Make sure the backend server is running on port 8080
- Check `next.config.mjs` for API configuration

### "Module not found errors"

- Delete `node_modules` folder
- Delete `package-lock.json` (if using npm) or `pnpm-lock.yaml` (if using pnpm)
- Run `npm install` again

## 📋 What You Need Installed

- **Node.js** (version 16+) - Download from https://nodejs.org
- **npm** (comes with Node.js) or **pnpm**

## 🎯 Quick Test

After setup, you should be able to:

1. Go to http://localhost:3000/login
2. See the Cadient login page
3. Fill in any email/password and click "Sign in"
4. Get redirected to change password screen
5. Click "Save" to go to dashboard

## 📞 Still Having Issues?

1. Check the terminal for error messages
2. Make sure Node.js is installed: `node --version`
3. Make sure npm is working: `npm --version`
4. Try deleting `node_modules` and running `npm install` again

## 🔄 For Future Updates

When pulling new changes from Git:

```bash
git pull
npm install  # In case new dependencies were added
npm run dev
```
