import React, { useState, useEffect } from "react";

function RequirementField({ name, label, register, errors, setValue, getValues }) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    // Sync requirementList with the form's value if it exists (for edit functionality)
    const initialValue = getValues(name);
    if (initialValue) {
      setRequirementList(initialValue);
    }
  }, [getValues, name]);

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (requirement) {
      const newList = [...requirementList, requirement];
      setRequirementList(newList);
      setRequirement("");
      setValue(name, newList); // Update form state HERE!
      console.warn("Requirement field data .....................:",getValues(name));
    }
  };

  const handleRemoveRequirement = (req) => {
    const newRequirementList = requirementList.filter((item) => item !== req);
    setRequirementList(newRequirementList);
    setValue(name, newRequirementList); // Update form state HERE!
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
        />

        <button
          className="font-semibold text-yellow-50"
          onClick={handleAddRequirement}
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="">
          {requirementList.map((item, idx) => (
            <li key={idx} className="">
              <p>{item}</p>
              <button
                className="text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(item)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RequirementField;