import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Signup";
import Forget from "../pages/ForgetPassword";
import Profile from "../pages/profile/Profile";
import Project from "../pages/Project";
import Reset from "../pages/ResetPassword";
import Account from "../pages/Account";
import UserRoutes from "./UserRoutes";
import ImportFiles  from "../pages/ProjectManipulation";
import ProjectList from "../pages/jiralogin";
import Edit from "../pages/Edit";
import View from "../pages/View";
import Help from "../pages/Help";
import Report from "../pages/Report";
import UsersDashbord from "../pages/UsersDashbord";
import { useSelector } from "react-redux";
import Unauthorized from "../components/Unauthorized";
import AdminRoutes from "./AdminRoutes";

const Routers = ({setReload, reload}) => {
  const { userInfo, loading } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/auth/password-reset/:id/:token" element={<Reset />} />
        {/* <Route path="/users-dashbord" element={<UsersDashbord setReload={setReload} reload={reload} />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
    

    {/* ------------------ admin routes ------------ */}
    <Route element={<AdminRoutes />}>
        <Route path="/users-dashbord" element={<UsersDashbord setReload={setReload} reload={reload} />} />
        </Route>

        <Route element={<UserRoutes />}>          
          <Route path="/account" element={<Account />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/project" element={<Project />} />
        <Route path="/projectmanip" element={< ImportFiles/>} />
        <Route path="/jira" element={< ProjectList/>} />
        <Route path="/view" element={< View/>} />
        <Route path="/edit" element={< Edit/>} />
        <Route path="/help" element={< Help/>} />
        <Route path="/report" element={< Report/>} />
        <Route path="/report" element={< Report/>} />
        
        </Route>
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
};

export default Routers;