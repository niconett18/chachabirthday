# Chacha's 19th Birthday Interactive Website 🎉

A magical, interactive pink-themed birthday website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## 🚀 Deployment

This website is ready for deployment on Vercel. The project has been optimized for production with:
- All ESLint errors fixed
- Optimized build configuration
- Vercel configuration file included
- Static generation enabled for better performance

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Next.js project and deploy it
4. Your site will be live at `https://your-project-name.vercel.app`

## 🎀 Features

- **Interactive Landing Page** - Confetti animations, floating balloons, and age counter
- **Our Journey Timeline** - Click hearts to reveal special memories and photos  
- **Love Letter** - Handwritten-style scroll with animated text reveal
- **Fireworks Finale** - Interactive fireworks display with canvas effects

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom pink theme
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## 🎨 Design Theme

The website features a beautiful pink color palette:
- Primary: `#FF66A3` (Pink Brand)
- Light: `#FFC1D9` (Pink Soft)  
- Dark: `#E94F91` (Pink Dark)
- Accent: `#FF9EC7` (Pink Accent)
- Background: Linear gradient from `#FFF5FA` to `#FFE3F0`

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── journey/        # Our Journey timeline page
│   ├── letter/         # Love letter page  
│   ├── surprise/       # Fireworks finale
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Landing page
├── components/         # Reusable components
│   ├── HeroWithConfetti.tsx
│   ├── MusicToggle.tsx
│   ├── RevealTimeline.tsx
│   ├── GalleryMasonry.tsx
│   ├── HandwrittenScroll.tsx
│   ├── CatchTheHearts.tsx
│   └── FireworksMessage.tsx
└── lib/
    ├── store.ts        # Zustand state management
    └── utils.ts        # Utility functions
```

## 🎵 Assets Setup

To complete the experience, add these assets:

### Photos (public/photos/)
- `1.jpg` through `8.jpg` - Timeline and gallery photos

### Audio (public/audio/)  
- `soft-romantic.mp3` - Background music file

### Icons (public/)
- `og.jpg` - Open Graph image for social sharing
- `favicon.ico` - Site favicon

## 🎮 Interactive Features

### Landing Page
- Confetti burst animation on load
- Floating balloons with parallax effect
- Clickable title triggers more confetti
- Animated age counter with glow effect

### Journey Page
- Heart-button timeline reveals photos and messages
- Masonry photo gallery with lightbox
- Hover effects and smooth animations

### Letter Page  
- Scroll-triggered line-by-line text reveal
- Handwritten font styling with paper texture
- Sparkle effects on punctuation

### Game Page
- Physics-based falling hearts mini-game
- Mouse cursor tracking and collision detection
- Win condition redirects to surprise page

### Surprise Page
- Interactive fireworks display (click to create)
- Glowing animated text effects  
- Confetti on demand
- Social sharing functionality

## 🎨 Customization

The pink theme is fully customizable in `tailwind.config.ts`:

```typescript
colors: {
  pinkBrand: "#FF66A3",
  pinkSoft: "#FFC1D9", 
  pinkDark: "#E94F91",
  pinkAccent: "#FF9EC7",
  ink: "#37243B",
}
```

## 📱 Responsive Design

- Mobile-first approach with responsive breakpoints
- Touch-friendly interactions for mobile devices  
- Optimized animations for different screen sizes

## 🌟 Performance Features

- Next.js App Router for optimal performance
- Framer Motion animations with reduced motion support
- Lazy loading for images and components
- Optimized font loading with `next/font`

## 💖 Made with Love

This interactive birthday website was crafted with attention to every detail to create a memorable and magical experience. Every animation, color choice, and interaction was designed to bring joy and celebrate this special day.

## 🚀 Deployment

Ready for deployment to Vercel:

1. Push to GitHub
2. Connect repository to Vercel  
3. Deploy with zero configuration

The site is optimized for Edge Runtime and includes proper SEO metadata.

---

*"Happy 19th Birthday, Chacha! 🎉"*
