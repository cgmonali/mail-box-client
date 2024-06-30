
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';


  
const MainNavigation = () => {

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
      </ul>
    </div>
    
    </>
  );
};

export default MainNavigation;
