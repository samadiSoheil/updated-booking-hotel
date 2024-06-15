import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../contexts/BookMarksProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const BookmarkList = () => {
  const { bookmarks, isLoading, selectedBookmarks, deleteBookmark } = useBookmarks();
  if (isLoading) return <div>Loading data...</div>;

  const handelDeletBookmark = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  return (
    <>
      <div>
        <h2>Bookmark List</h2>
        <div className="bookmarkList">
          {bookmarks?.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/bookmarks/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
              >
                <div
                  className={`bookmarkItem ${
                    +selectedBookmarks == item.id ? "selectedHotel" : ""
                  }`}
                >
                  <span>
                    <ReactCountryFlag svg countryCode={item.countryCode} />
                    &nbsp;
                    <strong>{item.cityName}</strong>
                    &nbsp;
                    <span>{item.country}</span>
                  </span>
                  <span
                    onClick={(e) => handelDeletBookmark(e, item.id)}
                    style={{
                      padding: ".5rem .6rem",
                      backgroundColor: "rgb(235,235,235)",
                      borderRadius: "50px",
                    }}
                  >
                    <HiTrash style={{ color: "red" }} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BookmarkList;
