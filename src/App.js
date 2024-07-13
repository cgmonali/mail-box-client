import { HashRouter as Router,Route, Redirect,Routes } from "react-router-dom";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";


import EmailEditor from "./components/EditorDesign/EditorDesign";
import MailSideBar from "./components/MailSideBar/MailSideBar";
import MailInbox from "./components/MailInbox/MailInbox";


function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' exact element={<SignUpPage />} />
        <Route path='/login'  element={<Login />}/>
        
   
        <Route path="/MailBox/*" element={<MailSideBar/>} >
        <Route path="inbox" element={<MailInbox />} />
        <Route path="compose" element={< EmailEditor/>} />
      </Route>
      </Routes>
</Layout>
    </Router>
  );
}

export default App;
