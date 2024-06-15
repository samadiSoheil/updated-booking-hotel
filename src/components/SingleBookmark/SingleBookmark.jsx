import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigateUser = useNavigate();
  const { data, isLoading } = useFetch(`http://localhost:5000/bookmarks/${id}`);
  if (isLoading) return <div>Loading data...</div>;
  if (!data) return null;

  const handleBack = () => {
    navigateUser(-1);
  };

  return (
    <>
      <button onClick={handleBack} className="btn btn--back">
        Back
      </button>
      <div className="room">
        <div className="roomDetail">
          <h1>
            <ReactCountryFlag
              svg
              countryCode={data.countryCode}
              style={{ marginRight: "20px" }}
            />
            {data.cityName} - {data.country}
          </h1>
          <p style={{ marginTop: "20px" }}>{data.host_location}</p>
        </div>
      </div>
    </>
  );
};

export default SingleBookmark;
