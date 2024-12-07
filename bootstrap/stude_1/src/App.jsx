import { useEffect, useContext, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./componets/Header/Navbar";
import Footer2 from "./componets/Footer/Footer";

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
      <Footer2></Footer2>
    </div>
    </BrowserRouter>
  );
}

export default App;
