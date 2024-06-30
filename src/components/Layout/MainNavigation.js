
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

  
const MainNavigation = () => {
  const dispatch = useDispatch();
  function logoutHandler(){
    dispatch(logout());
  }
const count = useSelector((state) => state.auth.isLoggedIn); // Access state from the store

  return (
    <>
    <div className={classes.NavigationTab}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
             <Link to='/login' >Login</Link>
           
          </li>
    {count &&  
    ( <li>
     <Link to="/" onClick={logoutHandler} className={classes.logoutbtn}>
 Logout
</Link>
          </li>)}
      </ul>
    </div>
    
    </>
  );
};

export default MainNavigation;
