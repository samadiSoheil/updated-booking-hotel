import { MdLocationPin, MdBookmark, MdHome } from "react-icons/md";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import GuestOptions from "./GuestOptions";
import { useOption } from "./context/OptionContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import useOutSideClick from "../../hooks/useOutSideClick";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [openOptions, setOpenOptions] = useState(false);
  const { options } = useOption();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDateRange, setOpenDateRange] = useState(false);
  const dateRef = useRef();
  useOutSideClick(dateRef, () => setOpenDateRange(false), "openDropDownDateRange");

  // Search Handler
  const navigate = useNavigate();
  const handlerSearch = () => {
    const encodedSearchParams = createSearchParams({
      options: JSON.stringify(options),
      date: JSON.stringify(date),
      destination: destination,
    });
    navigate({
      pathname: "/hotels",
      search: encodedSearchParams.toString(),
    });
  };
  return (
    <>
      <div className="header">
        <div className="headerSearch">
          {/* Home link */}
          <div className="headerSearchItem">
            <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
              <MdHome className="headerIcon dateIcon" />
              <span>Home</span>
            </Link>
            <span className="seperator"></span>
          </div>
          {/* bookmark link */}
          <div className="headerSearchItem">
            <Link to={"/bookmarks"} style={{ display: "flex", alignItems: "center" }}>
              <MdBookmark className="headerIcon dateIcon" />
              <span>Bookmarks</span>
            </Link>
            <span className="seperator"></span>
          </div>

          {/* search input */}
          <div className="headerSearchItem">
            <MdLocationPin className="headerIcon locationIcon" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Where to go?"
              className="headerSearchInput"
            />
            <span className="seperator"></span>
          </div>

          {/* Calendar */}
          <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div
              className="dateDropDown"
              id="openDropDownDateRange"
              onClick={() => setOpenDateRange((opn) => !opn)}
              style={{ cursor: "pointer" }}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </div>
            {openDateRange && (
              <div ref={dateRef}>
                <DateRange
                  ranges={date}
                  className="date"
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={true}
                />
              </div>
            )}
            <span className="seperator"></span>
          </div>

          {/* Options in search */}
          <div className="headerSearchItem" style={{ cursor: "pointer" }}>
            <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
              {options.adult} adult &bull; {options.children} children &bull;
              {options.room} room
            </div>
            {openOptions && <GuestOptions setOpenOptions={setOpenOptions} />}
            <span className="seperator"></span>
          </div>

          {/* Search */}
          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handlerSearch}>
              <HiSearch className="headerIcon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
