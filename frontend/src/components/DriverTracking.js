// frontend/src/components/DriverTracking.js
import React, { useEffect } from 'react';
import axios from 'axios';

const DriverTracking = ({ busId }) => {
  useEffect(() => {
    const handleLocationChange = ({ coords }) => {
      axios.post('http://localhost:5000/api/bus/update-location', {
        busId,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    const handleError = (error) => {
      console.error('Error getting location:', error);
    };

    // Use watchPosition instead of getCurrentPosition
    const watchId = navigator.geolocation.watchPosition(handleLocationChange, handleError, {
      enableHighAccuracy: true,
      maximumAge: 0,  // Avoid using cached location
      timeout: 10000  // Timeout for the request in milliseconds
    });

    // Cleanup when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [busId]);

  return <div>Tracking bus location...</div>;
};

export default DriverTracking;


// // frontend/src/components/DriverTracking.js
// import React, { useEffect } from 'react';
// import axios from 'axios';

// const DriverTracking = ({ busId }) => {
//   useEffect(() => {
//     const updateLocation = () => {
//       navigator.geolocation.getCurrentPosition(
//         ({ coords }) => {
//           axios.post('http://localhost:5000/api/bus/update-location', {
//             busId,
//             latitude: coords.latitude,
//             longitude: coords.longitude,
//           });
//         },
//         (error) => console.error('Error getting location:', error),
//         { enableHighAccuracy: true }
//       );
//     };

//     const intervalId = setInterval(updateLocation, 5000); // Update location every 5 seconds

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [busId]);

//   return <div>Tracking bus location...</div>;
// };

// export default DriverTracking;
