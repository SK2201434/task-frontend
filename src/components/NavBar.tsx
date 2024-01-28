'use client';
import React from "react";
import {Container, Navbar , Nav , NavDropdown } from "react-bootstrap";
import {useNavigate}  from "react-router-dom"; 
import {LinkContainer} from 'react-router-bootstrap'

let NavBar : React.FC = ()=>{

  const navigate = useNavigate();

  let logout = () : void=>{
    localStorage.removeItem('authTokken');
    navigate('/login');
  }

  // updateprofile

    return(
        <Navbar sticky='top'  bg='dark' data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Shoping App</Navbar.Brand>
          <Nav className='ms-auto'>
            {
              localStorage.getItem('authTokken') &&
              <>
                <LinkContainer to="/productslist"><Nav.Link>Product List</Nav.Link></LinkContainer>
                {/* <LinkContainer to="/createproduct"><Nav.Link>Create Product</Nav.Link></LinkContainer> */}
                <NavDropdown title="User Info" id="collapsible-nav-dropdown">
                   <LinkContainer to="/updateprofile"><NavDropdown.Item>Update User Detailes</NavDropdown.Item></LinkContainer>
                   <NavDropdown.Divider />
                   <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
              </>
              
            }
            {
              !localStorage.getItem('authTokken') &&
                <>
                  <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                  <LinkContainer to="/signup"><Nav.Link>Sign up</Nav.Link></LinkContainer>  
                </>
                
          }  

          
          </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar;
