// components/SeatSelection.tsx

import React, { useState } from 'react';

const SeatSelection: React.FC = () => {
  const rows = 20;
  const seatsPerRow = 4;

  const preselectedSeats = ['2-1', '5-3']; // Add your preselected seats here

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelection = (seatId: string) => {
    // Check if the seat is preselected or not before handling the selection
    if (preselectedSeats.includes(seatId)) {
      return;
    }

    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((s) => s !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const renderSeatSelection = () => {
    const seatSelection: JSX.Element[] = [];

    for (let row = 1; row <= rows; row++) {
      const seats: JSX.Element[] = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;

        const isPreselected = preselectedSeats.includes(seatId);
        const isChecked = selectedSeats.includes(seatId);

        seats.push(
          <label key={`seat-${row}-${seat}`} className="seat-label">
            <input
              type="checkbox"
              checked={isChecked}
              disabled={isPreselected}
              onChange={() => handleSeatSelection(seatId)}
            />
            {seat}
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
      <h1>Seat Selection</h1>
      <div className="seat-selection-wrapper">{renderSeatSelection()}</div>
    </div>
  );
};

export default SeatSelection;
