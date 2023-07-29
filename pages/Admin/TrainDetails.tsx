import TrainDetails from "@/components/TrainDetails";
import withAuth from "@/components/withAuth";
import React from "react";


const MainComponent: React.FC = () => {
  // Your main component logic goes here

  return (
    <div>
      <h1></h1>
      <TrainDetails />
    </div>
  );
};

export default withAuth(MainComponent);
