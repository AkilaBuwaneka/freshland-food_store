import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import UserService from "../service/UserService";

const Navv = () => {
  const isLoggedIn = localStorage.getItem("idToken");
  return <div>{isLoggedIn ? <Nav1 /> : <Nav2 />}</div>;
};

export default Navv;

function Nav1() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("user");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3003/api/v1/user/${email}`
        // );
        const response = await UserService.getUserByEmail(email);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        width: "100vw",
        backgroundColor: "#1DA1F2",
      }}
    >
      <Container fluid>
        <Navbar.Brand>
          <NavLink
            className="navbar-brand"
            to="/category"
            style={{ color: "#FFFFFF" }}
          >
            Food Store
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink
                className="nav-link"
                to="/products"
                style={{ color: "#FFFFFF" }}
              >
                Products
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                className="nav-link"
                to="carts"
                style={{ color: "#FFFFFF" }}
              >
                Carts
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                className="nav-link"
                to="carts/completed"
                style={{ color: "#FFFFFF" }}
              >
                Orders
              </NavLink>
            </Nav.Link>
          </Nav>
          {user ? (
            <Nav className="ml-auto">
              <NavDropdown
                title={
                  <>
                    <span style={{ color: "#FFFFFF" }}>{user.email}</span>
                    <img
                      className="thumbnail-image"
                      src={user.profileImage}
                      alt="user pic"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "10px",
                      }}
                    />
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login" style={{ color: "#FFFFFF" }}>
                Login
              </Nav.Link>
              <Nav.Link href="/signup" style={{ color: "#FFFFFF" }}>
                Signup
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const Nav2 = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        width: "100vw",
        backgroundColor: "#1DA1F2",
      }}
    >
      <Container fluid>
        <Navbar.Brand>
          <NavLink
            className="navbar-brand"
            to="/category"
            style={{ color: "#FFFFFF" }}
          >
            Food Store
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink
                className="nav-link"
                to="/products"
                style={{ color: "#FFFFFF" }}
              >
                Products
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/login" style={{ color: "#FFFFFF" }}>
              Login
            </Nav.Link>
            <Nav.Link href="/signup" style={{ color: "#FFFFFF" }}>
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
