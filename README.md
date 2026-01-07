# World of Books - Online Bookstore

A full-featured e-commerce bookstore application built with Next.js 16, React 19, and TypeScript. This project showcases a modern web scraping and data management system for book retail.

## 🏗️ Architecture Overview

### System Design

The application follows a **client-side architecture** with the following components:

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Frontend                      │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │
│  │   Pages    │  │ Components │  │  State Mgmt     │   │
│  │  (App Dir) │◄─┤  (React)   │◄─┤  (Context API)  │   │
│  └────────────┘  └────────────┘  └─────────────────┘   │
│         │              │                   │            │
│         └──────────────┴───────────────────┘            │
│                        │                                │
│              ┌─────────▼──────────┐                     │
│              │   Local Storage    │                     │
│              │  - Cart Data       │                     │
│              │  - User Reviews    │                     │
│              │  - Scrape Jobs     │                     │
│              └────────────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19.2 with Server Components
- TypeScript 5.x
- Tailwind CSS v4
- shadcn/ui components

**Data Layer:**
- In-memory TypeScript data structures
- localStorage for persistence
- No external database required

**Tooling:**
- Vitest for unit testing
- Playwright for E2E testing
- GitHub Actions for CI/CD
- Docker for containerization

### Key Features

1. **Book Catalog Management** - 82+ books across 10 categories
2. **Shopping Cart** - Persistent cart with localStorage
3. **Review System** - User-generated reviews and ratings
4. **Web Scraping** - Automated data collection from worldofbooks.com
5. **Search & Filter** - Advanced search across all pages
6. **Responsive Design** - Mobile-first approach

## 📦 Project Structure

```
world-of-books/
├── frontend/                # Next.js application
│   ├── app/                # App router pages
│   ├── components/         # React components
│   ├── lib/               # Utilities and data
│   ├── public/            # Static assets
│   └── hooks/             # Custom React hooks
├── backend/               # Future API server
│   └── README.md          # Backend documentation
├── docs/                  # Documentation
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── TESTING.md
├── scripts/              # Database seed scripts
│   └── seed-data.ts
├── tests/               # Test suites
│   ├── unit/
│   └── integration/
└── .github/workflows/   # CI/CD pipelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/world-of-books.git
   cd world-of-books
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

See [docs/TESTING.md](docs/TESTING.md) for detailed testing documentation.

## 🐳 Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

### Manual Docker Build

```bash
docker build -t world-of-books .
docker run -p 3000:3000 world-of-books
```

## 📚 Documentation

- [Database Schema](docs/DATABASE_SCHEMA.md) - Data models and relationships
- [API Documentation](docs/API_DOCUMENTATION.md) - Component APIs and functions
- [Testing Guide](docs/TESTING.md) - Testing strategy and examples

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

- **Lint & Type Check** - ESLint and TypeScript validation
- **Unit Tests** - Vitest test suite
- **Build Verification** - Production build check
- **E2E Tests** - Playwright integration tests

See `.github/workflows/ci.yml` for pipeline configuration.

## 🏛️ Design Decisions

### Why Client-Side Storage?

This project intentionally uses localStorage instead of a traditional database to:
- Simplify deployment (no database setup required)
- Enable offline functionality
- Demonstrate frontend state management
- Reduce infrastructure costs

### Why Next.js App Router?

- Server Components for better performance
- Built-in routing and layouts
- Excellent TypeScript support
- Optimized image handling

### Component Library Choice

shadcn/ui was chosen for:
- Full customization control
- No runtime dependencies
- Accessible by default
- Tailwind CSS integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- World of Books for inspiration
- shadcn for the UI component library
- Vercel for Next.js and hosting platform
