# AMK Balkan Project

## Project Overview
The AMK Balkan project aims to provide a platform that integrates various services and functionalities to support the Balkan community. It focuses on delivering an efficient and user-friendly experience for its users, promoting engagement and interaction across different sectors.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Deployment:** Firebase Hosting

## Features
- User authentication with email and social media login options.
- Real-time database capabilities for instant updates and interactions.
- Responsive design for optimal user experience across devices.
- Support for multilingual content catering to a diverse audience.
- Admin panel for managing users and content effectively.

## Firebase Collections
- **Users:** Contains user profiles and their respective information.
- **Posts:** Stores content created by users, including comments and likes.
- **Messages:** Handles private messaging between users.
- **Notifications:** Keeps track of user notifications for activities involving them.

## GitHub Secrets Setup
To ensure secure handling of sensitive data, configure the GitHub secrets for this project by following these steps:
1. Go to your repository on GitHub.
2. Click on `Settings`.
3. In the left sidebar, select `Secrets and variables` then `Actions`.
4. Click on `New repository secret`.
5. Add the following secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   Make sure to replace these values with your actual Firebase configuration details.

## Getting Started Guide
To get started with the AMK Balkan project, follow these instructions:

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mladanpredic-ui/AMKB.git
   cd AMKB
   ```
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
2. Open your browser and go to `http://localhost:3000` to see the application in action.

### Build for Production
To create a production build of the project, run:
```bash
npm run build
# or
yarn build
```