# Deploying the OCI Diagnostic

## Run it locally first

```bash
cd oci-diagnostic
npm install
npm run dev
```

Open http://localhost:3000 — you should see the landing page.

---

## Push to GitHub

1. Go to https://github.com/new and create a new **private** repository named `oci-diagnostic`

2. In your terminal, from inside the `oci-diagnostic` folder:

```bash
git init
git add .
git commit -m "Initial OCI diagnostic build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oci-diagnostic.git
git push -u origin main
```

---

## Deploy to Vercel

1. Go to https://vercel.com and sign in (or create a free account)

2. Click **"Add New Project"**

3. Click **"Import Git Repository"** and connect your GitHub account if you haven't already

4. Select `oci-diagnostic` from the list

5. Vercel will auto-detect it as a Next.js project — leave all settings as default

6. Click **"Deploy"**

Vercel gives you a live URL like `oci-diagnostic-yourname.vercel.app` within about 60 seconds.

---

## Every time you make changes

```bash
git add .
git commit -m "Description of what changed"
git push
```

Vercel auto-deploys on every push to `main`. No further action needed.

---

## Notes

- The diagnostic is fully client-side — no database, no backend. All scoring happens in the browser.
- Results are passed via URL parameters to the results page (not stored anywhere).
- When you're ready to add Airtable/email capture later, that's a single API route addition.
