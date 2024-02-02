import React from 'react';

const StyledDateSets = ({ workouts }) => {
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
            borderRadius: '10px',
            padding: '5px',
            backgroundColor: 'rgb(190,190,190)',
          }}
        >
          <strong style={{ marginRight: '10px', whiteSpace: 'nowrap', minWidth: '30px' }}>
            {new Date(workout.date).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
            })}
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
