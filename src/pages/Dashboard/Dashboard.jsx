import React from "react";
import DashboardTable from "../../components/Dashboard/DashboardTable";
import Layout from "../../components/Layout/Layout";
import Filter from "../../components/Dashboard/Filter";
import UsersCard from "../../components/Dashboard/UsersCard";
const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="md:ml-[17rem]">
          <div className="container-main">
            {" "}
            <Filter />
            <UsersCard/>
            <DashboardTable />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
