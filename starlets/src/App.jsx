import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Home from "./home/Home";
import Articles from "./articles/Articles";
import Create from "./Create/Create";
import PostDetail from './Create/PostDetail';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<Articles />} />
        <Route path="/create" element={<Create />}></Route>
        <Route path="/post/:id" element={<PostDetail />}></Route>
      </Routes>
    
  );
}

export default App;
