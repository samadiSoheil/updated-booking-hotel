import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import OptionProvider from "./components/Header/context/OptionContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <OptionProvider>
        <Header />
      </OptionProvider>
      <Outlet />
    </>
  );
}

export default App;
