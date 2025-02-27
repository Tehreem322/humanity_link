import React from "react";
import Layout from "../../components/Layout/Layout";
import userBio from "../../assets/images/user-img.svg";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  return (
    <Layout>
      <div className="md:ml-[17rem] flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <Link to="/profile-edit">
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Edit Profile
              </button>
            </div>
          </Link>
          <div className="flex flex-col items-center">
            <img
              src={userBio}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              John Doe
            </h2>
            <p className="text-gray-500 text-lg">Software Engineer</p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">About Me</h3>
              <p className="text-gray-600 leading-relaxed">
                Passionate software engineer with over 5 years of experience in developing scalable web applications and working with cross-functional teams. Skilled in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and adapt to new challenges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-600">johndoe@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-600">+1 234 567 890</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-600">New York, USA</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Social Media</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">LinkedIn:</span>
                    <a href="https://linkedin.com/in/johndoe" className="text-blue-500 hover:underline">linkedin.com/in/johndoe</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">GitHub:</span>
                    <a href="https://github.com/johndoe" className="text-blue-500 hover:underline">github.com/johndoe</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Twitter:</span>
                    <a href="https://twitter.com/johndoe" className="text-blue-500 hover:underline">twitter.com/johndoe</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">JavaScript</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">React</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Node.js</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">AWS</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Docker</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileInfo;