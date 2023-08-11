import SeatSelection from "@/components/SeatSelection";
import TrainBoxComponent from "@/components/TrainBox";
import withAuth from "@/components/withAuth";
import React, { useEffect, useState } from "react";

import firebaseConfig from "@/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import TravelCard from "@/components/TravelCard";
import { loadStationData, loadTravelData } from "@/const/const";
interface TravelData {
  id: string;
  date: string;
  stationData: { [key: string]: { charge: string; time: string } };
  stationDataLocationKeys: string[];
  startPlace: string;
  endPlace: string;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Home: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [travelDataArray, setTravelDataArray] = useState<TravelData[]>([]);
  const [stations, setStations] = useState([]);
  const [stationFromID, setStationFromID] = useState(0);
  const [stationFromName, setStationFromName] = useState("");
  const [stationToID, setStationToID] = useState(0);
  const [stationToName, setStationToName] = useState("");
  const [availableTrains, setAvailableTrains] = useState<TravelData[]>([]);
  const [availableReturnTrains, setAvailableReturnTrains] = useState<
    TravelData[]
  >([]);
  console.log("travelDataArray", travelDataArray);
  console.log("stations", stationFromID, stationToID);
  useEffect(() => {
    loadTravelData(setTravelDataArray);
    loadStationData(setStations);
    checkArrivalAvailability();
  }, []);
  const [desiredDate, setDesiredDate] = useState(""); //2023-08-06
  const [returnDate, setReturnDate] = useState(""); //2023-08-06
  const [startPlace, setStartPlace] = useState("Kokuvil");
  const [endPlace, setEndPlace] = useState("Meesalai");
  const [data, setData] = useState<TravelData[]>([]);
  const handleStationFromChange = (event: any) => {
    setStationFromID(event.target.value);
    setStartPlace(event.target.value);
  };
  const handleStationToChange = (event: any) => {
    setStationToID(event.target.value);
    setEndPlace(event.target.value);
  };
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredDate(event.target.value);
  };
  const handleReturnDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(event.target.value);
  };
  const checkArrivalAvailability = () => {
    const filteredData = travelDataArray.filter((item) => {
      const dateMatch = item.date === desiredDate;
      const stationData = item.stationData; // Access stationData property once for safer access
      const stationDataLocationKeys: string[] = stationData
        ? Object.keys(stationData)
        : [];
      console.log(stationDataLocationKeys);
      // const startPlaceIndex = stationDataLocationKeys.indexOf(startPlace);
      // const endPlaceIndex = stationDataLocationKeys.indexOf(endPlace);
      // // Check if startPlace is before endPlace and no other places in between
      // const placesMatch =
      //   startPlaceIndex !== -1 &&
      //   endPlaceIndex !== -1 &&
      //   startPlaceIndex < endPlaceIndex &&
      //   !stationDataLocationKeys
      //     .slice(startPlaceIndex + 1, endPlaceIndex)
      //     .some((location) => stationData[location] !== undefined);

      // Check if the train arrives at endPlace after the given time at startPlace
      const startTime =
        parseFloat(stationData?.[startPlace]?.time?.replace(":", ".")) || 0;
      const endTime =
        parseFloat(stationData?.[endPlace]?.time?.replace(":", ".")) || 0;
      const timeMatch = endTime > startTime;

      return dateMatch && timeMatch;
    });
    setAvailableTrains(filteredData);
    console.log(filteredData, startPlace, endPlace, desiredDate);
  };
  const checkReturnAvailability = () => {
    const filteredData = travelDataArray.filter((item) => {
      const dateMatch = item.date === returnDate;
      const stationData = item.stationData; // Access stationData property once for safer access
      const stationDataLocationKeys: string[] = stationData
        ? Object.keys(stationData)
        : [];
      console.log(stationDataLocationKeys);
      const startTime =
        parseFloat(stationData?.[startPlace]?.time?.replace(":", ".")) || 0;
      const endTime =
        parseFloat(stationData?.[endPlace]?.time?.replace(":", ".")) || 0;
      const timeMatch = endTime < startTime;

      return dateMatch && timeMatch;
    });
    setAvailableReturnTrains(filteredData);
    console.log(filteredData, startPlace, endPlace, desiredDate);
  };
  const check = () => {
    isChecked && checkReturnAvailability(), checkArrivalAvailability();
  };
  const handleCardClick = (clickedItem:any) => {
    setData(clickedItem); 
    console.log(clickedItem); 
  };
  return (
    <div className="main_container">
      <div className="main_image_container">
        <div className="image_overlay">
          <div className="main_text">
            <h1 className="main_h1 right_align_center">
              The Ultimate Secure Reservation Experience
            </h1>
            <h4 className="main_h3">
              Your Seat, Your Choice: Anywhere, Anytime
            </h4>
          </div>
        </div>
        <img className="main_image" src="image_m.jpg" />
      </div>
      <div className="main_form">
        <div className="title">
          <h3 className="main_form_h3">Choose Your Journey</h3>
        </div>
        <div className="main_form_content">
          <div className="from">
            <select
              id="nameSelect"
              value={stationFromID}
              onChange={handleStationFromChange}
            >
              <option value="">-- Select a Arrival Station --</option>
              {stations.map((nameObj: any) => (
                <option key={nameObj.id} value={nameObj.value}>
                  {nameObj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="to">
            <select
              id="nameSelect2"
              value={stationToID}
              onChange={handleStationToChange}
            >
              <option value="">-- Select a Depature Station --</option>
              {stations.map((nameObj: any) => (
                <option key={nameObj.id} value={nameObj.value}>
                  {nameObj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <div className="depature_input">
              <input type="date" placeholder="Depature" onChange={handleDate} />
            </div>
            <div className="check">
              <label>Return?</label>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </div>
          </div>
          {isChecked && (
            <div className="depature_input">
              <input
                type="date"
                placeholder="Return"
                onChange={handleReturnDate}
              />
            </div>
          )}
          <div className="seats">
            <input placeholder="Seats" />
          </div>
          <button onClick={check}>Check Availabilty</button>
        </div>

        {availableTrains && (
          <>
            <>Arrival</>
            <div className="train_cards">
              {availableTrains.map((item, index) => (
                <TravelCard key={index} data={item}  onClick={() => handleCardClick(item)}  />
                
              ))}
            </div>
          </>
        )}
        {isChecked && (
          <>
            <>Return</>
            <div className="train_cards">
              {availableReturnTrains.map((item, index) => (
                <TravelCard key={index} data={item}  onClick={() => handleCardClick(item)}  />
              ))}
            </div>
          </>
        )}
        <div className="train_box">
          <TrainBoxComponent data={data}/>
        </div>
          <div className="train_box">
           {isChecked && (   <TrainBoxComponent data={data} />)}
        </div>
      </div>{" "}
    </div>
  );
};

export default withAuth(Home);
