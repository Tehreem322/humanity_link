import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactTable = () => {
  const [tableData, setTableData] = useState({ Ngo: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch('https://satillite-town-backend-5i11.vercel.app/api/ngo/getAllQueries');
        if (!response.ok) {
          throw new Error('Failed to fetch queries');
        }
        const data = await response.json();
        setTableData(data.data);
        toast.success('Queries loaded successfully');
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load queries');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this query?')) {
      try {
        const response = await fetch(`https://satillite-town-backend-5i11.vercel.app/api/ngo/deleteQuery/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete query');
        }
        
        setTableData(prev => ({
          ...prev,
          Ngo: prev.Ngo.filter(query => query._id !== id),
          count: prev.count - 1
        }));
        
        toast.success('Query deleted successfully');
      } catch (err) {
        setError(err.message);
        toast.error('Failed to delete query');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading queries...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <>
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
                      <th className="px-6 py-3 text-left font-medium secondary-para">
                        Full name
                      </th>
                      <th className="px-6 py-3 text-left font-medium secondary-para">
                        Email address
                      </th>
                      <th className="px-6 py-3 text-left font-medium secondary-para">
                        Inquiry type
                      </th>
                      <th className="px-6 py-3 text-left font-medium secondary-para">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left font-medium secondary-para">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {/* HEAD end */}
                  {/* BODY start */}
                  <tbody className="bg-white">
                    {tableData.Ngo?.map((item, index) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">{index + 1}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">{item.fullName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">{item.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">General Inquiry</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <p className="secondary-para2">{item.query}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-500 hover:text-red-700 secondary-para3 flex items-center gap-2"
                            >
                              <span>-</span> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* BODY end */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactTable;