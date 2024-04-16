import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Signup";
import Forget from "../pages/ForgetPassword";
import Profile from "../pages/profile/Profile";
import Project from "../pages/Project";
import Reset from "../pages/ResetPassword";
import Account from "../pages/Account";
// import UserRoutes from "./RegularRoutes";
import ImportFiles  from "../pages/ProjectManipulation";
import ProjectList from "../pages/jiralogin";
import Edit from "../pages/Edit";
import View from "../pages/View";
import Help from "../pages/Help";
import Report from "../pages/Report";
import UsersDashbord from "../pages/UsersDashbord";
import { useSelector } from "react-redux";
import Unauthorized from "../components/Unauthorized";
// import AdminRoutes from "./AdminRoutes";
// import RegularRoutes from "./RegularRoutes";
// import SpecialRoutes from "./specialRoutes";

const Routers = ({ setReload, reload }) => {
  const { isAuth, user } = useSelector((state) => state.user);

  // Function to check if user is authorized for a specific role
  const isAuthorized = (allowedRoles) => {
    return isAuth && allowedRoles.includes(user?.role);
  };

  // Route for unauthorized access
  const UnauthorizedRoute = () => <Navigate to="/unauthorized" />;

  return (
    <Routes>
     <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn reload={reload} setReload={setReload} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/auth/password-reset/:id/:token" element={<Reset />} />

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/help" element={< Help/>} />
        <Route path="/report" element={< Report/>} />
        <Route path="/account" element={<Account />} />
          {/* <Route path="/project" element={<Project />} /> */}
        <Route path="/projectmanip" element={< ImportFiles/>} />
        <Route path="/profile/:id" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/report" element={<Report />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Regular Routes */}
      {/* {isAuthorized(["regular"]) && (
        <>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/report" element={<Report />} />
        </>
      )} */}
      
      {/* Special Routes */}
      {isAuthorized(["special"]) && (
        <>
          <Route path="/project" element={<Project />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/view" element={<View />} />
          <Route path="/jira" element={<ProjectList />} />
        </>
      )}

      {/* Admin Routes */}
      {isAuthorized(["ADMIN"]) && (
        <>
    <Route path="/users-dashbord" element={<UsersDashbord setReload={setReload} reload={reload} />} />
          <Route path="/project" element={<Project />} />
          <Route path="/edit" element={< Edit/>} />
          <Route path="/view" element={< View/>} />
          <Route path="/jira" element={< ProjectList/>} />
        
  
        </>
      )}

      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default Routers;
