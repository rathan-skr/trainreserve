import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
//-----------------------------------------------------------------interfaces-------------------------------------------------------------------------------------//
interface SeatSelectionBoxProps {
  data: {
    seatName: string;
    rows: number;
    seatsPerRow: number;
    spacingColumn: number;
  };
  preselectedSeats: string[];
  onSelectionChange: (seatName: string, selectedSeats: string[]) => void;
}
interface TravelData {
  id: string;
  date: string;
  stationData: { [key: string]: { charge: string; time: string } };
  stationDataLocationKeys: string[];
  startPlace: string;
  endPlace: string;
}
interface TrainBoxProps {
  data: TravelData[];
  onButtonClicked: ({ data }: any) => void;
  formattedSelectedSeats: string[];
}
//---------------------------------------------------------------Seat selection box------------------------------------------------------------------------------//
const SeatSelectionBox: React.FC<SeatSelectionBoxProps> = ({
  data,
  preselectedSeats,
  onSelectionChange,
}) => {
  const { seatName, rows, seatsPerRow, spacingColumn } = data || {};
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
  //----------------------------------------------------------renderSeatSelection--------------------------------------------------------------------------------//
  const renderSeatSelection = () => {
    const seatSelection: JSX.Element[] = [];
    for (let row = 1; row <= rows; row++) {
      const seats: JSX.Element[] = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatLabel = `${seatName}-${(row - 1) * seatsPerRow + seat}`;

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
  const check = () => {};
  // Call the parent component's onSelectionChange callback when selected seats change
  useEffect(() => {
    onSelectionChange(seatName, selectedSeats);
  }, [seatName, selectedSeats, onSelectionChange]);

  return (
    <div className="seat-selection-container">
      <h3 className="main_form_h3">Select Seats - {seatName}</h3>
      <div className="seat-selection-wrapper">{renderSeatSelection()}</div>
      <div className="main_form_content"></div>
    </div>
  );
};
//---------------------------------------------------------Parent Component---------------------------------------------------------------------------//
const ParentComponent: React.FC<TrainBoxProps> = ({
  data,
  onButtonClicked,
  formattedSelectedSeats,
}: any) => {
  const [selectedSeatsData, setSelectedSeatsData] = useState<{
    [seatName: string]: string[];
  }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const seatSelectionData2 = [
    { seatName: "A", rows: 5, seatsPerRow: 6, spacingColumn: 3 },
    { seatName: "B", rows: 8, seatsPerRow: 4, spacingColumn: 2 },
    { seatName: "C", rows: 10, seatsPerRow: 5, spacingColumn: 2 },
  ];
  const seatSelectionData = data[0].seatSelectionData || seatSelectionData2;
  const preselectedSeats2 = ["A-1", "B-12", "C-23"];
  const preselectedSeats = data[0].preselectedSeats || preselectedSeats2;
  const handleSelectionChange = (seatName: string, selectedSeats: string[]) => {
    setSelectedSeatsData((prevSelectedSeatsData) => {
      // Check if the new selection is different from the previous one
      if (
        JSON.stringify(prevSelectedSeatsData[seatName]) ===
        JSON.stringify(selectedSeats)
      ) {
        // If it's the same, return the previous state to avoid unnecessary updates
        return prevSelectedSeatsData;
      }

      // If it's different, update the selected seats data
      return {
        ...prevSelectedSeatsData,
        [seatName]: selectedSeats,
      };
    });
  };
  const handleSwipe = (delta: number) => {
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < seatSelectionData.length) {
      setCurrentIndex(newIndex);
    }
  };
  const isFirstBox = currentIndex === 0;
  const isLastBox = currentIndex === seatSelectionData.length - 1;
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });
  //----------------------------------------------------------------------formattedSelectedSeats-------------------------------------------------------------------------------------------//
  const formattedSelectedSeats1: string[] = [];
  useEffect(() => {
    formattedSelectedSeats.push(Object.values(selectedSeatsData).flat());
    console.log(formattedSelectedSeats1);
  }, [selectedSeatsData]);
  // useEffect(() => {
  //   const formattedSelectedSeats1: string[] = [];
  //   for (const seatName in selectedSeatsData) {
  //     if (seatName === selectedSeatsData[seatName][0]?.split("-")[0]) {
  //       formattedSelectedSeats.push(...selectedSeatsData[seatName]);
  //     }
  //   }
  //   console.log(formattedSelectedSeats);
  //   const combined = Object.values(selectedSeatsData).flat();
  //   console.log(combined);
  // }, [selectedSeatsData]);

  console.log("data", data[0].id);
  return (
    <>
      <div className="swipe-box" {...handlers}>
        <div
          className={`swipe-button ${isFirstBox ? "disabled" : ""}`}
          onClick={() => handleSwipe(-1)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={isFirstBox ? "disabled" : ""}
          />
        </div>
        <div className="seat-selection-box">
          <SeatSelectionBox
            data={seatSelectionData[currentIndex]}
            preselectedSeats={preselectedSeats.filter((seat: any) =>
              seat.startsWith(seatSelectionData[currentIndex]?.seatName + "-")
            )}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <div
          className={`swipe-button ${isLastBox ? "disabled" : ""}`}
          onClick={() => handleSwipe(1)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={isLastBox ? "disabled" : ""}
          />
        </div>
      </div>{" "}
      <div className="main_form_content2">
        <button onClick={() => onButtonClicked(selectedSeatsData)}>
          Confirm
        </button>
      </div>
    </>
  );
};
export default ParentComponent;
