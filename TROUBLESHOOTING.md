# Interactive Learning Hub Troubleshooting Log

## Remote GitHub Repository

The remote GitHub repository for this project is:

https://github.com/danr75/Test2Rapid.git

Use this URL for all future git backups and pushes.

This document tracks issues encountered during development and their solutions.

## Table of Contents
- [Module Not Found Error for CSS Import](#module-not-found-error-for-css-import)

---

## Module Not Found Error for CSS Import

**Date:** June 1, 2025

**Error:** 
```
https://nextjs.org/docs/messages/module-not-found
GET / 500 in 8378ms
```

**Problem:**
The application was trying to import the CSS file from `@/styles/globals.css`, but the styles directory was located in the root of the project, not inside the src directory. This mismatch in paths was causing the module not found error.

**File with Issue:**
`/src/pages/_app.tsx`

**Original Code:**
```typescript
import '@/styles/globals.css';
```

**Solution:**
Updated the import path to use a relative path that correctly points to the styles directory in the project root:

```typescript
import '../../styles/globals.css';
```

**Why This Works:**
- In Next.js, the `@/` path alias typically points to the `src` directory
- Since the styles folder is in the project root rather than inside src, we needed to use a relative path
- The `../../` goes up two levels from the current file (src/pages/_app.tsx) to reach the project root, then accesses the styles directory

**Alternative Solutions Considered:**
1. Moving the styles directory into the src folder (would require updating any other imports)
2. Configuring the path aliases in tsconfig.json to include the root styles directory (more complex)

**Prevention Tips:**
- Ensure consistent directory structure following Next.js conventions
- When using path aliases like `@/`, verify the actual location of imported files
- Consider using relative imports for files outside the standard directory structure
