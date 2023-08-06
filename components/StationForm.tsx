import { loadStationData } from "@/const/const";
import React, { useEffect, useState } from "react";

interface StationData {
  station: string;
  time: string;
  charge: string;
}
interface StationFormProps {
    onReceiveStationData: (stationData: { [key: string]: { time: string; charge: string } }) => void;
  }
  
const StationForm:React.FC<StationFormProps>= ({ onReceiveStationData }:any) => {
  const [formRows, setFormRows] = useState<StationData[]>([
    { station: "", time: "", charge: "" },
  ]);
  const [stations, setStations] = useState<{ id: number; name: string }[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  useEffect(() => {
    loadStationData(setStations);
  }, []);

  const handleChangeStation = (index: number, value: string) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, station: value } : row
    );
    setFormRows(updatedRows);
  };

  const handleChangeTime = (index: number, value: string) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, time: value } : row
    );
    setFormRows(updatedRows);
  };

  const handleChangeCharge = (index: number, value: string) => {
    const updatedRows = formRows.map((row, i) =>
      i === index ? { ...row, charge: value } : row
    );
    setFormRows(updatedRows);
    const stationData: { [key: string]: { time: string; charge: string } } = {};
    formRows.forEach((row) => {
      if (row.station&&row.time&&row.charge) {
        stationData[row.station] = { time: row.time, charge: row.charge };
      }
    });
   // console.log(stationData);
    onReceiveStationData(stationData);
  };

  const handleAddRow = () => {
    setFormRows([...formRows, { station: "", time: "", charge: "" }]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = formRows.filter((_, i) => i !== index);
    setFormRows(updatedRows);
  };

//    useEffect ( () => {
//     const stationData: { [key: string]: { time: string; charge: string } } = {};
//     formRows.forEach((row) => {
//       if (row.station&&row.time&&row.charge) {
//         stationData[row.station] = { time: row.time, charge: row.charge };
//       }
//     });
//    // console.log(stationData);
//     onReceiveStationData(stationData);
//   });

  return (
    <div className="station-form">
      {formRows.map((rowData, index) => (
        <div key={index} className="station-form-row">
          <select
            value={rowData.station}
            onChange={(e) => handleChangeStation(index, e.target.value)}
          >
            <option value="">-- Select a Station --</option>
            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={rowData.time}
            placeholder="Time"
            onChange={(e) => handleChangeTime(index, e.target.value)}
          />
          <input
            type="number"
            value={rowData.charge}
            placeholder="Charge"
            onChange={(e) => handleChangeCharge(index, e.target.value)}
          />
          {index > 0 && <button onClick={() => handleRemoveRow(index)}>Remove</button>}
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      
    </div>
  );
};

export default StationForm;
