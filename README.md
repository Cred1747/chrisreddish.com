# Chris Reddish Portfolio

Personal portfolio website showcasing data analytics projects, Looker dashboards, and research.

## Tech Stack

- **React 18** + **Vite** - Fast development and builds
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Recharts** - Interactive data visualizations
- **Lucide React** - Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push this folder to a new GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Vite and deploys
4. Add your custom domain (ChrisReddish.com) in Vercel settings
5. Update DNS in Cloudflare to point to Vercel

### Option 2: Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Dashboard > Pages > Create a project
3. Connect your GitHub repo
4. Build settings: `npm run build`, output: `dist`
5. Domain auto-connects since you registered through Cloudflare

## Project Structure

```
chris-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx      # Navbar + Footer wrapper
│   │   └── DemoChart.jsx   # Interactive Recharts demos
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Dashboards.jsx  # Dashboard showcases
│   │   ├── Projects.jsx    # Work/School/Personal projects
│   │   ├── Research.jsx    # NLP research & coursework
│   │   └── About.jsx       # Bio, skills, experience
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## TODO

- [ ] Add actual Looker dashboard screenshots
- [ ] Upload resume PDF
- [ ] Add project filtering functionality
- [ ] Add contact form
- [ ] Add blog section (optional)
- [ ] SEO optimization with meta tags
- [ ] Add Google Analytics

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  primary: { ... },  // Blue tones
  accent: { ... },   // Green tones
}
```

### Content

All content is in the respective page components. Edit:
- `src/pages/Home.jsx` - Hero text, featured projects
- `src/pages/About.jsx` - Bio, skills, experience
- `src/pages/Projects.jsx` - Project list
- `src/pages/Dashboards.jsx` - Dashboard showcases
- `src/pages/Research.jsx` - Academic work

## License

MIT
