import { faUser, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Layout from "../layout";
import styles from "./dashboard.module.css";
const Dashboard = () => {
  return (
    <Layout>
      <div className={styles.sidebar}>
        <Link className="active" to="/dashboard/viewstudent">
          <FontAwesomeIcon icon={faUsersViewfinder} className="mx-2" />view
          Student
        </Link>
        <Link className="active" to="/dashboard/addstudent">
          <FontAwesomeIcon icon={faUser} className="mx-2" />
          AddStudent
        </Link>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </Layout>
  );
};

export default Dashboard;
