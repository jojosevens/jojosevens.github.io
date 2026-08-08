# Alliance d'Amour — Deployment README

This branch contains:

- Static preview files at the repository root (index.html, decouvrir.html, notifications.html) with assets under /assets/ for GitHub Pages preview.
- A PHP project in the /php/ directory intended to be deployed on a PHP+MySQL server (XAMPP, shared hosting, VPS).

Notes:
- GitHub Pages serves static content only. To enable the dynamic features (registration, messaging), deploy the PHP folder to a server supporting PHP and MySQL.
- Do not commit sensitive credentials. Use php/config/database.php.example as a template for your own config.
