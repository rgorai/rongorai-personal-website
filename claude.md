# Ron Gorai Personal Website

Personal portfolio website for Ron Gorai.

## Project Structure

- `client/` - React frontend (TypeScript)
- `server/` - Express.js backend (Node.js with ES modules)

## Tech Stack

### Frontend
- React 17 with TypeScript
- SCSS modules for component styling
- Tailwind CSS for utility classes
- react-router-dom for routing
- Axios for API requests

### Backend
- Express.js with ES modules
- MongoDB for database
- AWS SDK for cloud services
- OpenAI integration

### Tooling
- Package manager: Yarn (not npm)
- Linting: ESLint with @rgorai/eslint-config
- Formatting: Prettier
- Style linting: Stylelint
- Pre-commit hooks: Husky with lint-staged
- Hosted on Heroku

## Development Commands

```bash
yarn dev          # Run both client and server in development
yarn build        # Build client for production
yarn start        # Run production server
yarn seed         # Seed database
yarn typecheck    # Run TypeScript type checking (client)
yarn lint         # Run ESLint on all JS/TS files
```

## Code Style Preferences

- **Always use arrow functions over classic function notation** for components, callbacks, and utility functions
- Use SCSS modules for component-specific styles
- Use Tailwind for utility/layout classes
- Keep components in domain-based folders (Home, Content, Guestbook, etc.)
- Export default for components
