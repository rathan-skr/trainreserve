
import React, { useState } from "react";

const DefaultLayout: React.FC = ({ children }: any) => {
  // const { user, logout } = useAuth();
  // const [showOptions, setshowOptions] = useState(true);
  // const handleLogout = async () => {};
  const handleUser = async () => {
    //  setshowOptions((prevState) => !prevState);
  };
  return (
    <div>
      {/* Add your default layout components here */}
      <header>
        {/* {
          <div className={`user_options_box ${showOptions ? "show" : ""}`}>
            <ul className="user_options_list">
              <li className="user_option_item" onClick={handleLogout}></li>
              <li className="user_option_item" onClick={handleLogout}>
                Logout
              </li>
              <li className="user_option_item" onClick={handleLogout}>
                Edit
              </li>
            </ul>
          </div>
        } */}
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
          <div className="navigation_logo" onClick={handleUser}>
            <img
              className="navigation_image"
              src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
              alt="Logo"
            />
          </div>
          <ul className="navigation_group navigation_aside_shortcut"></ul>
        </nav>{" "}
      </header>
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default DefaultLayout;

