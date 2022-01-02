import React from "react";
import "./header.css"
import banner from "../../assets/blogBanner.jpg"

const Header = () => {
  return <div className="header">
      <div className="headerTitles">
          <span className="headerTitle"> blog</span>  
      </div>
      <img src={banner}  className="headerImg"/>
  </div>;
};

export default Header;
