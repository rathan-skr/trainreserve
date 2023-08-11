import React from "react";
const FavoriteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 16.35 2 13.12 2 9.5 2 7.5 3.21 5.63 5.11 4.55 6.04 4 7.01 3.5 8 3.5c1.55 0 3.09.91 4 2.34.91-1.43 2.45-2.34 4-2.34.99 0 1.96.5 2.89 1.06C18.79 5.63 20 7.5 20 9.5c0 3.62-3.4 6.85-8.55 10.54L12 21.35z" />
  </svg>
);

const FavoriteBorderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.73 2.27a6 6 0 0 1 0 8.49L12 21.35l-5.73-5.59a6 6 0 0 1 0-8.49 6 6 0 0 1 8.54 0" />
  </svg>
);
const TravelCard = ({ data, onClick  }: any) => {
  const [isFavorite, setIsFavorite] = React.useState(true);console.log("xdata",data);
  
  return (
    <div className="max-w-6xl mx-auto" onClick={onClick}>
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
          {/* <button className="button-favorite">
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
