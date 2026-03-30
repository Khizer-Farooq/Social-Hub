import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import PostsPage from "./pages/PostsPage";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(getStoredUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/posts" /> : <AuthPage setUser={setUser} />
          }
        />
        <Route
          path="/posts"
          element={
            user ? <PostsPage user={user} setUser={setUser} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
