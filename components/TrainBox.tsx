import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SeatSelectionBoxProps {
  data: {
    name: string;
    rows: number;
    seatsPerRow: number;
    spacingColumn: number;
  };
  preselectedSeats: string[];
  onSelectionChange: (name: string, selectedSeats: string[]) => void;
}

const SeatSelectionBox: React.FC<SeatSelectionBoxProps> = ({
  data,
  preselectedSeats,
  onSelectionChange,
}) => {
  const { name, rows, seatsPerRow, spacingColumn } = data;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelection = (seat: string) => {
    // Check if the seat is preselected or not before handling the selection
    if (preselectedSeats.includes(seat)) {
      return;
    }

    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const renderSeatSelection = () => {
    const seatSelection: JSX.Element[] = [];

    for (let row = 1; row <= rows; row++) {
      const seats: JSX.Element[] = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatLabel = `${name}-${(row - 1) * seatsPerRow + seat}`;

        const isPreselected = preselectedSeats.includes(seatLabel);
        const isChecked = selectedSeats.includes(seatLabel);

        seats.push(
          <label key={`seat-${row}-${seat}`} className="seat-label">
            <input
              type="checkbox"
              checked={isChecked}
              disabled={isPreselected}
              onChange={() => handleSeatSelection(seatLabel)}
            />
            <span className="checkbox">{seatLabel}</span>
          </label>
        );

        // Add extra spacing after the specified column
        if (seat === spacingColumn) {
          seats.push(<div key={`gap-${row}-${seat}`} className="column-gap" />);
        }
      }

      seatSelection.push(
        <div key={`row-${row}`} className="row-wrapper">
          <div className="seat-wrapper">{seats}</div>
        </div>
      );
    }

    return seatSelection;
  };

  // Call the parent component's onSelectionChange callback when selected seats change
  useEffect(() => {
    onSelectionChange(name, selectedSeats);
  }, [name, selectedSeats, onSelectionChange]);

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('Swiped Left'), // Add your own swipe left action
    onSwipedRight: () => console.log('Swiped Right'), // Add your own swipe right action
  });

  return (
    <div className="seat-selection-container" {...handlers}>
      <h3 className="main_form_h3">Select Seats - {name}</h3>
      <div className="seat-selection-wrapper">{renderSeatSelection()}</div>
    </div>
  );
};

const TrainBoxComponent: React.FC = () => {
  const [selectedSeatsData, setSelectedSeatsData] = useState<{ [name: string]: string[] }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const seatSelectionData = [
    { name: 'A', rows: 5, seatsPerRow: 6, spacingColumn: 3 },
    { name: 'B', rows: 8, seatsPerRow: 4, spacingColumn: 2 },
    { name: 'C', rows: 10, seatsPerRow: 5, spacingColumn: 2 },
  ];

  const handleSelectionChange = (name: string, selectedSeats: string[]) => {
    setSelectedSeatsData((prevSelectedSeatsData) => ({
      ...prevSelectedSeatsData,
      [name]: selectedSeats,
    }));
  };

  useEffect(() => {
    const formattedSelectedSeats: string[] = [];

    for (const name in selectedSeatsData) {
      const seats = selectedSeatsData[name];
      formattedSelectedSeats.push(...seats.map((seat) => `${name}-${seat.split('-')[1]}`));
    }

    console.log(formattedSelectedSeats);
  }, [selectedSeatsData]);

  const handleSwipe = (delta: number) => {
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < seatSelectionData.length) {
      setCurrentIndex(newIndex);
    }
  };

  const preselectedSeats = ['A-1', 'B-12', 'C-23'];

  return (
    <div>
      <div className="swipe-box">
        <div className="swipe-button" onClick={() => handleSwipe(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="seat-selection-box">
          <SeatSelectionBox
            data={seatSelectionData[currentIndex]}
            preselectedSeats={preselectedSeats.filter((seat) =>
              seat.startsWith(seatSelectionData[currentIndex].name + '-')
            )}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <div className="swipe-button" onClick={() => handleSwipe(1)}>
        <FontAwesomeIcon icon={faChevronRight} /> 
        </div>
      </div>
    </div>
  );
};

export default TrainBoxComponent;
