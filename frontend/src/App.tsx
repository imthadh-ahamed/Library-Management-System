import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
