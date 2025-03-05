# Airline Ticket Booking System

## Overview

The Airline Ticket Booking System is a web application built using Vue.js for the frontend and Firebase for backend services. This system allows users to search, book, and manage airline tickets efficiently. Firebase handles authentication, real-time database management, and cloud functions to provide seamless user experiences.

## Features

* User Authentication (Sign up, Login, Logout)

* Flight Search & Filtering

* Seat Selection

* Real-time Ticket Booking

## Tech Stack

* Frontend: Vue.js (Vue Router, Vuex)

* Backend: Firebase Firestore, Firebase Authentication, Firebase Functions

* Hosting: Firebase Hosting

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

* Node.js (>= 14.x.x)

* Vue CLI

* Firebase CLI

## Clone the Repository
```
git clone https://github.com/your-repo/airline-ticket-booking.git
cd airline-ticket-booking
```

## Install Dependencies
```
npm install
```

## Setup Firebase

* Create a Firebase project at Firebase Console.

* Enable Firestore Database and Authentication.

* Copy your Firebase project configuration and paste it into a new .env file in the root directory:
```
VUE_APP_FIREBASE_API_KEY=your_api_key
VUE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
VUE_APP_FIREBASE_PROJECT_ID=your_project_id
VUE_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VUE_APP_FIREBASE_APP_ID=your_app_id
```

## Run the Application
```
npm run serve
```
The application will be available at http://localhost:8080/.

## Deployment

To deploy on Firebase Hosting, run:
```
npm run build
firebase deploy
```

## Contributing

1. Fork the repository.

2. Create a new branch: ```git checkout -b feature-branch-name.```

3. Commit your changes: ```git commit -m 'Add new feature'.```

4. Push to the branch: ```git push origin feature-branch-name.```

5. Open a Pull Request.

## License

This project is licensed under the MIT License.
