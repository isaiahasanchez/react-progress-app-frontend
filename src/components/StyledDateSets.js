import React from 'react';

const StyledDateSets = ({ workouts }) => {
  if (!workouts || !Array.isArray(workouts)) {
    return <div>No workouts available.</div>;
  }

  return (
    <div>
      {' '}
      {/* Wrapper div for the entire set of workouts */}
      {workouts.map((workout, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            // border: '2px solid #333',
            borderRadius: '10px', // Rounded corners
            padding: '5px', // Padding inside the container
            backgroundColor: 'rgb(190,190,190)', // Background color
          }}
        >
          <strong style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>
            {new Date(workout.date).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
            })}
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {' '}
            {/* Flex container for sets */}
            {workout.set.map((s, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: '60px',
                  marginRight: '8px',
                }}
              >
                {' '}
                {/* Minimum width for uniform spacing */}
                <strong></strong> {s.weight} x {s.reps}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyledDateSets;
