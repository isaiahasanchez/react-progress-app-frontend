import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ status }) => {
  const getMessage = (status) => {
    switch (status) {
      case 404:
        return "The exercise you're looking for cannot be found.";
      default:
        return 'An error occurred while fetching data. Please try again later.';
    }
  };

  return <Alert variant='danger'>{getMessage(status)}</Alert>;
};

export default ErrorMessage;
