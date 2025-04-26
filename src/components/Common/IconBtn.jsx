import "./css/border.css";
import { GrAddCircle } from "react-icons/gr";


const Iconbtn = ({ onClick, text, customClasses }) => (


  <button
    onClick={onClick}
    className={`px-4 py-2 text-black font-bold rounded  below-md:scale-90 mt-2
    ${customClasses ? "bg-richblack-900 border border-yellow-5 flex items-center gap-x-2 text-yellow-50" : "bg-yellow-50 "} 
    ${customClasses} 
    `}
  >
    {text} {customClasses && (<GrAddCircle />)}
  </button>
);

export default Iconbtn;
