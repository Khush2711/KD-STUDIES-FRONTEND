import React, { useEffect, useRef, useState } from "react";
import { Player, ControlBar, PlayToggle } from "video-react";  // Import Player
import "video-react/dist/video-react.css";  // Import required CSS
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import Iconbtn from "../../Common/IconBtn";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../Slice/viewCourseSlice";

function VideoDetails({ setReviewModal }) {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );
  const location = useLocation();

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const setVideoSpecificDetails = () => {
    if (!courseSectionData.length) return;

    console.log('courseSectionData...................', courseSectionData);

    const filterData = courseSectionData.find((course) => course._id === sectionId);
    console.log('filterData...................', filterData);

    const filteredVideoData = filterData?.subSection?.find((data) => data._id === subSectionId);

    if (!filteredVideoData || !filteredVideoData.videoUrl) {
      console.warn("Invalid video data:", filteredVideoData);
      navigate("/dashboard/enrolled-courses");
      return;
    }

    setVideoData(filteredVideoData);
    setVideoEnded(false);
  };

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return false; // Section not found

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    );

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return false; // Section not found

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    );

    const lastSectionIndex = courseSectionData.length - 1;
    const lastSubSectionIndex = courseSectionData[lastSectionIndex].subSection.length - 1;

    return currentSectionIndex === lastSectionIndex && currentSubSectionIndex === lastSubSectionIndex;
  };


  const goToNextVideo = () => {
    if (!courseSectionData.length) return;
  
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
  
    if (currentSectionIndex === -1) return; // Section not found
  
    const currentSection = courseSectionData[currentSectionIndex];
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    );
  
    if (currentSubSectionIndex === -1) return; // Subsection not found
  
    // Check if there is another subsection in the same section
    if (currentSubSectionIndex < currentSection.subSection.length - 1) {
      const nextSubSectionId = currentSection.subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } 
    // Move to the first video of the next section if available
    else if (currentSectionIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[currentSectionIndex + 1];
      if (nextSection.subSection.length > 0) {
        navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`);
      }
    }
  };
  
  const goToPrevVideo = () => {
    if (!courseSectionData.length) return;
  
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
  
    if (currentSectionIndex === -1) return; // Section not found
  
    const currentSection = courseSectionData[currentSectionIndex];
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    );
  
    if (currentSubSectionIndex === -1) return; // Subsection not found
  
    // Check if there is a previous subsection in the same section
    if (currentSubSectionIndex > 0) {
      const prevSubSectionId = currentSection.subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } 
    // Move to the last video of the previous section if available
    else if (currentSectionIndex > 0) {
      const prevSection = courseSectionData[currentSectionIndex - 1];
      if (prevSection.subSection.length > 0) {
        const lastSubSectionId = prevSection.subSection[prevSection.subSection.length - 1]._id;
        navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSubSectionId}`);
      }
    }
  };
  

  const handleLectureCompletion = async () => {
    setLoading(true);

    const result = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);

    if(result)
    {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  }


  useEffect(() => {
    if (courseSectionData.length) {
      setVideoSpecificDetails();
    }
  }, [courseSectionData, location.pathname]);
  

  return (
    <div className="p-4 text-white">
      {!videoData ? (
        <p className="text-center text-gray-500">No video available</p>
      ) : (
        <div className="flex flex-col items-center">
          {/* Video Player */}
          <div className="w-full max-w-3">
            <Player
              ref={playerRef}
              playsInline
              aspectRatio="16:9"
              onEnded={() => setVideoEnded(true)}
              src={videoData.videoUrl}
            >
              <ControlBar autoHide={true}>
                <PlayToggle />
              </ControlBar>
            </Player>
          </div>

          {/* Video Controls */}
          {videoEnded && (
            <div className="mt-4 flex flex-col items-center">
              {!completedLectures?.includes(subSectionId) && (
                <Iconbtn
                  disable={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark as completed" : "Loading..."}
                />
              )}

              <Iconbtn
                disable={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="mt-2 text-xl"
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between w-full max-w-3xl">
            <button
              disabled={loading || isFirstVideo()}
              onClick={goToPrevVideo}
              className="blackButton"
            >
              Prev
            </button>
            <button
              disabled={loading || isLastVideo()}
              onClick={goToNextVideo}
              className="blackButton"
            >
              Next
            </button>

          </div>

          {/* Video Details */}
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">{videoData.title}</h1>
            <p className="text-gray-600">{videoData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
