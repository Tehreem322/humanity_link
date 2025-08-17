import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HelpRequestCard = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentNgo, setCurrentNgo] = useState(null);
  const [currentNgoId, setCurrentNgoId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetch("https://satillite-town-backend-5i11.vercel.app/api/ngo/getAllNgos");
        if (!response.ok) {
          throw new Error("Failed to fetch NGOs");
        }
        const data = await response.json();
        setNgos(data.data.Ngo);
        toast.success("NGOs loaded successfully");
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load NGOs");
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  const fetchNgoById = async (id) => {
    try {
      const response = await fetch(`https://satillite-town-backend-5i11.vercel.app/api/ngo/findNgoById/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch NGO details");
      }
      const data = await response.json();
      setCurrentNgo(data.data.title);
      setCurrentNgoId(id);
      setFormData({
        title: data.data.title,
        description: data.data.description,
        image: data.data.image
      });
      setIsEditPopupOpen(true);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load NGO details");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this NGO?")) {
      try {
        const response = await fetch(`https://satillite-town-backend-5i11.vercel.app/api/ngo/deleteNgo/${id}`, {
          method: "DELETE"
        });
        
        if (!response.ok) {
          throw new Error("Failed to delete NGO");
        }
        
        setNgos(ngos.filter(ngo => ngo._id !== id));
        toast.success("NGO deleted successfully");
      } catch (err) {
        setError(err.message);
        toast.error("Failed to delete NGO");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setUploadingImage(true); // Set loading state
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('NgoId', currentNgoId);
    
    const fileInput = document.getElementById('image');
    if (fileInput.files[0]) {
      formDataToSend.append('image', fileInput.files[0]);
    }

    const response = await fetch(`https://satillite-town-backend-5i11.vercel.app/api/ngo/updateNgo`, {
      method: "PUT",
      body: formDataToSend
    });
    
    if (!response.ok) {
      throw new Error("Failed to update NGO");
    }
    
    const data = await response.json();
    
    // Update both the formData state and ngos state with the new image
    const updatedImage = data.image || formData.image;
    
    setFormData(prev => ({
      ...prev,
      image: updatedImage
    }));
    
    setNgos(ngos.map(ngo => 
      ngo._id === currentNgoId ? { 
        ...ngo, 
        title: formData.title,
        description: formData.description,
        image: updatedImage
      } : ngo
    ));
    
    setIsEditPopupOpen(false);
    toast.success("NGO updated successfully");
  } catch (err) {
    setError(err.message);
    toast.error("Failed to update NGO");
  } finally {
    setUploadingImage(false);
  }
};


  if (loading) {
    return <div className="text-center py-8">Loading NGOs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">NGOs Offering Help</h1>

      {ngos.length === 0 ? (
        <div className="text-center py-8">No NGOs available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ngos.map((ngo) => (
            <div key={ngo._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
              <img 
                className="w-full h-40 object-cover" 
                src={ngo.image} 
                alt={ngo.title} 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                }}
              />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold">{ngo.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{ngo.description}</p>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button 
                  onClick={() => fetchNgoById(ngo._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(ngo._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup */}
      {isEditPopupOpen && currentNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit NGO</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                ></textarea>
              </div>
 <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
    Upload Image (PNG, JPG, GIF, JPEG only)
  </label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/png, image/jpg, image/gif, image/jpeg"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const fileExt = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['png', 'jpg', 'gif', 'jpeg'];
        
        if (!allowedExtensions.includes(fileExt)) {
          toast.error('Only PNG, JPG, GIF, and JPEG files are allowed');
          e.target.value = ''; // Clear the file input
          return;
        }
        
        // Create a preview URL for the new image
        const previewUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          image: previewUrl
        }));
      }
    }}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
  {formData?.image && (
    <div className="mt-2">
      <img 
        src={formData.image} 
        alt="Preview" 
        className="h-20 w-20 object-cover rounded"
      />
    </div>
  )}
</div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditPopupOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? 'Uploading...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HelpRequestCard;