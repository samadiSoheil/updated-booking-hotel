import { Outlet } from "react-router-dom";
import Map from "../components/Map/Map";
import { useHotels } from "../contexts/HotelsProvider";

const AppLayout = () => {
  const { data, isLoading, updaterSelectedHotel } = useHotels();

  return (
    <>
      <div className="appLayout">
        <div className="sidebar">
          <Outlet />
        </div>
        <Map data={data} isLoading={isLoading} updaterSelected={updaterSelectedHotel} />
      </div>
    </>
  );
};

export default AppLayout;
