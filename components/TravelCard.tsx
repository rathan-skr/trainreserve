import React from "react";

const TravelCard = ({ data }: any) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="showcase">
        <div className="travel-card">
          <div className="image">
            <img className="main_image" src={data?.image} />
          </div>
          <div className="content">
            <label className=" topic">{data?.trainName}</label>
            <h1 className="category">
              {data?.from} to {data?.to}
            </h1>
            <h1 className="category">
              {data?.arrivalTime} to {data?.departureTime}
            </h1>
            <div className="recommendation">
              {data?.seatAvailable ? (
                <div className="score">
                  <span>Available</span>
                </div>
              ) : (
                <div className="score_danger">
                  <span>Not Available</span>
                </div>
              )}

              {/* <div className="comment">(371 Seats)</div> */}
            </div>
            <div className="class">
              <div className="discount-info">Available class Types :</div>
              <div className="discount-info">{data?.classes} </div>
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
