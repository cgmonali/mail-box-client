
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

  
const MainNavigation = () => {
  const dispatch = useDispatch();
  function logoutHandler(){
    dispatch(logout());
  }
const count = useSelector((state) => state.auth.isLoggedIn); // Access state from the store

  return (
    <Navbar bg="light" expand="lg" className={classes.NavigationTab}>
      <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className={`ml-auto  ${classes.navElements}`} >
        <Nav.Link as={Link} to="/" style={{padding:'10px 15px'}}>Home</Nav.Link>
        <Nav.Link as={Link} to="/products" style={{padding:'10px 15px'}}>Products</Nav.Link>
        <Nav.Link as={Link} to="/about-us" style={{padding:'10px 15px'}}>About Us</Nav.Link>
        <Nav.Link as={Link} to="/login" style={{padding:'10px 15px'}}>Login</Nav.Link>
        {count && (
          <Nav.Link as={Link} to="/" onClick={logoutHandler} className={classes.logoutbtn} style={{padding:'10px 15px'}}>
            Logout
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container></Navbar>
  );
};

export default MainNavigation;
