import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../Slice/course";
import { GiRadarCrossSection } from "react-icons/gi";
import ConfirmationModal from "../../../../Common/confirmationModal";

function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [openSections, setOpenSections] = useState({});
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleToggle = (sectionId, isOpen) => {
        setOpenSections((prev) => ({ ...prev, [sectionId]: isOpen }));
    };

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection(
            { sectionId, courseid: course._id },
            token
        );
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    const handleDeleteSubSection = async (subSectionId, sectionId) => {        
        const result = await deleteSubSection({ sectionId, subSectionId }, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    return (
        <div className="rounded-lg bg-richblack-700 p-6 px-8 text-richblack-5">
            {course?.courseContent.map((section) => (
                <details 
                    key={section._id} 
                    className="text-richblack-5"
                    onToggle={(e) => handleToggle(section._id, e.target.open)}
                >
                    <summary className="flex items-center justify-between gap-x-3 border-b-2 cursor-pointer">
                        <div className="flex items-center gap-x-3">
                            <GiRadarCrossSection />
                            <p>{section.sectionName}</p>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                <MdEdit />
                            </button>

                            <button
                                onClick={() => setConfirmationModal({
                                    text1: "Delete this section?",
                                    text2: "All the lectures in this section will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })}
                            >
                                <RiDeleteBin6Line />
                            </button>

                            <span>|</span>

                            {/* Arrow rotates when section is open */}
                            <BiSolidDownArrow 
                                className={`text-xl text-richblack-300 transition-transform duration-300 ${
                                    openSections[section._id] ? 'rotate-180' : ''
                                }`}
                            />
                        </div>
                    </summary>

                    {/* Sub-sections */}
                    <div className="mt-2">
                        {section?.subSection?.map((data) => (
                            <div 
                                key={data._id} 
                                className="flex items-center justify-between gap-x-3 border-b-2 p-2"
                            >
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu />
                                    <p>{data.title}</p>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                        <MdEdit />
                                    </button>

                                    <button
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this Sub section?",
                                            text2: "Selected lecture will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        ))}

                                                
                        <button 
                            onClick={() => setAddSubSection(section._id)}
                            className="mt-4 ml-4 flex items-center gap-x-2 text-yellow-50"
                        >
                            <FaPlus />
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}

            {/* Modals for Adding, Viewing, Editing SubSections */}
            {addSubSection && (
                <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
            )}
            {viewSubSection && (
                <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
            )}
            {editSubSection && (
                <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
            )}

            {/* Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default NestedView;
