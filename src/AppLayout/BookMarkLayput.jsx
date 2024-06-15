import { Outlet } from "react-router-dom";
import Map from "../components/Map/Map";
import { useBookmarks } from "../contexts/BookMarksProvider";

const BookMarkLayput = () => {
  const { bookmarks, isLoading, updaterSelectedBookmarks } = useBookmarks();
  return (
    <>
      <div className="appLayout">
        <div className="sidebar">
          <Outlet />
        </div>
        <Map
          data={bookmarks}
          isLoading={isLoading}
          updaterSelected={updaterSelectedBookmarks}
        />
      </div>
    </>
  );
};

export default BookMarkLayput;
