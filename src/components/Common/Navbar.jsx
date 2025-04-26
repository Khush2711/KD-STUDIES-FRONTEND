import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/Logo/KD Logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState, useRef } from "react"; // Import useRef
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { decryptData } from "../../utils/encryptionUtils";
import { clearUserData, setUserData } from "../../Slice/authSlice";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mobileMenuRef = useRef(null); // Ref for the mobile menu

  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  };

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.allCategories);
    } catch (error) {
      console.log(`Could not fetch category list`);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const location = useLocation();
  const matchRoute = (route) => location.pathname === route;

  const handleCatalogHover = () => {
    if (!isMobile) {
      setIsCatalogOpen(true);
    }
  };

  const handleCatalogLeave = async () => {
    if (!isMobile) {
      setTimeout(() => {
        setIsCatalogOpen(false);
      }, 300);
    }
  };


  const handleCatalogClickMobile = () => {
    if (isMobile) {
      setIsCatalogOpen(!isCatalogOpen);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && showMenu) {
        setShowMenu(false);
        setIsCatalogOpen(false); // Also close catalog if open
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef, showMenu]);

  return (
    <div className="relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between mx-auto">
        <Link to="/">
          <img className="" width={160} height={10} src={logo} alt="logo" />
        </Link>

        {/* Nav for larger screens */}
        <nav className={`hidden md:block`}>
          <ul className="flex gap-x-6">
            {NavbarLinks.map((ele, i) => (
              <li key={i}>
                {ele.title === "Catalog" ? (
                  <div
                    className="text-richblack-25 flex gap-x-1 gap-y-10 items-center group relative cursor-pointer"
                    onMouseEnter={handleCatalogHover}
                    onMouseLeave={handleCatalogLeave}
                  >
                    <p>{ele.title}</p>
                    <MdOutlineKeyboardArrowDown />

                    {isCatalogOpen && (
                      <div
                        className="absolute left-[50%] -top-5 flex gap-y-4 -mt-4 flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-100 transition-all duration-200 w-[300px] -translate-x-[50%] translate-y-[20%] z-10"
                        onMouseEnter={handleCatalogHover}
                        onMouseLeave={handleCatalogLeave}
                      >
                        <div className="absolute left-[50%] top-0 h-6 w-6 bg-richblack-5 rotate-45 rounded-md -translate-y-[40%] translate-x-[80%]"></div>

                        {subLinks.length ? (
                          subLinks.map((link, index) => (
                            <Link
                              to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                              key={index}
                              onMouseEnter={handleCatalogHover}
                            >
                              {link.name}
                            </Link>
                          ))
                        ) : (
                          <p>No categories available</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={ele?.path}>
                    <p
                      className={`${matchRoute(ele?.path) ? "text-yellow-5" : "text-richblack-25"}`}
                    >
                      {ele?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Flex / signup / dashboard for larger screens */}
        <div className="hidden md:flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" ? (
            <Link to="/dashboard/cart" className="relative">
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-richblack-600 text-richblack-5 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  {totalItems}
                </motion.span>
              )}
              <IoCartOutline className="text-richblack-5 text-3xl" />
            </Link>
          ) : null}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown isMobileMenuOpen={showMenu} setIsMobileMenuOpen={setShowMenu} />
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className={`text-richblue-5 md:hidden`} onClick={handleClickMenu}>
          {showMenu ? <AiOutlineClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <motion.div
          ref={mobileMenuRef} // Attach the ref
          initial={{ opacity: 0, x: "20%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "20%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 h-full w-3/4 bg-richblack-800 z-30 shadow-lg md:hidden"
        >
          <div className="p-6 flex justify-end">
            <AiOutlineClose className="text-richblue-5 text-2xl cursor-pointer" onClick={handleClickMenu} />
          </div>
          <nav className="p-4">
            <ul className="flex flex-col gap-y-4">
              {NavbarLinks.map((ele, i) => (
                <li key={i} className="border-b border-richblack-700 pb-4"> {/* Separator */}
                  {ele.title === "Catalog" ? (
                    <div onClick={handleCatalogClickMobile} className="text-richblack-25 flex justify-between items-center cursor-pointer">
                      <p>{ele.title}</p>
                      <MdOutlineKeyboardArrowDown className={`${isCatalogOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
                    </div>
                  ) : (
                    <Link to={ele?.path} onClick={() => setShowMenu(false)} className="text-richblack-25">
                      <p
                        className={`${matchRoute(ele?.path) ? "text-yellow-5" : ""}`}
                      >
                        {ele?.title}
                      </p>
                    </Link>
                  )}
                  {ele.title === "Catalog" && isCatalogOpen && (
                    <div className="mt-2 ml-4 flex flex-col gap-y-2">
                      {subLinks.length ? (
                        subLinks.map((link, index) => (
                          <Link
                            to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                            key={index}
                            onClick={() => setShowMenu(false)}
                            className="text-richblack-400"
                          >
                            {link.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-richblack-400">No categories available</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-y-4 p-4">
            {user && user.accountType !== "Instructor" ? (
              <Link to="/dashboard/cart" className="relative text-richblack-25" onClick={() => setShowMenu(false)}>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-richblack-600 text-richblack-5 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    {totalItems}
                  </motion.span>
                )}
                <IoCartOutline className="text-richblack-5 text-3xl" />
              </Link>
            ) : null}

            {token === null ? (
              <>
                <Link to="/login" onClick={() => setShowMenu(false)}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
                    Log In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setShowMenu(false)}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropDown isMobileMenuOpen={showMenu} setIsMobileMenuOpen={setShowMenu} />
            )}
          </div>
        </motion.div>
      )}
    </div >
  );
}

export default Navbar;