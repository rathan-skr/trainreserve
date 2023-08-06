import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "@/utils/authProvider";
import firebaseConfig from "@/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, updateDoc, addDoc } from "firebase/firestore";
import withAuth from "./withAuth";
import { loadStationData } from "@/const/const";
import StationForm from "./StationForm";
import SeatSelectionForm from "./SeatCreate";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
interface SeatSelection {
  seatName: string;
  rows: number;
  seatsPerRow: number;
  spacingColumn: number;
}
const TrainTimeTableForm: React.FC = () => {
  const { addTrainScheduleToFirestore } = useAuth();
  const [trainID, setTrainID] = useState("");
  const [trainName, setTrainName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stoppingLocations, setStoppingLocations] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [preselectedSeats, setPreselectedSeats] = useState<string[]>(['A-1']);
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [delay, setDelay] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [seatAvailable, setSeatAvailable] = useState<boolean>(false);
  const [stationData, setStationData] = useState<{
    [key: string]: { time: string; charge: string };
  }>({});
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
  const handleStoppingLocationsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setStoppingLocations(selectedOptions);
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setClasses(selectedOptions);
  };
  const handleDepartureTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureTime(event.target.value);
  };
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleseatAvailableChange = () => {
    setSeatAvailable((prevValue) => !prevValue); // Toggle the value between true and false
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Call a function to create the train schedule in Firebase Firestore
      // await setDoc(doc(db, "trainSchedules",trainID), {
      //   trainID,
      //   trainName,
      //   stoppingLocations,
      //   departureTime,
      //   arrivalTime,
      //   delay,
      //   currentLocation,
      // });
      const docRef = await addDoc(collection(db, "trainSchedules"), {
        trainID,
        trainName,
        stoppingLocations,
        departureTime,
        arrivalTime,
        delay,
        currentLocation,
        from,
        to,
        seatAvailable,
        classes,
        stationData,
        seatSelectionData,
        preselectedSeats
      });
      // Clear the form after successful submission
      setTrainID("");
      setTrainName("");
      setStoppingLocations([]);
      setDepartureTime("");
      setArrivalTime("");
      setDelay("");
      setCurrentLocation("");
      setFrom("");
      setTo("");
    } catch (error) {
      console.error("Error adding train schedule:", error);
    }
  };
  const [stations, setStations] = useState([]);
  useEffect(() => {
    loadStationData(setStations);
  }, []);
  const handleReceiveStationData = (stationData: {
    [key: string]: { time: string; charge: string };
  }) => {
    console.log("Received station data in parent component:", stationData);
    setStationData(stationData);
  };
  const [seatSelectionData, setSeatSelectionData] = useState<SeatSelection[]>([]);
  const handleReceiveSeatData = (seatSelectionData: SeatSelection[]) => {
    console.log(
      "Received seat selection data in parent component:",
      seatSelectionData
    );
    setSeatSelectionData(seatSelectionData);
  };

  return (
    <div className="schedule_form">
      <h3 className="main_form_h3">Train Scedule</h3>
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
          <label htmlFor="trainName">Train From:</label>
          <input
            type="text"
            id="trainName"
            value={from}
            onChange={handleTrainFrom}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="trainName">Train To:</label>
          <input
            type="text"
            id="trainName"
            value={to}
            onChange={handleTrainTo}
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
        <div className="">
          <StationForm onReceiveStationData={handleReceiveStationData} />
          <SeatSelectionForm
            onReceiveSeatSelectionData={handleReceiveSeatData}
          />
        </div>
        <div className="row">
          <label htmlFor="classes">Classes:</label>
          <select
            id="classes"
            multiple
            value={classes}
            onChange={handleClassChange}
            required
          >
            <option value="1st class">1st class</option>
            <option value="2nd class">2nd class</option>
            <option value="3rd class">3rd class</option>
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
        <div className="check">
          <label htmlFor="seat available">Is seat available:</label>
          <input
            type="checkbox"
            className="custom-checkbox"
            id="seatavailable"
            checked={seatAvailable}
            onChange={handleseatAvailableChange}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Add Train Schedule
        </button>
      </div>
    </div>
  );
};

export default withAuth(TrainTimeTableForm);
