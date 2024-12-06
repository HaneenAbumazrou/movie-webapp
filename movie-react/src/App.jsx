import { useEffect, useContext, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./componets/Header/Navbar";

const Home = lazy(() => import("./Pages/Home"));

import { BrowserRouter, Routes, Route ,Link} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;