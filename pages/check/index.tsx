import React from 'react';

const MyComponent: React.FC = () => {
  return (
    <div className="center">
      <div className="center left">
        <label>
          <input type="checkbox" />
          <span className="checkbox"></span>
        </label>
      </div>
      <div className="center right black">
        <label>
          <input type="checkbox" />
          <span className="checkbox dark"></span>
        </label>
      </div>
    </div>
  );
};

export default MyComponent;
