import SeatSelection from "@/components/SeatSelection";
import TrainBoxComponent from "@/components/TrainBox";
import withAuth from "@/components/withAuth";
import { useAuth } from "@/utils/auth";
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
interface TravelData {
  id: string;
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Home: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [travelDataArray, setTravelDataArray] = useState<TravelData[]>([]);
  console.log("travelDataArray", travelDataArray);

  const loadTravelData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trainSchedules"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTravelDataArray(data);
    } catch (error) {
      console.error("Error loading travel data:", error);
    }
  };
  const loadStationData = async () => {
    const querySnapshot = await getDocs(collection(db, "Stations"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    loadTravelData();
    loadStationData();
  }, []);
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
            <input placeholder="From" />
          </div>
          <div className="to">
            <input placeholder="To" />
          </div>
          <div className="">
            <div className="depature_input">
              <input type="date" placeholder="Depature" />
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
              <input type="date" placeholder="Return" />
            </div>
          )}
          <div className="seats">
            <input placeholder="Seats" />
          </div>
          <button>Check Availabilty</button>
        </div>
        <div className="train_box">
          <TrainBoxComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
