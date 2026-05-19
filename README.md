# Rishith Suresh - Modern Portfolio Website

A premium, modern personal portfolio website built with React, Vite, and cutting-edge technologies. Features a dark aesthetic with glassmorphism UI, smooth animations, and professional layout.

## 🎨 Design Features

- **Dark Theme**: Dark blue background (#0B0F19) with vibrant accents
- **Glassmorphism**: Modern frosted glass effect components
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Responsive Design**: Mobile-first approach for all device sizes
- **Smooth Scrolling**: Lenis integration for premium scroll experience
- **Interactive Elements**: Hover effects, parallax, and micro-interactions
- **Dark/Light Mode**: Theme toggle support with localStorage persistence
- **Particle Effects**: Animated background particles and floating elements

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lenis** - Smooth scrolling library
- **Lucide React** - Icon library

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar with theme toggle
│   ├── HeroSection.jsx       # Hero landing section
│   ├── AboutSection.jsx      # About me section
│   ├── SkillsSection.jsx     # Skills and expertise
│   ├── ProjectsSection.jsx   # Portfolio projects
│   ├── ExperienceSection.jsx # Work experience timeline
│   ├── ContactSection.jsx    # Contact form and links
│   ├── Footer.jsx            # Footer component
│   ├── Background.jsx        # Particle background effects
│   └── ThemeToggle.jsx       # Dark/light mode toggle
├── hooks/
│   └── useSmoothScroll.js    # Lenis smooth scroll hook
├── App.jsx                   # Main app component
├── App.css                   # App styles
├── index.css                 # Global styles and Tailwind directives
└── main.jsx                  # Entry point
```

## 🎯 Sections

1. **Hero Section**
   - Full-screen landing with animated gradient
   - CTA buttons (View Projects, Contact, GitHub)
   - Mouse parallax effect
   - Floating particles background

2. **About Section**
   - Introduction and professional summary
   - Floating glassmorphism skill cards
   - Resume download button

3. **Skills Section**
   - Categorized skill cards:
     - Frontend (React, TypeScript, Tailwind)
     - Backend (Node.js, Python, Express)
     - AI/ML (TensorFlow, PyTorch, LLMs)
     - Database (MongoDB, PostgreSQL, Redis)
     - Cloud & DevOps (AWS, Docker, Kubernetes)
     - Tools (Git, Figma, REST API, GraphQL)

4. **Projects Section**
   - Premium bento-style project cards
   - Project images, descriptions, tech stack
   - GitHub and live demo buttons
   - Hover zoom and glow effects

5. **Experience Section**
   - Vertical glowing timeline
   - Work experience cards
   - Animated statistics (projects, clients, years)

6. **Contact Section**
   - Contact form with validation
   - Social media links
   - Email contact information

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RishithSuresh/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server runs on `http://localhost:5173` with hot module replacement enabled.

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The optimized production build is output to the `dist/` directory.

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.js`:
- `background`: #0B0F19 (dark background)
- `primary`: #FFA700 (orange accent)
- `secondary`: #00D9FF (cyan accent)
- `accent`: #8B5CF6 (purple accent)

### Content
Update section content in the respective component files:
- `src/components/HeroSection.jsx` - Hero title and tagline
- `src/components/AboutSection.jsx` - About description
- `src/components/SkillsSection.jsx` - Skills list
- `src/components/ProjectsSection.jsx` - Project details
- `src/components/ExperienceSection.jsx` - Work experience
- `src/components/ContactSection.jsx` - Contact information

### Fonts
The portfolio uses:
- **Space Grotesk** - Headings (h1, h2, h3, etc.)
- **Inter** - Body text

Change fonts in `index.html` and `index.css`.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

All animations are optimized for performance across devices.

## 🌙 Dark/Light Mode

The portfolio includes a theme toggle in the navbar. Theme preference is saved to localStorage and persists across sessions.

## ⚡ Performance

- Optimized bundle size (~112KB gzipped)
- Lazy loading for images and content
- Smooth 60fps animations with GPU acceleration
- Optimized Lenis smooth scrolling

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Rishith Suresh**
- Website: [rishithsuresh.com](https://rishithsuresh.com)
- GitHub: [@RishithSuresh](https://github.com/RishithSuresh)
- LinkedIn: [Rishith Suresh](https://linkedin.com/in/rishithsuresh)
- Email: rishith@example.com

## 🙏 Credits

Built with inspiration from premium portfolios on:
- [Apple Design](https://apple.com)
- [Linear](https://linear.app)
- [Framer](https://framer.com)
- [Awwwards](https://awwwards.com)

---

**Made with ❤️ using React, Framer Motion & Tailwind CSS**
