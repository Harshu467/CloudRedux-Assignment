import "./navbar.css"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useUserContext } from "../Context/UserContext"
// import Profile from "../profile/Profile"

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const { user, logoutUser } = useUserContext(); // Get the user object and logoutUser function from the UserContext

  const handleLogout = () => {
    // Call the logoutUser function from the context to log out the user
    logoutUser();
  };


  const [labelText, setLabelText] = useState("&#9776")
  const hidebodyOverflow = (e) => {
    document.body.classList.toggle("hideOverflow")
    if (!checkboxRef.current.checked) setLabelText("&#9776")
    else setLabelText("&times")
  }
  const checkboxRef = useRef()
  const removeOverflow = () => {
    checkboxRef.current.checked = false
    document.body.classList.remove("hideOverflow")
    setLabelText("&#9776")
  }

  return (
    <nav className={navbar ? "navbar" : "navbar_scroll"}>
      <div className="community_logo">
        <a href="#">
          
        </a>
        {/* Menu for Desktop */}
        <div className="menu">
          <div className="left-menu">
            <a href="/">
              <li onClick={removeOverflow}>Home</li>
            </a>
            <Link to="/dashboard">
              <li onClick={removeOverflow}>Dashboard</li>
            </Link>
            <a href="/team">
              <li onClick={removeOverflow}>Team</li>
            </a>
            <a href="/addevents">
              <li onClick={removeOverflow}>Add Events</li>
            </a>

            <div className="dropdown">
              <a href="#">
                <li>
                  More <i class="fa fa-caret-down"></i>
                </li>
              </a>
              <div className="dropdown-content">
                <a href="#">
                  <li>Blogs</li>
                </a>
                <a href="#faq">
                  <li>FAQ</li>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav-links">
        <input
          type="checkbox"
          id="checkbox_toggle"
          onClick={hidebodyOverflow}
          ref={checkboxRef}
        />
        <label
          htmlFor="checkbox_toggle"
          style={{
            fontSize: labelText === "&times" ? "35px" : "24px",
          }}
          className="hamburger"
          dangerouslySetInnerHTML={{ __html: labelText }}
        ></label>

        {/* Menu for Mobile Screen */}
        <div className="menu">
          {document.body.classList.contains("hideOverflow") && (
            <div className="left-menu">
              <a href="#about">
                <li onClick={removeOverflow}>About Us</li>
              </a>
              <Link to="/resources">
                <li onClick={removeOverflow}>Resources</li>
              </Link>
              <a href="#team">
                <li onClick={removeOverflow}>Team</li>
              </a>
              <a href="/addevents">
                <li onClick={removeOverflow}>Add Events</li>
              </a>

              <div className="dropdown">
                <a href="#">
                  <li>
                    More <i class="fa fa-caret-down"></i>
                  </li>
                </a>
                <div className="dropdown-content">
                  <a href="#">
                    <li>Blogs</li>
                  </a>
                  <a href="#faq">
                    <li>FAQ</li>
                  </a>
                  <a href="#">
                    <li>Achievements</li>
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="right-menu">
            <a href="/login" >
              <li >Login</li>
            </a>
          </div>
          
        </div>
      </ul>
    </nav>
  )
}

export default Navbar