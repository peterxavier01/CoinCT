# CoinCT

A modern cryptocurrency tracking and analysis platform built with Next.js. CoinCT provides real-time cryptocurrency charts, price tracking, market data, and comprehensive token information powered by the CoinGecko API.

## Features

- **Real-time Price Charts**: Interactive candlestick charts with multiple time period views
- **Token Search**: Global search functionality across all tokens with debounced input
- **Market Overview**: Trending coins, top gainers, and market categories
- **Token Details**: Comprehensive token information including price, market cap, volume, and 24h changes
- **Responsive Design**: Mobile-first design with modern UI components
- **Error Handling**: Robust error boundaries and fallback states
- **Performance Optimized**: Server-side data prefetching and React Query caching

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Charts**: Lightweight Charts
- **UI Components**: Radix UI primitives
- **Error Handling**: React Error Boundary

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- CoinGecko API key (Demo API key works for development)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd coinct
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:

```env
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
coinct/
├── src/
│   ├── actions/          # Server actions for API calls
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── home/        # Home page components
│   │   ├── tokens/      # Token-related components
│   │   └── ui/          # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── providers/       # Context providers
├── public/               # Static assets
├── type.d.ts            # TypeScript type definitions
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

### Environment Variables

- `COINGECKO_BASE_URL`: CoinGecko API base URL (default: https://api.coingecko.com/api/v3)
- `COINGECKO_API_KEY`: Your CoinGecko API key

You can obtain a free API key from [CoinGecko](https://www.coingecko.com/en/api).

## Usage

### Home Page

The home page displays:

- Interactive cryptocurrency charts with period selection
- Trending coins section
- Top categories with market data

### Tokens Page

The tokens page provides:

- Paginated table of all tokens with market data
- Global search functionality to find tokens across all pages
- Sortable columns for rank, price, market cap, and 24h change

### Token Details

Navigate to `/tokens/[id]` to view detailed information about a specific token.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com) for providing the cryptocurrency API
- [Next.js](https://nextjs.org) for the excellent framework
- [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) for charting capabilities
