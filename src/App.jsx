import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Outlet /> {/* This will render the routed pages */}
      </div>
      <Footer />
    </>
  );
}

export default App;
