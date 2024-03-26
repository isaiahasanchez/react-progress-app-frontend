import React from 'react';

function removeLeadingZero(str) {
  // If the string starts with '0' and has more than one character, remove the leading '0'
  if (str.startsWith('0') && str.length > 1) {
    return str.substring(1);
  }
  // Otherwise, return the string as is
  return str;
}

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
          <strong style={{ marginRight: '10px', whiteSpace: 'nowrap', minWidth: '40px' }}>
            {removeLeadingZero(workout.date.substring(5, 7))}/
            {removeLeadingZero(workout.date.substring(8, 10))}
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
                {s.weight > 0 && idx === workout.set.length - 1
                  ? `${s.weight}lbs x ${s.reps}`
                  : s.weight > 0
                  ? `${s.weight}lbs x ${s.reps},`
                  : s.weight === 0 && idx === workout.set.length - 1
                  ? `BW x ${s.reps}`
                  : `BW x ${s.reps},`}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyledDateSets;
