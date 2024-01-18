# Progress Exercise Log (Frontend)

## System Setup and Deployment Overview
This is the frontend repository for the "Progress Exercise & Rehab Log" application. It's built using [React](https://reactjs.org/) and integrates with a backend service to fetch and manage exercises related to exercises and rehabilitation. The backend repository can be found here [https://github.com/isaiahasanchez/react-progress-app-backend](https://github.com/isaiahasanchez/react-progress-app-backend)

This application is deployed using Netlify for the front-end hosting, ensuring a smooth and responsive user experience with our React-based interface. To address cross-origin request issues, we've implemented redirects, enabling seamless communication between different origins and enhancing the security and efficiency of the application. For information on redirects see the netlify redirects documents here [https://docs.netlify.com/routing/redirects/](https://docs.netlify.com/routing/redirects/) 

The backend is powered by Cyclic, providing a robust and scalable Node.js environment that integrates with the front end. This setup not only facilitates continuous deployment and easy updates but also establishes a reliable and cohesive full-stack MERN application ecosystem.

## App Concept and Background

This app serves as a simple and quick way to manage personalized exercises and to easily view your progress. This idea for this app came about from working as a professional Athletic Trainer in sports medicine for over 5 years and needing a simple app that athlete could use to track their rehabilitation and exercise goals.

## How to use the app
- Register, or if you already have an account, log in.
- On the homepage, if you don't have any exercise categories or wish to create a new one, click "Create a New Exercise" to navigate to the page where you can create a new exercise.
- View a list of the exercise categories you currently have on the homepage. Examples of categories might include squats, bench press, pull-ups, etc.
- When you see all your exercise categories, on a day you are working out, simply click "Edit" for the category you want to add your new daily progress. Add it to the list by clicking at the end of the last workout and pressing "Return" or "Shift" to copy that exercise data to a new line, then edit it to correspond to that day's exercise data.
- The homepage is designed to show only the most recent five days of exercise data. If you want more, click "Full History" to navigate to that exercise's full history.


This app is currently in development and for now you can log in using the test user t2@test.com with login password of: testpasswod.
<img width="1127" alt="Screenshot 2023-10-28 at 12 04 51 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/f6a0c66f-9bd3-4cf8-a980-b9011f6f15a8">
<img width="1112" alt="Screenshot 2023-10-02 at 11 25 32 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/1c60cd27-0e99-4038-a3fc-0cfe914b6425">
<img width="1112" alt="Screenshot 2023-10-02 at 11 25 16 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/72218d41-e3d5-401d-b370-4f618e0da4a5">
<img width="1112" alt="Screenshot 2023-10-02 at 11 24 59 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/12e5293e-8f01-430d-935f-4428b42cdcaa">


## Live site 
Here is the link to the live site: 
[https://progressexerciselog.app](https://progressexerciselog.netlify.app)

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Exercise Management**: Users can view all exercises, update their own exercises, and delete them.
- **Responsive Design**: Built with a mobile-first approach, ensuring usability on all devices.

## Tech Stack

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend service.
- **React Router**: For frontend routing and navigation.
  
## Folder Structure
- `public/`: Contains images and redirect file as well as index.html
- `src/`: Contains the main source code for the frontend.
  - `api/`: Functions for interacting with backend server
  - `components/`: Reusable React components.
  - `contexts/`: React context providers including authentication context
  - `pages/`: Main webpage layout and structure
  - `App.js/`: The core JavaScript file that routes and renders different components based on the URL path.
  - `Index.js/`: The entry point of the React application. It initializes the app, wrapping it with providers like AuthProvider.
  - `styles.css/`: Global styles and theme configurations.


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
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
