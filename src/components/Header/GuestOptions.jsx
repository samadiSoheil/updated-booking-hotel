import { HiMinus, HiPlus } from "react-icons/hi";
import { useOption } from "./context/OptionContext";
import { useRef } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";

const GuestOptions = ({ setOpenOptions }) => {
  const refElem = useRef();
  useOutSideClick(refElem, () => setOpenOptions(false), "optionDropDown");
  return (
    <>
      <div className="guestOptions" ref={refElem}>
        <OptionItem type="adult" minlimit={1} />
        <OptionItem type="children" minlimit={0} />
        <OptionItem type="room" minlimit={1} />
      </div>
    </>
  );
};

const OptionItem = ({ type, minlimit }) => {
  const { options, updateOption } = useOption();
  return (
    <>
      <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
          <button
            className="optionCounterBtn"
            onClick={() => updateOption("INC__OPTION", type)}
          >
            <HiPlus />
          </button>
          <span className="optionCounterNumber">{options[type]}</span>
          <button
            disabled={options[type] <= minlimit}
            onClick={() => updateOption("DEC__OPTION", type)}
            className={`optionCounterBtn ${options[type] <= minlimit ? "opacity50" : ""}`}
          >
            <HiMinus />
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestOptions;
