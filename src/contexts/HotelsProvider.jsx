import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const destination = searchParams.get("destination") || "";

  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination}&accommodates_gte${rooms || 1}`
  );

  const updaterSelectedHotel = (elemId) => {
    setSelectedHotel(+elemId);
  };

  return (
    <HotelsContext.Provider
      value={{ data, isLoading, selectedHotel, updaterSelectedHotel }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

const useHotels = () => {
  return useContext(HotelsContext);
};

export { useHotels };
export default HotelsProvider;
