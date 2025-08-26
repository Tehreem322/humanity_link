import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import userBio from "../../assets/images/user-img.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        setError("User ID not found in local storage");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://satillite-town-backend-5i11.vercel.app/api/auth/user/getSingleUser/${userId}`
      );
      
      setUserData(response.data.data);
    } catch (err) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="md:ml-[17rem] flex justify-center items-center bg-gray-100 min-h-screen">
          <div className="text-center">Loading user profile...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="md:ml-[17rem] flex justify-center items-center bg-gray-100 min-h-screen">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!userData) {
    return (
      <Layout>
        <div className="md:ml-[17rem] flex justify-center items-center bg-gray-100 min-h-screen">
          <div className="text-center">No user data found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="md:ml-[17rem] flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          {/* <Link to="/profile-edit">
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Edit Profile
              </button>
            </div>
          </Link> */}
          <div className="flex flex-col items-center">
            {/* Conditionally render image only if available */}
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
              />
            ) : (
              <img
                src={userBio}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            )}
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-gray-500 text-lg capitalize">
              {userData.role?.replace('_', ' ') || 'User'}
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">About Me</h3>
              <p className="text-gray-600 leading-relaxed">
                {userData.bio || "No bio information available."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-600">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-600">{userData.phoneNumber || "Not provided"}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-600">{userData.address || "Not provided"}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      userData.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {userData.isDeleted ? "Deleted" : "Active"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Email Verified:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      userData.isEmailConfirmed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {userData.isEmailConfirmed ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">User ID:</span>
                    <span className="text-gray-600 text-sm font-mono">{userData._id}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Member since:</span>
                    <span className="text-gray-600">
                      {new Date(userData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Last updated:</span>
                    <span className="text-gray-600">
                      {new Date(userData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Role:</span>
                    <span className="text-gray-600 capitalize">
                      {userData.role?.replace('_', ' ') || 'User'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional sections that might be populated if data exists */}
            {(userData.skills || userData.interests) && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills?.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                  {userData.interests?.map((interest, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                  {(!userData.skills && !userData.interests) && (
                    <span className="text-gray-500">No skills or interests added yet.</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileInfo;