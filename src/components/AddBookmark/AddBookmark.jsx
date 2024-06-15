import { useNavigate } from "react-router-dom";
import useMapLocation from "../../hooks/useMapLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../contexts/BookMarksProvider";

const AddBookmark = () => {
  const { createNewBookmark } = useBookmarks();
  const [lat, lang] = useMapLocation();
  const [locationName, setLocationName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const navigateUser = useNavigate();
  const handlerBackPage = (e) => {
    e.preventDefault();
    navigateUser(-1);
  };

  useEffect(() => {
    if (!lat && !lang) return;
    const fetchingLocationData = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lang}`
        );
        if (!data.countryCode || !data.city) {
          throw new Error(
            `there is not ${
              data.countryCode ? "city" : "contry"
            },please select onother place!`
          );
        }
        setLocationName(data.city || data.locality);
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingLocationData();
  }, [lat, lang]);

  if (isLoading) return <p>data is Loading...</p>;
  if (isError) return <p style={{ color: "red" }}>{isError}</p>;

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!countryName || !locationName) return;

    const newLocation = {
      cityName: locationName,
      country: countryName,
      countryCode: countryCode,
      latitude: lat,
      longitude: lang,
      host_location: locationName + " " + countryName,
      id: Date.now(),
    };
    await createNewBookmark(newLocation);
    navigateUser("/bookmarks");
  };

  return (
    <>
      <div>
        <h2>Bookmark New Location</h2>
        <form onSubmit={handelSubmit} className="form" style={{ marginTop: "30PX" }}>
          <div className="formControl">
            <label htmlFor="cityName">city Name</label>
            <input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              type="text"
              id="cityName"
              name="cityName"
            />
          </div>
          <div className="formControl">
            <label htmlFor="country">country</label>
            <input
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              type="text"
              id="country"
              name="country"
            />
            <span className="flag">
              <ReactCountryFlag svg countryCode={countryCode} />
            </span>
          </div>
          <div className="buttons">
            <button className="btn btn--back" onClick={handlerBackPage}>
              &larr; Back
            </button>
            <button className="btn btn--primary">Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBookmark;
