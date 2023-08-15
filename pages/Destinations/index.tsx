import TravelCard from "@/components/TravelCard";
import { loadTravelData } from "@/const/const";
import React, { useEffect, useState } from "react";
interface TravelData {
  id: string;
  date: string;
  stationData: { [key: string]: { charge: string; time: string } };
  stationDataLocationKeys: string[];
  startPlace: string;
  endPlace: string;
  trainName: string;
  preselectedSeats: string[];
}
const Destinations = () => {
  const [travelDataArray, setTravelDataArray] = useState<TravelData[]>([]);
  const [selectedCardIndexReturn, setSelectedCardIndexReturn] = useState(-1);
  useEffect(() => {
    loadTravelData(setTravelDataArray);
  }, []);
  return (   <div className="main_container">
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
        <img className="main_image" src="image_s.jpg" />
      </div>
    <div className="main_form">
    <div className="train_cards">
      {travelDataArray.map((item, index) => (
        <div
          className={selectedCardIndexReturn === index ? "selected-card" : ""}
        >
          <TravelCard
            key={index}
            data={item}
            onClick={() => {
              // handleAllCardClick(item);
              // setSelectedCardIndexReturn(index);
              // setSelectedCardDataReturn([item]);
            }}
          />
        </div>
      ))}
    </div>
    </div>
   </div>
  );
};
export default Destinations;