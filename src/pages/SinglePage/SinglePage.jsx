import React from "react";
import "./singlePage.css"
import SinglePost from "../../components/singlePost/SinglePost";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

const SinglePage = () => {
  return(<>
  <Topbar />
  <div className="singlePage">
  <SinglePost />
  <Sidebar />
  </div>
  </>
  )
};

export default SinglePage;
