import useFetch from "../../hooks/useFetch";

const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (!data) return null;
  if (isLoading)
    return <p style={{ textAlign: "center", marginTop: "5rem" }}>loading data...</p>;

  return (
    <div className="nearbyLocation">
      <h2>near by location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.xl_picture_url} alt="" />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;
                  {item.price}
                  <span>&nbsp;night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LocationList;
