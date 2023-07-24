import SeatSelection from "@/components/SeatSelection";
import TrainBoxComponent from "@/components/TrainBox";
import React from "react";

const Home: React.FC = () => {
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
          <div className="depature">
            <input placeholder="Depature" />
          </div>
          <div className="return">
            <input placeholder="Return" />
          </div>
          <div className="seats">
            <input placeholder="Seats" />
          </div>
          <button>Check Availabilty</button>
        </div>
        <div className="train_box">
        <TrainBoxComponent/> 
        </div>
      </div>
      <div className="card_form">
           idci
      </div>
    </div>
  );
};

export default Home;
