import { createContext, useContext, useReducer, useState } from "react";
import { optionReducerFunc } from "./optionReducerFunc";

const OptionContext = createContext();
const intialOption = {
  adult: 1,
  children: 0,
  room: 1,
};

const OptionProvider = ({ children }) => {
  const [options, dispatch] = useReducer(optionReducerFunc, intialOption);

  const updateOption = (operetionOption, typeOfOption) => {
    dispatch({ type: operetionOption, payload: typeOfOption });
  };

  return (
    <OptionContext.Provider value={{ options, updateOption }}>
      {children}
    </OptionContext.Provider>
  );
};

const useOption = () => {
  return useContext(OptionContext);
};

export { useOption };
export default OptionProvider;
