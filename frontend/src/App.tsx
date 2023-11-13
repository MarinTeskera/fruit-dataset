import { useEffect, useState } from "react";
import "./App.css";
import { ICsvData } from "./interfaces/csv.interface";

function App() {
  // State to store the fetched data
  const [data, setData] = useState<Array<ICsvData>>([]);
  // State to store loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start with loading state
        setLoading(true);

        // Fetch data from the server
        const response = await fetch("http://localhost:4200"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const result = await response.json();

        // Set the data in the state
        console.log(result);
        setData(result);
      } catch (error) {
        // Set the error in the state
        console.log(error);
      } finally {
        // Set loading state to false, whether the fetch was successful or not
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <>
      {data.map((i) => (
        <>
          <span>{i.name}</span> <br />
        </>
      ))}
    </>
  );
}

export default App;
