import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "@/utils/authProvider";

const TrainTimeTableForm: React.FC = () => {
  const { addTrainScheduleToFirestore } = useAuth();
  const [trainID, setTrainID] = useState("");
  const [trainName, setTrainName] = useState("");
  const [stoppingLocations, setStoppingLocations] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [delay, setDelay] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const handleTrainIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrainID(event.target.value);
  };

  const handleTrainNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrainName(event.target.value);
  };

  const handleStoppingLocationsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setStoppingLocations(selectedOptions);
  };

  const handleDepartureTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureTime(event.target.value);
  };
  const handleDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDate(event.target.value);
  };
  const handleArrivalTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArrivalTime(event.target.value);
  };

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(event.target.value);
  };

  const handleCurrentLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentLocation(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // event.preventDefault();
    try {
      // Call a function to create the train schedule in Firebase Firestore
      await addTrainScheduleToFirestore(
        trainID,
        trainName,
        stoppingLocations,
        date,
        departureTime,
        arrivalTime,
        delay,
        currentLocation
      );

      // Clear the form after successful submission
    //   setTrainID("");
    //   setTrainName("");
    //   setStoppingLocations([]);
    //   setDepartureTime("");
    //   setArrivalTime("");
    //   setDelay("");
    //   setCurrentLocation("");
    } catch (error) {
      console.error("Error adding train schedule:", error);
    }
  };

  return (
    <div className="login_form">
      <h3 className="main_form_h3">Train Scedule</h3>
      <div className="main_form_content">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="trainID">Train ID:</label>
            <input
              type="text"
              id="trainID"
              value={trainID}
              onChange={handleTrainIDChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="trainName">Train Name:</label>
            <input
              type="text"
              id="trainName"
              value={trainName}
              onChange={handleTrainNameChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDate}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="stoppingLocations">Stopping Locations:</label>
            <select
              id="stoppingLocations"
              multiple
              value={stoppingLocations}
              onChange={handleStoppingLocationsChange}
              required
            >
              <option value="Jaffna">Jaffna</option>
              <option value="Anuradhapuram ">Anuradhapuram B</option>
              <option value="Kilinochi C">Kilinochi C</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="row">
            <label htmlFor="departureTime">Departure Time:</label>
            <input
              type="time"
              id="departureTime"
              value={departureTime}
              onChange={handleDepartureTimeChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="arrivalTime">Arrival Time:</label>
            <input
              type="time"
              id="arrivalTime"
              value={arrivalTime}
              onChange={handleArrivalTimeChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="delay">Delay:</label>
            <input
              type="text"
              id="delay"
              value={delay}
              onChange={handleDelayChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="currentLocation">Current Location with GPS:</label>
            <input
              type="text"
              id="currentLocation"
              value={currentLocation}
              onChange={handleCurrentLocationChange}
              required
            />
          </div>
          <button type="submit">Add Train Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default TrainTimeTableForm;