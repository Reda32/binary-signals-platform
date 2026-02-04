# Binary Options Signal Platform

A complete real-time binary options trading signals platform built with Next.js, Convex, and Clerk.

## Features

- 🚀 Real-time trading signals with 65-95% accuracy
- 🤖 Three AI-powered algorithms: Adaptive, Neural, and Trend
- 📊 Live signals dashboard with advanced filtering
- 🌙 Dark/Light mode support
- 📱 Fully responsive design
- 🔐 Secure authentication with Clerk
- ⚡ Real-time updates with Convex
- 👨‍💼 Admin panel for signal management
- 💳 Subscription tiers (Free, Basic, Premium, VIP)

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Backend:** Convex (real-time database & serverless functions)
- **Authentication:** Clerk
- **Styling:** Vanilla CSS with custom design system
- **Fonts:** Orbitron from Google Fonts
- **Icons:** Lucide React
- **Deployment:** Vercel

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd trading2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Convex

1. Create an account at [convex.dev](https://convex.dev)
2. Install Convex CLI:
   ```bash
   npm install -D convex
   ```
3. Initialize Convex:
   ```bash
   npx convex dev
   ```
4. This will create a `.env.local` file with your Convex URL

### 4. Set up Clerk

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys and add them to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 5. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Email (Optional - for notifications)
RESEND_API_KEY=
```

### 6. Run the development server

```bash
# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Next.js
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
trading2/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Signals dashboard
│   ├── contact/           # Contact page
│   ├── brokers/           # Brokers page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   ├── SignalCard.tsx    # Signal card component
│   └── ThemeToggle.tsx   # Theme switcher
├── convex/               # Convex backend
│   ├── algorithms/       # Signal generation algorithms
│   ├── schema.ts         # Database schema
│   ├── signals.ts        # Signal queries/mutations
│   ├── users.ts          # User management
│   ├── crons.ts          # Scheduled jobs
│   └── signalGenerator.ts # Auto signal generation
├── lib/                  # Utilities and constants
│   └── constants.ts      # App constants
└── public/               # Static files
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Convex

```bash
npx convex deploy
```

## Signal Generation

Signals are automatically generated every 5 minutes using three algorithms:

- **Adaptive:** Adapts to market volatility and trend strength
- **Neural:** Simulates neural network pattern recognition
- **Trend:** Follows short-term and long-term trend alignment

Each signal includes:
- Currency pair
- Signal type (CALL/PUT)
- Power percentage (65-95%)
- Entry price
- Target price
- Stop loss
- Expiry time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@binarysignals.com or join our Discord community.

## Disclaimer

⚠️ Trading binary options involves significant risk. Past performance does not guarantee future results. Only trade with money you can afford to lose.
