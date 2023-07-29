import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "@/utils/authProvider";
import firebaseConfig from "@/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, updateDoc, addDoc } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
type Station = {
  id: number;
  name: string;
};
const TrainDetails: React.FC = () => {
  const [trainID, setTrainID] = useState("");
  const [trainName, setTrainName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const handleTrainIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrainID(event.target.value);
  };
  const handleTrainNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrainName(event.target.value);
  };
  const handleTrainFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value);
  };
  const handleTrainTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };
  const handleTrainDetailsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Traindetails"), {
        trainID,
        trainName,
        from,
        to,
      });
      // Clear the form after successful submission
      setTrainID("");
      setTrainName("");
      setFrom("");
      setTo("");
    } catch (error) {
      console.error("Error adding train schedule:", error);
    }
  };
  //-------------------------------------------------------------------Update / create Locations--------------------------------------------------------//
  const [Stations, setStations] = useState("");
  const [stationsOutput, setStationsOutput] = useState<Station[]>([]);
  const handleStationsChange = (e: any) => {
    const { value } = e.target;
    // Parse comma-separated values to an array and trim any extra spaces

    setStations(value);
  };
  const handleStationsSubmit = async (event:any) => {
    event.preventDefault();
    const stationsArray: Station[] = Stations
    .split(",")
    .map((station, index) => {
      return { id: index + 1, name: station.trim() };
    });
    try {
      const stationsObject = { stations: stationsArray };
      const docRef = collection(db, "Stations");
      await addDoc(docRef, stationsObject); 
      setStationsOutput(stationsArray);
      // Update the currentId for the next batch of stations
      setStations("");

      // Clear the form after successful submission
      setStations("");
    } catch (error) {
      console.error("Error adding stations:", error);
    }
  };
  return (
    <>
      <div className="schedule_form">
        <h3 className="main_form_h3">Train details</h3>
        <div className="schedule_form_content">
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
            <label htmlFor="trainName">Seats:</label>
            <input
              type="text"
              id="trainName"
              value={from}
              onChange={handleTrainFrom}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="trainName">Current Location:</label>
            <input
              type="text"
              id="trainName"
              value={to}
              onChange={handleTrainTo}
              required
            />
          </div>

          <button type="submit" onClick={handleTrainDetailsSubmit}>
            Update Train Details
          </button>
        </div>
      </div>
      <div className="schedule_form">
        <h3 className="main_form_h3">Stations</h3>
        <div className="schedule_form_content">
        <div className="row">
        <label htmlFor="Stations">Stations:</label>
        <input
          type="text"
          id="Stations"
          value={Stations}
          onChange={handleStationsChange}
          required
        /> 
      </div>

          <button type="submit" onClick={handleStationsSubmit}>
            Add Train Stations
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainDetails;


{/* <h3>Output:</h3>
        <pre>{JSON.stringify(stationsOutput, null, 2)}</pre> */}