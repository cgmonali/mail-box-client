import { HashRouter as Router,Route, Redirect,Routes } from "react-router-dom";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";

import store from './store/index.js';
function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' exact element={<SignUpPage />} />
        <Route path='/login'  element={<Login />}/>
        <Route path="/home" element={<h3>Welcome to Mail Box Page</h3>} />
   

      </Routes>
</Layout>
    </Router>
  );
}

export default App;
