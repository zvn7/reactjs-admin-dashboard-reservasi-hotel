import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [userData, setUserData] = useState({ username: "", role: "" });

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    try {
      const myId = sessionStorage.getItem("user");
      const response = await axios.get(`http://localhost:3000/getData/` + myId);
      const data = response.data;
      setUserData({ username: data.username, role: data.role });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="layout-horizontal">
      <div className="header-top fixed-top">
        <div className="container">
          <div className="logo">
            <a href="index.html">
              <h3 className="header-title text-white">Hotel Reservation</h3>
            </a>
          </div>
          <div className="header-top-right">
            <div className="dropdown">
              <a
                href="#"
                id="topbarUserDropdown"
                className="user-dropdown d-flex align-items-center dropend dropdown-toggle "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar avatar-md2">
                  <img src="https://via.placeholder.com/60x60" alt="Avatar" />
                </div>
                <div className="text">
                  <h6 className="user-dropdown-name">{userData.username}</h6>
                  <p className="user-dropdown-status text-sm text-muted">
                    {userData.role}
                  </p>
                </div>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg"
                aria-labelledby="topbarUserDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            {/* Burger button responsive */}
            <a href="#" className="burger-btn d-block d-xl-none">
              <i className="bi bi-justify fs-3" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
