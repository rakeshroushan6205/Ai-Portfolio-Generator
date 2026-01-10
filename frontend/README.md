# AI Portfolio Generator - Premium React Frontend

A **premium, production-ready** React frontend for the AI Portfolio Generator application. Built with attention to detail and modern design principles, this frontend delivers a high-end SaaS experience.

## ✨ Features

### Design & UX

- **🎨 Premium UI**: Apple/Stripe/Vercel-level design quality
- **🌓 Dark & Light Mode**: Seamless theme switching with smooth transitions
- **✨ Smooth Animations**: Framer Motion powered micro-interactions throughout
- **📱 Fully Responsive**: Beautiful on all devices - desktop, tablet, mobile
- **🔮 Glassmorphism**: Modern glass effects with backdrop blur
- **🎭 Gradient Backgrounds**: Animated gradient orbs and soft backgrounds

### Functionality

- **📄 Drag & Drop Upload**: Intuitive file upload with visual feedback
- **📊 Real-time Progress**: Animated progress bars and step indicators
- **🔄 Multi-step Flow**: Clear progress through Upload → Generate → Download
- **🔔 Toast Notifications**: Beautiful notification system for user feedback
- **⚡ Fast & Optimized**: Built with Vite for lightning-fast development

## 🛠 Tech Stack

- **React 18**: Latest React features with hooks
- **Vite**: Ultra-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS with custom design system
- **Framer Motion**: Production-ready animation library
- **Lucide Icons**: Beautiful, consistent iconography
- **React Router**: Client-side routing with transitions
- **Axios**: HTTP client with interceptors

## 📋 Prerequisites

- **Node.js 16+** (18+ recommended)
- **npm** or **yarn**
- Running Spring Boot backend on `http://localhost:8080`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Or copy the example file:

```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the next available port) with hot module replacement enabled.

### 4. Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory, ready for deployment.

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/              # Premium UI components
│   │       ├── Button.jsx   # Animated button with variants
│   │       ├── Card.jsx     # Glassmorphism card component
│   │       ├── Loader.jsx   # Animated loading spinner
│   │       ├── Stepper.jsx  # Progress stepper/timeline
│   │       ├── ThemeToggle.jsx # Dark/light mode toggle
│   │       └── Toast.jsx    # Notification system
│   ├── pages/               # Page components
│   │   ├── Landing.jsx      # Hero landing page
│   │   ├── Upload.jsx       # File upload page
│   │   ├── Generate.jsx     # Generation progress page
│   │   └── Download.jsx     # Success & download page
│   ├── layouts/             # Layout components
│   │   └── MainLayout.jsx   # Main app layout with header/footer
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.jsx # Theme management
│   │   └── PortfolioContext.jsx # Portfolio state
│   ├── services/            # API layer
│   │   └── api.js           # Axios configuration
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── package.json
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind + custom design tokens
├── postcss.config.js        # PostCSS configuration
└── .env.example             # Environment template
```

## 🎨 Design System

### Colors

The app uses a carefully crafted color palette with:

- **Primary**: Blue to Purple gradients (`from-blue-600 to-purple-600`)
- **Success**: Green gradients (`from-green-500 to-emerald-500`)
- **Error**: Red gradients (`from-red-500 to-rose-500`)
- **Warning**: Amber gradients (`from-amber-500 to-orange-500`)

### Typography

- **Headings**: Bold, large typography (3xl to 8xl)
- **Body**: Clean, readable text with proper line-height
- **Font Features**: OpenType features enabled for better rendering

### Animations

All animations use Framer Motion:

- **Page Transitions**: Fade + slide transitions between pages
- **Hover Effects**: Scale, lift, and glow on interactive elements
- **Loading States**: Smooth progress bars and animated spinners
- **Micro-interactions**: Button presses, card hovers, etc.

## 🔌 API Integration

The frontend integrates with the Spring Boot backend:

- **Base URL**: Configured via `VITE_API_BASE_URL` environment variable
- **Endpoint**: `POST /api/portfolio/generate`
  - Accepts: `multipart/form-data` with `file` parameter
  - Returns: ZIP file blob
  - Timeout: 5 minutes (for large file processing)

### API Service Features

- Automatic error handling with user-friendly messages
- Upload progress tracking
- Request/response interceptors
- Blob handling for file downloads

## 🎯 Key Components

### Button

Premium button with hover effects, loading states, and variants:

- `primary`: Gradient background with glow
- `secondary`: Glass effect
- `ghost`: Transparent with hover
- `outline`: Bordered style

### Card

Glassmorphism card with optional hover lift:

- Backdrop blur effects
- Border gradients
- Hover animations

### Loader

Animated loading component with multiple variants:

- `spinner`: Rotating circle
- `dots`: Bouncing dots
- `pulse`: Pulsing circle

### Stepper

Progress indicator showing current step:

- Animated progress line
- Step number/check icons
- Active step pulse effect

## 🌓 Theme System

The app includes a complete dark/light mode system:

- **Automatic Detection**: Respects system preference on first load
- **Persistent**: Theme preference saved in localStorage
- **Smooth Transitions**: All components transition smoothly
- **Toggle**: Accessible theme toggle in header

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Modifying Animations

All animations use Framer Motion. Edit component files to adjust:

- Duration
- Easing functions
- Animation variants

### Updating API Endpoint

Modify `src/services/api.js` or update the `.env` file:

```env
VITE_API_BASE_URL=https://your-api-domain.com
```

## 🐛 Troubleshooting

### CORS Errors

Ensure your Spring Boot backend has CORS enabled:

```java
@CrossOrigin(origins = "*")
```

### Theme Not Persisting

Check browser localStorage permissions. The theme is stored as `theme` key.

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version: `node --version` (should be 16+)

### Port Already in Use

Vite will automatically try the next available port. You can also specify:

```bash
npm run dev -- --port 3001
```

## 📦 Production Deployment

### Build

```bash
npm run build
```

### Deploy Options

**Vercel** (Recommended):

```bash
npm i -g vercel
vercel
```

**Netlify**:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

**Docker**:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎉 Features Showcase

### Landing Page

- Hero section with animated gradient text
- Feature cards with hover animations
- Call-to-action buttons
- Smooth scroll navigation

### Upload Page

- Drag & drop file upload zone
- File preview with validation
- Progress stepper
- Toast notifications

### Generate Page

- Real-time progress tracking
- Animated loading states
- Step-by-step status updates
- Error handling with retry

### Download Page

- Success celebration animation
- Confetti effects
- Download button with auto-download
- Create another portfolio option

## 🤝 Contributing

This is a premium, production-ready frontend. When making changes:

1. Maintain design consistency
2. Add animations with Framer Motion
3. Test in both light and dark modes
4. Ensure responsive design
5. Follow the existing code style

## 📄 License

MIT

## 🙏 Acknowledgments

- Design inspiration from Apple, Stripe, and Vercel
- Icons by Lucide
- Animations powered by Framer Motion
- Built with React and Vite

---

**Built with ❤️ for premium user experiences**
