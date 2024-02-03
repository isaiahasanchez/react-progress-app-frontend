# Progress Rehab and Exercise (Frontend)

## System Setup and Deployment Overview
This is the frontend repository for the Progress Rehab Exercise application. It's built using [React](https://reactjs.org/) and integrates with a backend service to fetch and manage exercises related to sports rehabilitation and general fitness. The backend repository can be found here [https://github.com/isaiahasanchez/react-progress-app-backend](https://github.com/isaiahasanchez/react-progress-app-backend).

This application is deployed using Netlify for the front-end hosting, ensuring a smooth and responsive user experience with our React-based interface that uses a mobile-first development philosophy. To address cross-origin request issues, we've implemented redirects, enabling seamless communication between different origins and enhancing the security and efficiency of the application. For information on redirects, see the Netlify redirects documents here [https://docs.netlify.com/routing/redirects/](https://docs.netlify.com/routing/redirects/).

Users can dynamically add, edit, and manage sets and reps within exercises, providing detailed tracking of their workouts.

The backend is powered by Cyclic, providing a robust and scalable Node.js environment that integrates with the front end. This setup not only facilitates continuous deployment and easy updates but also establishes a reliable and cohesive full-stack MERN application ecosystem.

## App Concept and Background

This app serves as a simple and quick way to manage personalized exercises and to easily view your progress. The idea for this app came about from working as a professional Athletic Trainer in sports medicine for over 5 years and needing a simple app that athletes could use to track their rehabilitation and exercise goals. Clinicians can log into the same app and monitor their status leading to improved rehab planning.

## Using the App
- **Account Management**: Register or log in to access your exercises.
- **Exercise Categories**: Create and manage categories like squats or lunges. Add daily progress to any category by editing it directly from the homepage.
- **Progress Tracking**: The homepage displays the five most recent exercise sessions, with a "Full History" option for a complete exercise history.

You can sign up for an account using the secure registration form or quickly see a demo using the username demo@demo.com with login password: demo

<img width="1605" alt="Screenshot 2024-02-02 at 4 46 46 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/098e45fa-857f-41d8-8a0d-4c35503fbc48">
<img width="1605" alt="Screenshot 2024-02-02 at 4 46 34 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/1efe45f8-6700-4cc0-b040-5a3f0339fbb0">
<img width="1605" alt="Screenshot 2024-02-02 at 4 47 40 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/06768678-70ea-4ce3-8955-e2477504ee31">
<img width="1605" alt="Screenshot 2024-02-02 at 4 47 51 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/5b0fcf10-efb6-48ee-a39f-febb5eb1fab9">

## Live site
Here is the link to the live site:
[https://progressexerciselog.app](https://progressexerciselog.netlify.app)

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Exercise Management**: Users can view all exercises, update their own exercises, and delete them.
- **Responsive Design**: Built with a mobile-first approach, ensuring usability on all devices.

## Tech Stack

- **React**: For building the user interface.
- **React Query**: For efficient data fetching, state management, and server-state synchronization, enhancing user experience with faster load times and responsive updates.
- **React Router**: For frontend routing and navigation.

- **Folder Structure**: Organized into `api/`, `components/`, `contexts/`, and `pages/` among others for modular development.

## Contributing

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! Contributions of all kinds are welcomed!

## License

[MIT](LICENSE)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it
