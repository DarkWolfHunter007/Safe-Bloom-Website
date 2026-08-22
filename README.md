# Safe Bloom Website 🌸

Official static website for **[Safe Bloom](https://github.com/DarkWolfHunter007/Safe-Bloom)** — the zero-knowledge, offline-first menstrual cycle, fertility, and pregnancy tracker.

Built exclusively with **pure semantic HTML5, modern CSS3, and vanilla JavaScript**. No React, Node.js server, databases, or build-step dependencies required.

---

## 📂 Repository Structure & Clean URL Routing

The repository is structured to produce clean, professional URLs without `.html` appearing in the public address when hosted on **GitHub Pages** or custom domains:

```text
Safe-Bloom-Website/
│
├── index.html              # Served at: / or /Safe-Bloom-Website/
├── 404.html                # Custom GitHub Pages 404 page
│
├── privacy/
│   └── index.html          # Served at: /privacy/ or /Safe-Bloom-Website/privacy/
│
├── support/
│   └── index.html          # Served at: /support/ or /Safe-Bloom-Website/support/
│
├── faq/
│   └── index.html          # Served at: /faq/ or /Safe-Bloom-Website/faq/
│
├── roadmap/
│   └── index.html          # Served at: /roadmap/ or /Safe-Bloom-Website/roadmap/
│
├── css/
│   └── style.css           # Unified responsive stylesheet
│
├── js/
│   └── main.js             # Vanilla JS: mobile drawer, active nav, FAQ search, accordion
│
└── assets/
    └── safe-bloom-logo.png # High-resolution brand logo & favicon
```

### URL Mapping Summary

| Actual File Path | GitHub Pages URL | Custom Domain URL |
| :--- | :--- | :--- |
| `index.html` | `https://<user>.github.io/Safe-Bloom-Website/` | `https://safebloom.app/` |
| `privacy/index.html` | `https://<user>.github.io/Safe-Bloom-Website/privacy/` | `https://safebloom.app/privacy/` |
| `support/index.html` | `https://<user>.github.io/Safe-Bloom-Website/support/` | `https://safebloom.app/support/` |
| `faq/index.html` | `https://<user>.github.io/Safe-Bloom-Website/faq/` | `https://safebloom.app/faq/` |
| `roadmap/index.html` | `https://<user>.github.io/Safe-Bloom-Website/roadmap/` | `https://safebloom.app/roadmap/` |

---

## 🚀 GitHub Pages Deployment

1. **Push the repository** to GitHub:
   ```bash
   git add .
   git commit -m "Initialize Safe Bloom website"
   git push origin main
   ```
2. Navigate to your repository **Settings ➔ Pages**.
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `(root)`
4. Click **Save**. GitHub Pages will deploy the site at `https://<username>.github.io/Safe-Bloom-Website/`.

### Custom Domain (Optional)

When switching to a custom domain (e.g. `https://safebloom.app/`):
1. In repository **Settings ➔ Pages ➔ Custom domain**, enter `safebloom.app`.
2. Check **Enforce HTTPS**.
3. No code changes are required because all assets and navigational links use relative directory paths.

---

## 💻 Local Development & Testing

You can preview the website locally using any standard static file server:

### Using Python:
```bash
# In the repository root directory:
python -m http.server 8000
```
Open `http://localhost:8000/` in your browser.

### Using Node / npx:
```bash
npx serve .
```

### Using VS Code / IDE:
Right click `index.html` and select **Open with Live Server**.

---

## 🛡️ License

This website is open source under the [MIT License](https://opensource.org/licenses/MIT).
