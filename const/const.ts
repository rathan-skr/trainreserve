import firebaseConfig from "@/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const loadStationData = async (setStations:any) => {
    const querySnapshot = await getDocs(collection(db, "Stations"));
    querySnapshot.forEach((doc) => {
        setStations(doc.data().stations);
    });
  };

  export const loadTravelData = async (setTravelDataArray:any) => {
    try {
      const querySnapshot = await getDocs(collection(db, "trainSchedules"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTravelDataArray(data);
    } catch (error) {
      console.error("Error loading travel data:", error);
    }
  };