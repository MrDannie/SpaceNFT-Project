import "./App.css";

import { useEffect } from "react";
import { isWalletConnected } from "./Adulam";
import Alert from "./components/Alert";
import Main from "./components/Main";
import Loading from "./components/Loading";
import Mint from "./components/Mint/Mint";
import Nav from "./components/NavBar/Nav";

import { Route, Routes } from "react-router-dom";

const App = () => {
  useEffect(async () => {
    // await isWalletConnected().then(() => console.log("Blockchain Loaded"));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/" element={<Whitpaper />} /> */}
          <Route path="/mint" element={<Mint />} />
        </Routes>
      </div>
      <Loading />
      <Alert />
      {/* <Mint /> */}
    </div>
  );
};

export default App;
