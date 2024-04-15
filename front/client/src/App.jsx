import React, { useEffect, useState } from "react";
import Routers from "./routes/Routers";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layout/Navbar";
import Announcement from "./layout/Announcement";
import Footer from "./layout/Footer";
import { useLocation } from "react-router-dom";
import { getUser, getusers } from "./redux/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const isAuth = localStorage.getItem("persist:user");
  // const isUserSignedIn = !!localStorage.getItem('token') // to protect the route of the user account after he log in
  const dispatch=useDispatch();
  const locationRouter = useLocation();
  const [reload, setReload] = useState(false)
  // const { userInfo, userId } = useSelector((state) => state.user);

    //useEffect & dispatch to get data
    useEffect(() => {
      if (isAuth) {
        dispatch(getusers());
        // dispatch(userCurrent());

      }
    }, [dispatch,reload,]);

    const user = useSelector((state) => state?.user?.user);
  console.log(user,"usercurrent")
  return (
    <div className="App">
      {locationRouter.pathname === "/" && <Announcement />}
      <Navbar />
      <Routers setReload={setReload} reload={reload}/>

      {locationRouter.pathname === "/" && <Footer />}

      <ToastContainer
        position={"bottom-right"}
        closeOnClick={true}
        transition={Slide}
        autoClose={"5000"}
        theme="colored"
        bodyStyle={{ color: "white" }}
      />
    </div>
  );
};

export default App;
