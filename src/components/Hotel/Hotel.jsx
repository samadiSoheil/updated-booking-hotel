import { Link } from "react-router-dom";
import { useHotels } from "../../contexts/HotelsProvider";

const Hotel = () => {
  const { data, isLoading, selectedHotel } = useHotels();

  if (isLoading) return <p>Loading data...</p>;

  return (
    <>
      <div className="searchList">
        <h2>Search Results ({data?.length})</h2>
        {data?.map((location) => {
          return (
            <Link
              className={`${+selectedHotel == location.id ? "selectedHotel" : ""}`}
              key={location.id}
              to={`/hotels/${location.id}?lat=${location.latitude}&lang=${location.longitude}`}
            >
              <div className="searchItem">
                <img src={location.xl_picture_url} alt={location.name} />
                <div className="searchItemDesc">
                  <p className="location">{location.smart_location}</p>
                  <p className="name">{location.name}</p>
                  <p className="price">
                    €&nbsp;
                    {location.price}
                    <span>&nbsp;night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Hotel;
