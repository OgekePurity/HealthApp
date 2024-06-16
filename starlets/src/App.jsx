import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Home from "./home/Home";
import Articles from "./articles/Articles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:articleId" element={<Articles />} />
    </Routes>
  );
}

export default App;
