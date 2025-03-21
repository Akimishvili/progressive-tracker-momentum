import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from '../assets/logo.png';
import AddEmployeeModal from './employes/AddEmployModal.tsx';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveEmployee = () => {
    console.log('New employee data:');
  };

  return (
      <>
        <Navbar expand="lg" className="py-3">
          <Container className="d-flex justify-content-between align-items-center">

            {/* Logo Section */}
            <div className="d-flex align-items-center">
              <Navbar.Brand href="/" className="d-flex align-items-center">
                <Image src={logo} alt="Logo" height="40" className="me-2" />
              </Navbar.Brand>
            </div>

            {/* Toggle for mobile */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* Navigation Links */}
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="gap-3 align-items-center">
                <div>
                  <Button className='btn-transparent basic-btn' onClick={handleOpenModal}>
                    თანამშრომლის შექმნა
                  </Button>
                </div>


                <Nav.Link href="tasks/create">
                  <Button className='btn-violent pe-none'>
                  <span className="task-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 15V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                    შექმენი ახალი დავალება
                  </Button>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>

        {/* Modal Component */}
        <AddEmployeeModal
            show={showModal}
            handleClose={handleCloseModal}
            handleSave={handleSaveEmployee}
        />
      </>
  );
};

export default Header;
