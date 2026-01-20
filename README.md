# JHorder.github.io

Portfolio website for Joseph Horder - Bioinformatician and Computational Biologist

## Structure

```
├── docs/
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # Styling and responsive design
│   ├── script.js           # JavaScript for content loading and interactivity
│   ├── about.md            # About section content
│   ├── projects.md         # Projects showcase
│   ├── publications.md     # Publications and presentations
│   ├── cv.md               # Curriculum vitae
│   └── blog.md             # Project blog posts
└── README.md               # This file
```

## Editing Content

All content is managed through markdown files in the `docs/` directory. Simply edit the `.md` files to update your portfolio.

### About Section
Edit `docs/about.md` using markdown formatting. Write about your background, research interests, and expertise.

### Projects
Edit `docs/projects.md` following this format:
```markdown
## Project Title
**Tags:** Python, NGS, Machine Learning
**GitHub:** https://github.com/yourusername/project

Project description here explaining the problem, your approach, and results.

---
```

### Publications
Edit `docs/publications.md` following this format:
```markdown
## Publication Title
**Authors:** Author1, **Your Name**, Author3
**Journal:** *Journal Name*, Year
**DOI:** [10.xxxx/xxxxx](https://doi.org/10.xxxx/xxxxx)

Brief description of the work and your contribution.

---
```

### CV
Edit `docs/cv.md` with your full curriculum vitae including education, experience, skills, awards, and service.

### Blog
Edit `docs/blog.md` to add project blog posts:
```markdown
## Post Title: Description
**Date:** Month Year

Your blog post content with sections, code blocks, and images.

**Tags:** Tag1, Tag2, Tag3

---
```

### Contact Information
Edit the contact links directly in `docs/index.html` (lines ~167-183) to update your email, GitHub, LinkedIn, and Google Scholar links.

### Skills
Edit the skills section directly in `docs/index.html` (lines ~67-102) to customize your technical skills.

## Testing Locally

Use a local server (recommended for proper markdown loading):
```bash
cd docs
python -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment

1. Commit your changes:
```bash
git add .
git commit -m "Update portfolio content"
git**Configure GitHub Pages to use the `/docs` folder:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Save

2. Commit your changes:
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

- 📝 Content managed via markdown files
- 🎨 Modern, responsive design
- 📱 Mobile-friendly with hamburger menu
- ⚡ Fast loading with smooth animations
- 🧬 Bioinformatics-focused sections
- 📄 CV and blog sections
- 🔧 Easy to customize

## Tips

- Use markdown headings (## and ###) to structure your content
- Add links with `[text](url)` syntax
- Include code blocks with triple backticks
- Use **bold** for emphasis
- Separate sections with `---` horizontal rules
