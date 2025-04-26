import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../Common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

function RenderTotalAmount() {

  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("cart..................",courses);
    
    buyCourse(token, courses, navigate, dispatch);
  }

  return <div className="my-5">
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-6 ">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100 crimson">₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  </div>;
}

export default RenderTotalAmount;
