# Cadient Frontend Application

## Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd "v0-cadient-frontend/New Upgraded UI"
```

### 2. Install Dependencies

```bash
npm install
# OR
pnpm install
```

### 3. Start the Development Server

```bash
npm run dev
# OR
pnpm dev
```

### 4. Access the Application

Open your browser and navigate to:

- **Login Page**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

## Important Notes

### Backend Dependency

This application requires a backend server running on `http://localhost:8080/atao/` for API calls. Make sure the backend is running before using the application.

### Environment Variables

The application uses the following environment variable:

- `LEGACY_BASE`: Backend URL (defaults to `http://localhost:8080/atao`)

You can create a `.env.local` file to override this:

```
LEGACY_BASE=http://your-backend-url
```

## Troubleshooting

### Login Page Not Loading

1. Ensure you've run `npm install` or `pnpm install`
2. Make sure the development server is running (`npm run dev`)
3. Check that you're accessing `http://localhost:3000/login` (not just `localhost:3000`)
4. Verify the backend server is running on port 8080

### Build Issues

If you encounter TypeScript or ESLint errors:

```bash
npm run build
```

### Port Conflicts

If port 3000 is already in use, Next.js will automatically use the next available port (3001, 3002, etc.). Check the terminal output for the correct URL.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── login/          # Login page
│   ├── dashboard/      # Dashboard page
│   └── ...
├── components/         # React components
│   ├── ui/            # UI components
│   └── ...
├── lib/               # Utilities and contexts
├── public/            # Static assets
└── ...
```
