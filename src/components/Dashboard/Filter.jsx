import React, { useState, useEffect, useRef } from "react";
import DownloadIcon from "../../assets/images/Download.svg";
const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-end my-5">
        <div className="flex items-center gap-4">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-between items-center w-64 px-4 py-2 secondary-heading3 text-white bg-[#4BBDCB33] rounded-md hover:bg-[#55d4e433] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006679]"
            >
              Filter by
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 z-10 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 px-4">
                  {/* seect country */}
                  <p className="pt-3 pb-2 secondary-heading">Location</p>
                  <select
                    className="py-2 w-full border rounded-md outline-none"
                    name=""
                    id=""
                  >
                    <option className="secondary-heading2" value="">
                      Select county
                    </option>
                    <option className="secondary-heading2" value="">
                      Canada
                    </option>
                    <option className="secondary-heading2" value="">
                      Uk
                    </option>
                    <option className="secondary-heading2" value="">
                      India
                    </option>
                  </select>
                  {/* role */}
                  <p className="pt-3 pb-2 secondary-heading">Role</p>
                  <select
                    className="py-2 w-full border rounded-md outline-none"
                    name=""
                    id=""
                  >
                    <option className="secondary-heading2" value="">
                      Choose role
                    </option>
                    <option className="secondary-heading2" value="">
                      option 1
                    </option>
                    <option className="secondary-heading2" value="">
                      option 2
                    </option>
                    <option className="secondary-heading2" value="">
                      option 3
                    </option>
                  </select>
                  {/* type of organization */}
                  <p className="pt-3 pb-2 secondary-heading">
                    Type of organisation
                  </p>
                  <select
                    className="py-2 mb-5 w-full border rounded-md outline-none"
                    name=""
                    id=""
                  >
                    <option className="secondary-heading2" value="">
                      Choose organization type
                    </option>
                    <option className="secondary-heading2" value="">
                      option 1
                    </option>
                    <option className="secondary-heading2" value="">
                      option 2
                    </option>
                    <option className="secondary-heading2" value="">
                      option 3
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="">
            <img
              className="bg-[#006679] w-9 rounded-md px-2 py-2 cursor-pointer"
              src={DownloadIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
