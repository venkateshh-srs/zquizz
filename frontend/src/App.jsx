import { Route, Routes } from "react-router-dom";
import UserRoutes from "./user/UserRoutes";
import Home from "./common/Home";
import AdminRoutes from "./admin/AdminRoutes";
import UserRoutes from "./user/UserRoutes";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}

export default App;
