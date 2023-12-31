import TrainTimeTableForm from "@/components/TrainScedule";
import withAuth from "@/components/withAuth";
import React from "react";


const MainComponent: React.FC = () => {
  // Your main component logic goes here

  return (
    <div>
      <h1>Train Time Table</h1>
      <TrainTimeTableForm />
    </div>
  );
};

export default withAuth(MainComponent);
