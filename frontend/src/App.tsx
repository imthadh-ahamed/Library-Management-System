import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login, Signup, Home } from "./Pages";
import { PrivateRoute } from "./Components";
// import Cookies from "js-cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  
  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // const PrivateRoute = () => {
  //   const auth = Cookies.get("token");
  //   return auth ? <Outlet /> : <Navigate to="/" />;
  // };

  // const PublicRoute = () => {
  //   const auth = Cookies.get("token");
  //   return auth ? <Navigate to="/home" /> : <Outlet />;
  // };

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


      {/* <Routes>
        <Route path="" element={<PublicRoute />}>
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path='' element={<PrivateRoute />}>
          <Route path='/home' element={<Home />}/>
        </Route>
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
