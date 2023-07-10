// components/SeatSelection.tsx

import React, { useState } from 'react';

const SeatSelection: React.FC = () => {
  const rows = 10;
  const seatsPerRow = 4;

  const preselectedSeats = [5, 23,9,11]; // Add your preselected seats here

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatSelection = (seatNumber: number) => {
    // Check if the seat is preselected or not before handling the selection
    if (preselectedSeats.includes(seatNumber)) {
      return;
    }

    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((s) => s !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const renderSeatSelection = () => {
    const seatSelection: JSX.Element[] = [];

    for (let row = 1; row <= rows; row++) {
      const seats: JSX.Element[] = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = (row - 1) * seatsPerRow + seat;

        const isPreselected = preselectedSeats.includes(seatNumber);
        const isChecked = selectedSeats.includes(seatNumber);

        seats.push(
          <label key={`seat-${row}-${seat}`} className="seat-label">
            <input
              type="checkbox"
              checked={isChecked}
              disabled={isPreselected}
              onChange={() => handleSeatSelection(seatNumber)}
            />
            <span className="checkbox">{seatNumber}</span>
          </label>
        );
      }

      seatSelection.push(
        <div key={`row-${row}`} className="row-wrapper">
          <div className="seat-wrapper">{seats}</div>
        </div>
      );
    }

    return seatSelection;
  };

  return (
    <div className="seat-selection-container">
     <h3 className="main_form_h3"> Select Seats</h3>
      <div className="seat-selection-wrapper">{renderSeatSelection()}</div>
    </div>
  );
};

export default SeatSelection;
