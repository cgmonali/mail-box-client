import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { updateCount } from '../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
const MailSideBar = () => {
const unreadCount = useSelector((state) => state.auth.inboxUnreadCount);
    return (
      <>
 <div style={{display:'flex',marginLeft:'30px',marginTop:'50px'}}>
              
            <Nav className="flex-column flex-grow-1 pe-3 " style={{ width: '30%' }}>

                  <Button variant="info" className='mb-2'><Nav.Link as={Link} to="compose" style={{padding:'0px 15px',color:'white'}}>compose</Nav.Link></Button>{' '}
                  <Button variant="info"  className='mb-2'><Nav.Link as={Link} to="inbox" style={{padding:'0px 15px',color:'white'}}>Inbox {unreadCount}</Nav.Link></Button>{' '}
                  <Button variant="info" className='mb-2'><Nav.Link as={Link} to="sent" style={{padding:'0px 15px',color:'white'}}>Sent</Nav.Link></Button>{' '}
                </Nav>
   
                <div style={{ marginLeft: '10px' ,width:'90%'}}>
        <Outlet />
      </div>
      </div>
      </>
    );
    };

export default MailSideBar;
