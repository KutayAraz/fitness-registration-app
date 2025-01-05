# Fitness Registration App

A modern, multi-step registration application built with React and TypeScript. Features a responsive design, multi-language support, and smooth transitions between registration steps.

## Features

- Multi-step registration form with progress tracking
- Responsive design supporting mobile and desktop views
- RTL/LTR language support (English/Arabic)
- Custom form validation
- Smooth transitions between steps
- BMI-based workout day recommendations
- Accessibility focused with ARIA attributes

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v7
- i18next for internationalization
- CSS Modules for styling
- SVGR for SVG handling

## Project Structure

```
src/
├── components/
│   ├── steps/        # Registration step components
│   ├── ui/           # Reusable UI components
│   └── ...
├── pages/            # Page components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── i18n/             # Translation files
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Future Improvements

- Improve form handling with react-hook-form library
- Improve project structure with /features folder
- Add unit tests with React Testing Library
- Add form autosave functionality
- Improve error handling and create an error-fallback route

## Development Practices

- Component-based architecture with folder-per-component structure
- Strict TypeScript usage for type safety
- CSS Modules for scoped styling
- Consistent code formatting with ESLint and Prettier
- Accessible form controls with proper ARIA attributes
- Responsive design principles
- Clean code practices with proper component separation
