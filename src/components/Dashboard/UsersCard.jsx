import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersCard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        setLoading(true);
        // Fetch both help_seekers and help_creators
        const [seekersResponse, creatorsResponse] = await Promise.all([
          axios.get('https://satillite-town-backend-5i11.vercel.app/api/auth/user/getAllCustomers?role=help_seeker'),
          axios.get('https://satillite-town-backend-5i11.vercel.app/api/auth/user/getAllCustomers?role=help_creator')
        ]);
        const total = seekersResponse.data.data.length + creatorsResponse.data.data.length;
        setTotalUsers(total);
      } catch (error) {
        console.error("Error fetching user count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div style={{ boxShadow: "3px 3px 5px 0px #F5F3F3" }} className="bg-white p-5 rounded-lg">
      <p className="secondary-heading2">All users</p>
      {loading ? (
        <div className="text-right">Loading...</div>
      ) : (
        <h4 className="primary-heading text-right">{totalUsers}</h4>
      )}
    </div>
  );
};

export default UsersCard;