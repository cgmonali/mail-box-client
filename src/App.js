import { HashRouter as Router,Route, Redirect,Routes } from "react-router-dom";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' exact element={<SignUpPage />} />


      </Routes>
</Layout>
    </Router>
  );
}

export default App;
