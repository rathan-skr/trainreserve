import React from "react";

const TravelCard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="showcase">
        <div className="travel-card">
          <div className="image">
            <img className="main_image" src="image_m.jpg" />
          </div>
          <div className="content">
            <label className=" topic">Malfort Express</label>
            <h1 className="category">Jaffna to Colombo</h1>
            <h1 className="category">4.30 to 11.00</h1>
            <div className="recommendation">
              <div className="score">
                <span>Available</span>
              </div>
              <div className="score_danger">
                <span>Not Available</span>
              </div>
              <div className="comment">(371 Seats)</div>
            </div>
            <div className="class">
              <div className="discount-info">Available class Types :</div>
              <div className="discount-info">1st,2nd,3rd </div>
          
            </div>
          </div>
          <button className="button-favorite">
            <i className="material-icons">favorite_border</i>
            <i className="material-icons">favorite</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
