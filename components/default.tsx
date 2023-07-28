import React, { useState } from "react";

const DefaultLayout: React.FC = ({ children }: any) => {
  return (
    <div>
      {/* Add your default layout components here */}
      <header>
        <nav className="navigation_header_container">
          <div className="navigation_logo">
            <img className="navigation_image" src="Project.png" alt="Logo" />
          </div>
          <ul className="navigation_group navigation_menu">
            <li className="navigation_items">Reservations</li>
            <li className="navigation_items">Recent Visits</li>
            <li className="navigation_items">Favorites</li>
          </ul>
          <div className="navigation_separator"></div>
          <ul className="navigation_group navigation_aside">
            <li className="navigation_items">Destinations</li>
            <li className="navigation_items">Offers</li>
          </ul> 
          <ul className="navigation_group navigation_aside_shortcut"></ul>
        </nav>{" "}
      </header>
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default DefaultLayout;


{/* <div className="user_logo">
  <img
    className="user_image"
    src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
    alt="Logo"
  />
  <div className="card_form">
    {user ? (
      <>
        <div> {user?.["email"]}</div>
      </>
    ) : (
      <p>Please login to see the content</p>
    )}
  </div>
</div> */}