import React from 'react';

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
            {new Date(workout.date).toLocaleDateString()}
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
