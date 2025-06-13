# TastyBites - Food Delivery App

A modern food delivery application built with React, featuring real-time restaurant listings, menu browsing, and cart management.

## Features

- 🍕 Browse restaurants by location
- 📍 Location-based restaurant discovery
- 🛒 Shopping cart with quantity management
- 🔐 Authentication with Auth0
- 📱 Responsive design for all devices
- ⚡ Fast loading with optimized images
- 🌐 CORS-enabled API calls for production deployment

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Authentication**: Auth0
- **Icons**: FontAwesome, React Icons
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tastybites
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Deployment

This app is configured for deployment on Netlify with CORS proxy support for production API calls.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Configuration

The app automatically detects the environment and uses appropriate API configurations:

- **Development**: Uses Vite proxy for API calls
- **Production**: Uses CORS proxy service for external API calls

## API Integration

The app integrates with Swiggy's API to fetch restaurant data and menus. The API calls are handled differently based on the environment:

- Development: Direct proxy through Vite
- Production: CORS proxy service to handle cross-origin requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.