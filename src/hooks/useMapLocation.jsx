import { useSearchParams } from "react-router-dom";

const useMapLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lang = searchParams.get("lang");

  return [lat, lang];
};

export default useMapLocation;
