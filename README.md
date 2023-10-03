# Progress Exercise & Rehab Log App (Frontend)

This is the frontend repository for the "Progress Exercise & Rehab Log" application. It's built using [React](https://reactjs.org/) and integrates with a backend service to fetch and manage posts related to exercises and rehabilitation. 

This app serves as a simple and quick way to manage personalized exercises and too easily view your progress. This idea for this app came about from working as a professional Athletic Trainer in sports medicine for over 5 years and needing a simple app that athlete could use to track their rehabilitation and exercise goals.

This app is currently in development and for now you can log in using the test user t2@test.com with login password of: testpasswod.
<img width="1112" alt="Screenshot 2023-10-02 at 11 22 07 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/dcd10699-263c-4b7f-83bb-d094886eeb3d">
<img width="1112" alt="Screenshot 2023-10-02 at 11 25 32 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/1c60cd27-0e99-4038-a3fc-0cfe914b6425">
<img width="1112" alt="Screenshot 2023-10-02 at 11 25 16 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/72218d41-e3d5-401d-b370-4f618e0da4a5">
<img width="1112" alt="Screenshot 2023-10-02 at 11 24 59 PM" src="https://github.com/isaiahasanchez/react-progress-app-frontend/assets/124002003/12e5293e-8f01-430d-935f-4428b42cdcaa">


## Live site 
Here is the link to the live site: 
[Link Text](https://progressexerciselog.netlify.app)

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Post Management**: Users can view all posts, update their own posts, and delete them.
- **Responsive Design**: Built with a mobile-first approach, ensuring usability on all devices.

## Tech Stack

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend service.
- **React Router**: For frontend routing and navigation.
  
## Folder Structure

- `src/`: Contains the main source code for the frontend.
  - `components/`: Reusable React components.
  - `contexts/`: React context providers for global state.
  - `services/`: Utilities and services, including API integrations.
  - `styles/`: Global styles and theme configurations.

## API Endpoints

- **Fetch Posts**: GET `/posts`
- **Update Post**: PUT `/posts/:id`
- **Delete Post**: DELETE `/posts/:id`

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
