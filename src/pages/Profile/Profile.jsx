import React from 'react'
import Layout from "../../components/Layout/Layout";
const Profile = () => {
  return (
    <Layout>
    <div className="md:ml-[17rem]">
      <div className="container-main">
        {" "}
        <div class="max-w-lg mx-auto p-6 mt-5 bg-white rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Edit Profile
          </h2>

          <form action="#" method="POST">
            <div class="mb-4">
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="mb-4">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="mb-4">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div class="mb-4">
              <label
                for="location"
                class="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="mb-4">
              <label
                for="preferredMethod"
                class="block text-sm font-medium text-gray-700"
              >
                Preferred Method of Assistance
              </label>
              <input
                type="text"
                id="preferredMethod"
                name="preferredMethod"
                class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Profile