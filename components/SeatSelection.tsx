// components/SeatSelection.tsx

import React, { useState } from 'react';

const SeatSelection: React.FC = () => {
  const rows = 20;
  const seatsPerRow = 4;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelection = (row: number, seat: number) => {
    const seatId = `${row}-${seat}`;

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

    for (let row =0; row <= rows-1; row++) {
      const seats: JSX.Element[] = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;

        seats.push(
          <label key={`seat-${row}-${seat}`} className="seat-label">
            <input
              type="checkbox"
              checked={selectedSeats.includes(seatId)}
              onChange={() => handleSeatSelection(row, seat)}
            />
            <span className="seat-number">Seat {seat}</span>
          </label>
        );
      }

      seatSelection.push(
        <div key={`row-${row}`} className="row-wrapper">
          <span className="row-label">Row {row}</span>
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
