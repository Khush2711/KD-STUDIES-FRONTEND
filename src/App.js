import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Navbar from "./components/Common/Navbar";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setToken, setUserData } from "./Slice/authSlice";
import About from "./Pages/About";
import Footer from "./components/Common/Footer";
import ErrorPage from "./Pages/ErrorPage";
import { decryptData } from "./utils/encryptionUtils";
import { initializeUser, setAdditionalDetails, setUser } from "./Slice/profileSlice";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import ContactForm from "./components/About/ContactForm";
import Settings from "./components/core/Dashboard/Settings/index";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import Dashboard from "./Pages/Dashboard";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    // dispatch(initializeUser()); // Initialize user data from localStorage
    const encryptedData = localStorage.getItem("userData");
    const sys_ref = localStorage.getItem("sys_ref");
    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData);
        const decryptAdditionalData = decryptData(sys_ref);

        // console.log(decryptedData);

        // Validate the expiry time
        const currentTime = new Date().getTime();
        if (decryptedData.expiryTime && decryptedData.expiryTime > currentTime) {
          dispatch(setUser(decryptedData)); // Set decrypted user data in Redux
          dispatch(setAdditionalDetails({ ...decryptAdditionalData })); // Correct function name here
        } else {
          console.warn("User data has expired.");
          localStorage.removeItem("userData"); // Remove expired data
          localStorage.removeItem("token"); // Remove expired data
          localStorage.removeItem("sys_ref");
          dispatch(setToken(null));
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to decrypt user data:", error);
        localStorage.removeItem("userData"); // Remove expired data
        localStorage.removeItem("token"); // Remove corrupted data
        localStorage.removeItem("sys_ref");
        navigate("/");
      }
    }
  }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>

        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />

        <Route path="/update-password/:token" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        <Route path="/verify" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<ContactForm />}></Route>
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user && user.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse />}></Route>
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          }

          {
            user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path="/dashboard/add-course" element={<AddCourse />}></Route>
              <Route path="/dashboard/instructor" element={<Instructor />}></Route>
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
            </>
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>



        {/* <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword />}></Route>
        <Route path="/verify" element={<VerifyEmail />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
        </Route> */}

        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
