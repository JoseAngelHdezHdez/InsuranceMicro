import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

const NavBar = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);

    const onStorage = () => setHasToken(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    setHasToken(false);
    window.location.href = "/inicio-sesion";
  };

  const navbarStyle = {
    background: "linear-gradient(to right, #0d6efd, #00bcd4)",
    padding: "1rem",
    width: "100%",
    height: "90px",
  };

  return (
    <Navbar
      className="bg-body-tertiary"
      style={navbarStyle}
      data-bs-theme="dark"
      collapseOnSelect
      expand={false}
    >
      <Container fluid>
        {hasToken && (
          <>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />

            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-false"
              aria-labelledby="offcanvasNavbarLabel-expand-false"
              placement="end"
              style={{
                background: "linear-gradient(to right, #00bcd4, #0d6efd)",
                color: "white",
                border: "none",
              }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body className="d-flex flex-column">
                <Nav className="justify-content-end flex-grow-1 pe-3" style={{ fontWeight: "500" }}>
                  <Nav.Link href="/users">Usuarios</Nav.Link>
                  <Nav.Link href="/insurance">Seguros</Nav.Link>
                </Nav>

                {/* ✅ Logout abajo */}
                <div className="mt-3">
                  <Button variant="outline-light" className="w-100" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
