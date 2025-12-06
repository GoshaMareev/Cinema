# Festival of Accidental Genius

A cinematic festival website showcasing the legendary film "Близкий".

## Features

- Responsive design
- Smooth animations with GSAP
- Interactive sections
- Social sharing functionality
- Photo gallery

## GitHub Pages Deployment

This site is ready to be deployed on GitHub Pages. Follow these steps:

### Option 1: Deploy from main branch (recommended)

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**
7. Your site will be available at `https://[your-username].github.io/Cinema/`

### Option 2: Deploy from gh-pages branch

1. Create a new branch called `gh-pages`:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. Go to repository Settings → Pages
3. Select **gh-pages** branch as source
4. Save

## Local Development

To run the site locally:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
Cinema/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── photos/             # Image assets
│   ├── ogan1.jpg
│   ├── ogan2.jpg
│   ├── ogan3.jpg
│   └── ogan4.jpg
└── README.md           # This file
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- Google Fonts

## License

All rights to confusion reserved. Made with love, confusion, and zero budget.

