import React from 'react';

function removeLeadingZero(str) {
  // If the string starts with '0' and has more than one character, remove the leading '0'
  if (str.startsWith('0') && str.length > 1) {
    return str.substring(1);
  }
  // Otherwise, return the string as is
  return str;
}

const FullPageStyledDateSets = ({ workouts }) => {
  if (!workouts || !Array.isArray(workouts)) {
    return <div>No workouts available.</div>;
  }

  return (
    <div>
      {workouts.map((workout, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            borderRadius: '10px', // Rounded corners
            padding: '5px', // Padding inside the container
            backgroundColor: 'rgb(190,190,190)', // Background color
          }}
        >
          <strong style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>
            {removeLeadingZero(workout.date.substring(5, 7))}/
            {removeLeadingZero(workout.date.substring(8, 10))}/{workout.date.substring(0, 4)}
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {workout.set.map((s, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: '60px',
                  marginRight: '8px',
                }}
              >
                <strong></strong> {s.weight}lbs x {s.reps} reps
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullPageStyledDateSets;
