import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../Context/UserContext";
// import Profile from "../profile/Profile"; // Import the Profile component
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, logoutUser } = useUserContext(); // Get the user object and logoutUser function from the UserContext

  const handleLogout = () => {
    // Call the logoutUser function from the context to log out the user
    logoutUser();
  };

  const [labelText, setLabelText] = useState("☰");
  const hidebodyOverflow = (e) => {
    document.body.classList.toggle("hideOverflow");
    if (!checkboxRef.current.checked) setLabelText("☰");
    else setLabelText("✕");
  };
  const checkboxRef = useRef();
  const removeOverflow = () => {
    checkboxRef.current.checked = false;
    document.body.classList.remove("hideOverflow");
    setLabelText("☰");
  };

  return (
    <nav className={`flex items-center justify-between flex-wrap bg-blue-500 p-6 ${navbar ? "navbar" : "navbar_scroll"}`}>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/" className="font-semibold text-xl tracking-tight">Home</a>
      </div>

      <div className="block lg:hidden">
        <Checkbox
          color="default"
          id="checkbox_toggle"
          onClick={hidebodyOverflow}
          ref={checkboxRef}
          sx={{ display: "none" }}
        />
        <label
          htmlFor="checkbox_toggle"
          style={{
            fontSize: labelText === "✕" ? "35px" : "24px",
            cursor: "pointer",
          }}
          className="hamburger"
          dangerouslySetInnerHTML={{ __html: labelText }}
        ></label>
      </div>

      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${navbar ? "hidden" : "navbar_scroll"}`}>
        <div className="text-sm lg:flex-grow">
          <Link to="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            Dashboard
          </Link>
          <Link to="/addevents" className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            Add Events
          </Link>
        </div>
        <div className="text-sm">
          {user ? ( // Check if the user is logged in
            <>
              <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
                Profile
              </Link>
              <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
            </>
          ) : (
            <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
