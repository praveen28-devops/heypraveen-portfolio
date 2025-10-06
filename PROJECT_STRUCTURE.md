# Portfolio Project Structure

## 📁 Clean & Organized Directory Layout

```
Portfolio-main/
├── 📂 app/                    # Next.js App Router
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.tsx            # Root layout with Inter font
│   ├── page.tsx              # Home page
│   ├── 3d/                   # 3D viewer page
│   └── styles/               # Additional CSS modules
│
├── 📂 components/             # React Components
│   ├── Hero.tsx              # Hero section
│   ├── Navigation.tsx        # Navigation bar
│   ├── Projects_fixed.tsx    # Projects showcase
│   ├── TechnicalSkills.tsx   # Skills display
│   ├── Education.tsx         # Education & certifications
│   ├── Volunteering.tsx      # Volunteer experience
│   ├── ProfessionalSummary.tsx
│   ├── SEO.tsx               # Meta tags component
│   ├── ResumeActions.tsx     # Resume download/view
│   ├── AnimatedHeroBackground.tsx
│   ├── FloatingParticles.tsx
│   ├── ParticleSystem.tsx
│   ├── MobileOptimizations.tsx
│   └── ui/                   # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── [40+ other UI components]
│
├── 📂 hooks/                  # Custom React Hooks
│   ├── use-mobile.tsx
│   ├── use-scroll-animations.ts
│   └── use-toast.ts
│
├── 📂 lib/                    # Utility Functions
│   └── utils.ts              # Helper functions
│
├── 📂 public/                 # Static Assets
│   ├── favicon.ico           # Site favicon
│   ├── favicon.png
│   ├── favicon.svg
│   ├── hero-bg.jpg           # Hero background image
│   ├── skills-bg.jpg         # Skills background
│   ├── profile-photo.png     # Profile picture
│   ├── Praveen A-Resume.pdf  # Resume file
│   └── robots.txt            # SEO robots file
│
├── 📂 .github/workflows/      # CI/CD Pipelines
│   ├── firebase-devops.yml
│   ├── firebase-hosting-merge.yml
│   └── firebase-hosting-pull-request.yml
│
├── 📄 Configuration Files
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.ts    # Tailwind CSS config
│   ├── tsconfig.json         # TypeScript config
│   ├── eslint.config.js      # ESLint configuration
│   ├── postcss.config.js     # PostCSS config
│   ├── components.json       # Shadcn UI config
│   ├── firebase.json         # Firebase hosting config
│   └── package.json          # Dependencies
│
└── 📄 Other Files
    ├── .gitignore            # Git ignore rules
    ├── .firebaserc           # Firebase project config
    ├── bun.lockb             # Bun package lock
    └── README.md             # Project documentation
```

## 🧹 Cleaned Up (Removed)

### ❌ Removed Files:
- `public/404.html` - Next.js generates this dynamically
- `public/index.html` - Not needed for Next.js App Router
- `public/placeholder.svg` - Unused placeholder image
- `package-lock.json` - Using bun.lockb instead
- `components/Example.test.tsx` - Example test file

### 🚫 Ignored (via .gitignore):
- `node_modules/` - Dependencies (install via bun/npm)
- `.next/` - Build output
- `/out/` - Static export output
- `.firebase/` - Firebase cache
- `*.log` - Log files
- `.env*` - Environment variables
- Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Font**: Inter (Google Fonts, optimized)
- **Package Manager**: Bun
- **Deployment**: Firebase Hosting
- **CI/CD**: GitHub Actions
- **Icons**: Lucide React

## 📦 Key Dependencies

```json
{
  "next": "14.2.0",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-*": "UI primitives"
}
```

## 🚀 Development Commands

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Deploy to Firebase
firebase deploy
```

## 📝 Notes

- All components are properly typed with TypeScript
- No hydration errors - fully SSR compatible
- Accessible components with semantic HTML
- Optimized fonts with next/font/google
- Clean code following Next.js best practices
- All animations defined in globals.css
- GitHub Actions for automated deployment

---

**Last Updated**: October 6, 2025
**Project Status**: ✅ Clean, Organized, and Production-Ready
