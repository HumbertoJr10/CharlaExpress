import { Route, Routes, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

export const socket = io("http://localhost:4000/");

function App() {

  const location = useLocation()

  return (
    <>
    {
      location.pathname!="/chat"&&<Navbar />
    }    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
