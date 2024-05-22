import React from "react";

// import {Link} from 'react-router-dom';
// import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <h2 className="welcome">
        Check your email for the link, follow it and change the password!
      </h2>
      <a href="/login" className="">
        Login
      </a>
    </div>
  );
}
