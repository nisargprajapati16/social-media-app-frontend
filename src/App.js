import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import 'semantic-ui-css/semantic.min.css';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import SinglePost from "./pages/SinglePost";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
