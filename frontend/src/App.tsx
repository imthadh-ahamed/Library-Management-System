import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./Pages";
import { useState } from "react";
import { PrivateRoute } from "./Components";

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<Home />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
