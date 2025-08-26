import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourceTable = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const fetchHelpRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://satillite-town-backend-5i11.vercel.app/api/ngo/getAllHelpRequests');
      setHelpRequests(response.data.data.Ngo);
    } catch (err) {
      setError('Failed to fetch help requests');
      console.error('Error fetching help requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const isImageFile = (filename) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().includes(ext));
  };

  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  const handleDownloadDocument = (documentUrl, fileName) => {
    window.open(documentUrl, '_blank');
  };

  const handleSendEmail = (userEmail, userName) => {
    const subject = 'Regarding Your Help Request';
    const body = `Dear ${userName},\n\nWe are following up on your help request. Please provide more information.\n\nBest regards,\nSupport Team`;
    window.open(`mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this help request?')) {
      try {
        setDeletingId(id);
        await axios.delete(`https://satillite-town-backend-5i11.vercel.app/api/ngo/deleteHelpRequest/${id}`);
        
        // Remove the deleted item from state
        setHelpRequests(helpRequests.filter(request => request._id !== id));
        
        alert('Help request deleted successfully');
      } catch (err) {
        alert('Failed to delete help request');
        console.error('Error deleting help request:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading help requests...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="w-full mt-5">
      <div className="flex flex-col">
        <div className="-my-2 py-2">
          <div className="align-middle inline-block w-full overflow-x-auto sm:rounded-md border-b border-gray-200">
            <table className="min-w-full">
              {/* HEAD start */}
              <thead>
                <tr className="bg-[#4BBDCB33] border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                  <th className="px-6 py-3 text-left font-medium">#</th>
                  <th className="px-6 py-3 text-left font-medium">User Name</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">Help Type</th>
                  <th className="px-6 py-3 text-left font-medium">Description</th>
                  <th className="px-6 py-3 text-left font-medium">Location</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Documents</th>
                  <th className="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              {/* HEAD end */}
              {/* BODY start */}
              <tbody className="bg-white">
                {helpRequests?.map((request, index) => (
                  <tr key={request._id} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <p className="secondary-para2">{index + 1}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <p className="secondary-para2">
                        {request.userId?.firstName} {request.userId?.lastName}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <p className="secondary-para2">{request.userId?.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <p className="secondary-para2">{request.helpType}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap max-w-xs">
                      <p className="secondary-para2 truncate" title={request.needDescription}>
                        {request.needDescription}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <p className="secondary-para2">{request.location || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="flex flex-wrap gap-2">
                        {request.documents?.map((doc, docIndex) => {
                          const isImage = isImageFile(doc);
                          const fileExtension = getFileExtension(doc);
                          const fileName = doc.split('/').pop();
                          
                          return (
                            <div key={docIndex} className="flex flex-col items-center">
                              {isImage ? (
                                <div className="relative group">
                                  <img
                                    src={doc}
                                    alt={`Document ${docIndex + 1}`}
                                    className="w-16 h-16 object-cover rounded border cursor-pointer"
                                    onClick={() => handleDownloadDocument(doc, fileName)}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs">View</span>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  className="w-16 h-16 bg-gray-100 border rounded flex items-center justify-center cursor-pointer"
                                  onClick={() => handleDownloadDocument(doc, fileName)}
                                >
                                  <span className="text-xs font-medium">{fileExtension}</span>
                                </div>
                              )}
                              <span className="text-xs text-gray-500 mt-1 truncate max-w-16">
                                {fileName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSendEmail(request.userId?.email, `${request.userId?.firstName} ${request.userId?.lastName}`)}
                          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Email
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(request._id)}
                          disabled={deletingId === request._id}
                          className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm flex items-center"
                        >
                          {deletingId === request._id ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Deleting...
                            </>
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* BODY end */}
            </table>
            {helpRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No help requests found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceTable;