import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.component";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <SignIn /> } />
        <Route path="home" element={ <HomePage /> } />
        <Route path="signup" element={ <SignUp /> } />
      </Routes>
    </div>
  );
}

export default App;
