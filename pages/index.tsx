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
import { time } from "console";
interface TravelData {
  id: string;
  date: string;
  stationData: { [key: string]: { charge: string; time: string } };
  stationDataLocationKeys: string[];
  startPlace: string;
  endPlace: string;
  trainName: string;
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
  console.log("travelDataArray", availableTrains);
  console.log("stations", stationFromID, stationToID);
  useEffect(() => {
    loadTravelData(setTravelDataArray);
    loadStationData(setStations);
    checkArrivalAvailability();
  }, []);
  const [desiredDate, setDesiredDate] = useState(""); //2023-08-06
  const [returnDate, setReturnDate] = useState(""); //2023-08-06
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");
  const [startPlaceTime, setStartPlaceTime] = useState("");
  const [endPlaceTime, setEndPlaceTime] = useState("");
  const [arrivalData, setArrivalData] = useState<TravelData[]>([]);
  const [returnData, setReturnData] = useState<TravelData[]>([]);
  const [selectedCardIndexArrival, setSelectedCardIndexArrival] = useState(-1);
  const [selectedCardIndexReturn, setSelectedCardIndexReturn] = useState(-1);
  const [selectedCardDataArrival, setSelectedCardDataArrival] = useState<
    TravelData[]
  >([]);
  const [selectedCardDataReturn, setSelectedCardDataReturn] = useState<
    TravelData[]
  >([]);
  const [selectedCardSeatsaArrival, setSelectedCardSeatsaArrival] = useState<
    string[]
  >([]);
  const [selectedCardSeatsaReturn, setSelectedCardSeatsaReturn] = useState<
    string[]
  >([]);
  console.log(returnData, arrivalData);

  console.log("A", selectedCardDataArrival, selectedCardSeatsaArrival);
  console.log("R", selectedCardDataReturn, selectedCardSeatsaReturn);
  console.log("A1", selectedCardSeatsaArrival);
  console.log("R1", selectedCardSeatsaReturn);
  const [activeReturnSection, setActiveReturnSection] = useState("");
  const [activeArrivalSection, setActiveArrivalSection] = useState("");
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
      setStartPlaceTime(stationData?.[startPlace]?.time);
      setEndPlaceTime(stationData?.[endPlace]?.time);
      console.log(startPlaceTime, endTime);
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
  const handleCardClick = (clickedItem: any) => {
    console.log(arrivalData);

    if (activeSection === "arrival") {
      setArrivalData(clickedItem);
      setActiveArrivalSection("arrival");
      console.log(clickedItem);
    } else if (activeSection === "return") {
      setReturnData(clickedItem);
      console.log(clickedItem);
      setActiveReturnSection("return");
    }
  };
  let activeSection = "";
  let activeBox = "";
  const [selectedArrivalData, setSelectedArrivalData] = useState(null);
  const [showArrivalTable, setShowArrivalTable] = useState(false);
  const [showReturnTable, setShowReturnTable] = useState(false);
  const [showReturnTable2, setShowReturnTable2] = useState(false);
  const [showArrivalData, setShowArrivalData] = useState(true);
  const [showReturnData, setShowReturnData] = useState(true);
  const [showBill, setShowBill] = useState(false);
  const [arrivalCharge, setArrivalCharge] = useState(0);
  const [returnCharge, setReturnCharge] = useState(0);
  const handleButtonClicked2 = ({ data }: any) => {
    console.log("calling", activeBox, data);
    setSelectedArrivalData(data);
  };
  console.log(selectedCardDataReturn);
  const [formattedSelectedSeats, setFormattedSelectedSeats] = useState<
    string[]
  >([]);
  const handleButtonClicked = ({ data }: any) => {
    console.log("calling", activeBox, data);
    // Update the selected arrival data
    setSelectedArrivalData(data);
    // Calculate total value based on selected seats
    const seatCounts: { [key: string]: number } = {
      A: 0,
      B: 0,
      C: 0,
    };
    let lastNonEmptyArray: string[] = [];
    let x = formattedSelectedSeats.length;
    console.log(formattedSelectedSeats[x - 1]);
    let seats = formattedSelectedSeats[x - 1];
    console.log(seats);
    const uniqueSeats = [];
    const seen: { [key: string]: boolean } = {};

    for (const item of seats) {
      if (!seen[item]) {
        uniqueSeats.push(item);
        seen[item] = true;
      }
    }
    console.log(uniqueSeats);
    console.log(lastNonEmptyArray);
    uniqueSeats.forEach((seat: any) => {
      const [letter] = seat.split("-");
      if (seatCounts.hasOwnProperty(letter)) {
        seatCounts[letter]++;
      }
    });
    const valueMultiplier: { [key: string]: number } = {
      A: 500,
      B: 300,
      C: 200,
    };
    const totalValue = Object.keys(seatCounts).reduce((total, letter) => {
      return total + seatCounts[letter] * valueMultiplier[letter];
    }, 0);
    console.log("Seat counts:", seatCounts, formattedSelectedSeats);
    console.log("Total value:", totalValue);
    if (showArrivalData && totalValue >= 200) {
      setShowReturnTable(true);
      setShowArrivalData(false);
      setShowArrivalTable(false);
      setSelectedCardSeatsaArrival(uniqueSeats);
      !showReturnTable2 && setShowBill(true);
      setArrivalCharge(totalValue);
    }
    if (showReturnTable && totalValue >= 200) {
      setShowReturnTable(false);
      setSelectedCardSeatsaReturn(uniqueSeats);
      setShowReturnData(false);
      setShowBill(true);
      setReturnCharge(totalValue);
    }
  };
const Payment =()=>{
console.log(arrivalCharge+returnCharge);

}
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
        {availableTrains && showArrivalData && (
          <>
            {availableTrains.length >= 1 && <>Arrival trains</>}
            <div className="train_cards">
              {availableTrains.map((item, index) => (
                <div
                  className={
                    selectedCardIndexArrival === index ? "selected-card" : ""
                  }
                >
                  <TravelCard
                    key={index}
                    data={item}
                    onClick={() => {
                      handleCardClick(item);
                      activeSection = "arrival";
                      setSelectedCardIndexArrival(index);
                      3;
                      setShowArrivalTable(true);
                      setSelectedCardDataArrival([item]);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {isChecked && showReturnData && (
          <>
            {availableReturnTrains.length >= 1 && <>Return trains</>}
            <div className="train_cards">
              {availableReturnTrains.map((item, index) => (
                <div
                  className={
                    selectedCardIndexReturn === index ? "selected-card" : ""
                  }
                >
                  <TravelCard
                    key={index}
                    data={item}
                    onClick={() => {
                      handleCardClick(item);
                      activeSection = "return";
                      setSelectedCardIndexReturn(index);
                      setSelectedCardDataReturn([item]);
                      setShowReturnTable2(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="train_box">
          {showArrivalTable && (
            <>
              <>Select Arrival Seats</>
              <TrainBoxComponent
                data={selectedCardDataArrival}
                formattedSelectedSeats={formattedSelectedSeats}
                onButtonClicked={handleButtonClicked}
              />
            </>
          )}
        </div>
        <div className="train_box">
          {isChecked && showReturnTable && showReturnTable2 && (
            <>
              <>Select Return Seats</>
              <TrainBoxComponent
                data={selectedCardDataReturn}
                onButtonClicked={handleButtonClicked}
                formattedSelectedSeats={formattedSelectedSeats}
              />
            </>
          )}
        </div>
        {showBill && (
          <div className="train_box2">
            Billing
            {selectedCardSeatsaArrival.length >= 1 && (
              <div className="ticket">
                <div className="header">
                  <h5>Arrival Ticket</h5>
                </div>
                <hr></hr>
                <div className="row2">
                  <span className="label">Train name:</span>
                  <span className="value">
                    {selectedCardDataArrival[0]?.trainName}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Date:</span>
                  <span className="value">
                    {selectedCardDataArrival[0]?.date}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Start Place:</span>
                  <span className="value">{startPlace}</span>
                </div>
                <div className="row2">
                  <span className="label">Start Time:</span>
                  <span className="value">
                    {selectedCardDataArrival[0]?.stationData[startPlace]?.time}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">End Place:</span>
                  <span className="value">{endPlace}</span>
                </div>
                <div className="row2">
                  <span className="label">End Time:</span>
                  <span className="value">
                    {selectedCardDataArrival[0]?.stationData[endPlace]?.time}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Seats:</span>
                  <span className="value">
                    {selectedCardSeatsaArrival.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </span>
                </div>
                <hr></hr>
                <div className="row2">
                  <span className="label">Charge:</span>
                  <span className="value">{arrivalCharge}</span>
                </div>
              </div>
            )}
            {selectedCardSeatsaReturn.length >= 1 && (
              <div className="ticket">
                <div className="header">
                  <h5>Return Ticket</h5>
                </div>
                <hr></hr>
                <div className="row2">
                  <span className="label">Train name:</span>
                  <span className="value">
                    {selectedCardDataReturn[0]?.trainName}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Date:</span>
                  <span className="value">
                    {selectedCardDataReturn[0]?.date}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Start Place:</span>
                  <span className="value">{endPlace}</span>
                </div>
                <div className="row2">
                  <span className="label">Start Time:</span>
                  <span className="value">
                    {selectedCardDataReturn[0]?.stationData[endPlace]?.time}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">End Place:</span>
                  <span className="value">{startPlace}</span>
                </div>
                <div className="row2">
                  <span className="label">End Time:</span>
                  <span className="value">
                    {selectedCardDataReturn[0]?.stationData[startPlace]?.time}
                  </span>
                </div>
                <div className="row2">
                  <span className="label">Seats:</span>
                  <span className="value">
                    {selectedCardSeatsaReturn.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </span>
                </div>
                <hr></hr>
                <div className="row2">
                  <span className="label">Charge:</span>
                  <span className="value">{returnCharge}</span>
                </div>
              </div>
            )}
            <div className="main_form_content">
              <button onClick={() =>Payment ()}>
                Proceed Payment
              </button>
            </div>
          </div>
        )}
        <></>
      </div>
    </div>
  );
};

export default withAuth(Home);
