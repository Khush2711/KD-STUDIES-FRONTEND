import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="text-richblack-5">
            <h1 className="text-3xl text-richblack-50">Your Cart</h1>
            <p className="border-b  border-b-richblack-400 pb-2 font- text-richblack-400 ">{totalItems} courses in your cart</p>

            {
                total > 0 ? (
                    <div className="flex justify-between below-md:flex-col">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                )
                    :
                    (
                        <div className="">
                            <p>
                                Your Cart Is Empty...
                            </p>
                        </div>
                    )
            }
        </div>
    )
}