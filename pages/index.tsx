import React from "react";

const Home: React.FC = () => {
  return (
    <div className="main_container">
      <div className="main_image_container">
        <div className="image_overlay">
          <div className="main_text">
            <h1 className="main_h1 right_align_center">
            The Ultimate Secure  Reservation Experience
            </h1>
            <h4 className="main_h3">Your Seat, Your Choice: Anywhere, Anytime</h4>
          </div>
        </div>
        <img className="main_image" src="image_m.jpg" />
      </div>
      <div className="main_form_content">
         <h3 className="main_form_h3">Choose Your Journey</h3>
      </div>
    </div>
  );
};

export default Home;
