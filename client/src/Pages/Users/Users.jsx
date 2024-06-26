import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./Users.css";
import UsersList from "./UsersList";

const Users = () => {
  
   
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2" style={{marginTop:"30px"}}>
            <h1 style={{fontWeight:"400" , marginTop:"40px"}}>Users</h1>
            <UsersList />
      </div>
    </div>
  );
};

export default Users;