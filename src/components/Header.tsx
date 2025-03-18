import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Navbar expand="lg" className="py-3">
      <Container className="d-flex justify-content-between align-items-center">
        
        {/* Logo Section */}
        <div className="d-flex align-items-center">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Image src={logo} alt="Logo" height="40" className="me-2" />
          </Navbar.Brand>
        </div>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-3"> {/* gap controls spacing between links */}
            <Nav.Link href="#home"><Button className='btn-transparent'>თანამშრომლის შექმნა</Button></Nav.Link>
            <Nav.Link href="#about">
              <Button className='btn-violent'>
                <span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 15V5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>შექმენი ახალი დავალება</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
