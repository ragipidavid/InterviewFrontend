import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api')  // Call the backend API
      .then(response => {
        setData(response.data);  // Set the response data
      })
      .catch(error => {
        console.error('Error fetching data from the backend', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Data from Backend:</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>  // Display the backend data
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
