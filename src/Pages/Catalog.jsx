import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Common/Footer";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { apiConnector } from "../services/apiconnector";
import CourseSlider from "../components/Catalog/CourseSlider";
import Course_Card from "../components/Catalog/Course_Card";

function Catalog() {

  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.allCategories?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        console.log(`Category Id ${category_id}`, res);

        setCategoryId(category_id);
      } catch (error) {
        console.log("Error occur in use effect at getCategories function: ", error);
      }
    }
    getCategories();
  }, [catalogName])

  useEffect(() => {
    const getCategoryDetails = async () => {
      if (!categoryId) return;
      try {
        const res = await getCatalogPageData(categoryId);
        // console.log(`Top courses : `,catalogPageData?.data?.mostSellingCourses);
        setCatalogPageData(res);
      } catch (error) {
        console.log("Error in getCategoryDetails:", error);
      }
    };

    getCategoryDetails();
  }, [categoryId]);




  return <div className="text-richblack-5">

    <div className=" box-content bg-richblack-800 px-4 ">
      <div className="mx-auto flex min-h-[260px]  flex-col justify-center gap-4 ">
        <p className="text-sm text-richblack-300 ">{`Home / Catalog / `}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        <p className="text-3xl text-richblack-5">
          {catalogPageData?.data?.selectedCategory?.name}
        </p>

        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>
    </div>


    <div className="m-5">
      {/* Section 1 */}
      <div className="">
        <p className="text-4xl mt-5 font-semibold uppercase">Courses to get you started</p>
        {/* <div className="flex gap-x-3">
          <p>MostPopular</p>
          <p>New</p>
        </div> */}
        <div className="mb-8 flex border-b h-0 w-full border-b-richblack-600 text-sm"></div>

        <div className="">
          <CourseSlider courses={catalogPageData?.data?.selectedCategory?.course} />

        </div>
      </div>


      {/* Section 2 */}

      <div className=" mt-5 ">
        <p className="text-4xl font-semibold uppercase">Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
        <div className="mb-8 flex border-b h-0 w-full border-b-richblack-600 text-sm"></div>
        <div className="">
          <CourseSlider courses={catalogPageData?.data?.differentCategory?.course} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="">
        <p>Frequently Bought</p>

        <div className="py-8">

          <div className="grid grid-cols-1 md:grid-cols-2 ">

            {
              catalogPageData?.data?.mostSellingCourses.slice(0, 4).map((course, idx) => (
                <Course_Card course={course} key={idx} Height={"h-[150px]"} weight={"w-[350px]"} />
              ))
            }


          </div>

        </div>

      </div>

    </div>
    <Footer />
  </div>;
}

export default Catalog;
