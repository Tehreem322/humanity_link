import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DashboardTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState("help_seeker");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://satillite-town-backend-5i11.vercel.app/api/auth/user/getAllCustomers?role=${currentRole}`
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentRole]);

  const toggleRoleFilter = () => {
    setCurrentRole(currentRole === "help_seeker" ? "help_creator" : "help_seeker");
  };

  const handleEdit = (userId) => {
    navigate(`/profile-edit/${userId}`);
  };
 const handleBlock = async (userId) => {
    try {
      const response = await axios.delete(
        `https://satillite-town-backend-5i11.vercel.app/api/auth/user/deleteSingleUser/${userId}`
      );
      
      if (response.data.success) {
        toast.success("User blocked successfully");
        // Refresh the table data
        const updatedResponse = await axios.get(
          `https://satillite-town-backend-5i11.vercel.app/api/auth/user/getAllCustomers?role=${currentRole}`
        );
        setTableData(updatedResponse.data);
      } else {
        toast.error(response.data.message || "Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      {/* Role filter toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleRoleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Show {currentRole === "help_seeker" ? "Help Creators" : "Help Seekers"}
        </button>
      </div>

      {/* table */}
      <div className="w-full mt-5">
        <div className="">
          <div className="flex flex-col">
            <div className="-my-2 py-2">
              <div className="align-middle inline-block w-full overflow-x-auto sm:rounded-md border-b border-gray-200">
                <table className="min-w-full">
                  {/* HEAD start */}
                  <thead>
                    <tr className="bg-[#4BBDCB33] border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                      <th className="px-6 py-3 text-left font-medium">#</th>
                      <th className="px-6 mt-1 md:mt-0 py-3 text-left font-medium secondary-para">
                        <span>
                          <p>First name</p>
                        </span>
                      </th>
                      <th>
                        <div className="px-6 py-3 text-left font-medium secondary-para">
                          <span>
                            <p>Last name</p>
                          </span>
                        </div>
                      </th>
                      <th className="">
                        <div className="px-6 py-3 text-left font-medium secondary-para">
                          <span>
                            <p>Email address</p>
                          </span>
                        </div>{" "}
                      </th>
                      <th className="">
                        <div className="px-6 py-3 text-left font-medium secondary-para">
                          <span>
                            <p>Role</p>
                          </span>
                        </div>{" "}
                      </th>
                      <th className="">
                        <div className="px-6 py-3 text-left font-medium secondary-para">
                          <span>
                            <p>Status</p>
                          </span>
                        </div>{" "}
                      </th>
                      <th className="">
                        <div className="px-6 py-3 text-left font-medium secondary-para">
                          <span>
                            <p>Action</p>
                          </span>
                        </div>{" "}
                      </th>
                    </tr>
                  </thead>
                  {/* HEAD end */}
                  {/* BODY start */}
                  <tbody className="bg-white">
                    {tableData?.data?.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <p className="secondary-para2">{index + 1}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <p className="secondary-para2">{item?.firstName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <p className="secondary-para2">{item?.lastName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <p className="secondary-para2">{item?.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <p className="secondary-para2 capitalize">{item?.role?.replace('_', ' ')}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item?.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {item?.isDeleted ? 'Inactive' : 'Active'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEdit(item._id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                              >
                                Edit
                              </button>
                               <button 
                                onClick={() => handleBlock(item._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                              >
                                Block
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* BODY end */}
                </table>
              </div>
            </div>
          </div>
        </div>
       < ToastContainer/>
      </div>
    </>
  );
};

export default DashboardTable;