import React, { useEffect, useState } from "react";
interface SeatSelection {
  seatName: string;
  rows: number;
  seatsPerRow: number;
  spacingColumn: number;
}
interface SeatSelectionFormProps {
  onReceiveSeatSelectionData: (seatSelectionData: SeatSelection[]) => void;
}
const SeatSelectionForm: React.FC<SeatSelectionFormProps> = ({
  onReceiveSeatSelectionData,
}: any) => {
  const [formRows, setFormRows] = useState<
    Array<{
      seatName: string;
      rows: number;
      seatsPerRow: number;
      spacingColumn: number;
    }>
  >([{ seatName: "A", rows: 0, seatsPerRow: 0, spacingColumn: 0 }]);

  const handleChangeSeatName = (index: number, value: string) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, seatName: value } : row
    );
    setFormRows(updatedRows);
   // handleCreateSeatSelectionData();
  };

  const handleChangeRows = (index: number, value: number) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, rows: value } : row
    );
    setFormRows(updatedRows);
    //handleCreateSeatSelectionData();
  };

  const handleChangeSeatsPerRow = (index: number, value: number) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, seatsPerRow: value } : row
    );
    setFormRows(updatedRows);
  //  handleCreateSeatSelectionData();
  };

  const handleChangeSpacingColumn = (index: number, value: number) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, spacingColumn: value } : row
    );
    setFormRows(updatedRows);
   handleCreateSeatSelectionData();
  };

  const handleCreateSeatSelectionData = () => {
    if (
        formRows.every(
          (row) =>
            row.seatName !== "" &&
            row.rows > 0 &&
            row.seatsPerRow > 0 &&
            row.spacingColumn >= 0
        )
      ) {
        const seatSelection: SeatSelection[] = formRows.filter(
          (row) =>
            row.seatName && row.rows && row.seatsPerRow && row.spacingColumn
        );
        console.log(seatSelection);
        onReceiveSeatSelectionData(seatSelection);
      }
  };
  useEffect(()=>{  })
  const handleAddRow = () => {
    setFormRows([
      ...formRows,
      { seatName: "A", rows: 0, seatsPerRow: 0, spacingColumn: 0 },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = formRows.filter((_, i) => i !== index);
    setFormRows(updatedRows);
  };

  return (
    <div className="seat-selection-form">
      {formRows.map((rowData, index) => (
        <div key={index} className="sseat-selection-form">
          <select
            value={rowData.seatName}
            onChange={(e) => handleChangeSeatName(index, e.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          <input
            type="number"
            value={rowData.rows}
            placeholder="Rows"
            onChange={(e) => handleChangeRows(index, parseInt(e.target.value))}
          />
          <input
            type="number"
            value={rowData.seatsPerRow}
            placeholder="Seats Per Row"
            onChange={(e) =>
              handleChangeSeatsPerRow(index, parseInt(e.target.value))
            }
          />
          <input
            type="number"
            value={rowData.spacingColumn}
            placeholder="Spacing Column"
            onChange={(e) =>
              handleChangeSpacingColumn(index, parseInt(e.target.value))
            }
          />
          {index > 0 && (
            <button onClick={() => handleRemoveRow(index)}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default SeatSelectionForm;
