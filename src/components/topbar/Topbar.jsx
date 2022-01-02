import React,{useState,useEffect} from "react";
import "./topbar.css"

import { useSelector, useDispatch } from "react-redux";
import {logOut} from "../../redux/userRedux" 
import { Link } from "react-router-dom";

import {ImageUrl} from "../axiosReqMethods"
import {BaseUrl} from "../axiosReqMethods"
 
import { publicRequest } from "../axiosReqMethods";
import { addPost } from "../../redux/queryRedux";


const Topbar = () => {

 const user = useSelector((state)=>state.user.currentUser)
 const dispatch = useDispatch()

 const handleLOGOUT=(e)=>{
   e.preventDefault()
   dispatch(logOut())
 }


 {/* ............displaying uploaded pic ................... */}
        const PF = ImageUrl
 {/* ............displaying uploaded pic ................... */}


  {/* ......................QuerySearch ................... */}
  
   const [search, setSearch] = useState(null);

   const handleChange = (e) => {
    // e.prevent.default()
    const value = e.target.value;
    // let upperValue = value.toUppercase()
    setSearch(value);
    // console.log("value",upperValue)
  };
  
useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await publicRequest.get(
          `${BaseUrl}/query?name=${search}`
        );
        //console.log("res",res.data)
        dispatch(addPost(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [search]);


  const [sideBarValue,setSideBarValue] =  useState(false)

  const handleClick=()=>{
      setSideBarValue(!sideBarValue)
  }




  return (
    <div className="top">
      <div className="topWrapper">
      <div className="topLeft">
            <i onClick={handleClick} className="menu fas fa-bars"></i>
          <div className="searchContainer">
              <input type="text" id="inputFile"className="searchInput" placeholder="Search Posts"  onChange={handleChange} />
            <label htmlFor="inputFile">
              <i  className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </label>
           </div>  
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="topbarLink" to="/" >
          <li className="topListItem">HOME</li>
          </Link>
          <Link className="topbarLink" to="/" >
          <li style={{"text-decoration":"line-through"}} className="topListItem">ABOUT</li>
          </Link>
          <Link style={{"text-decoration":"line-through"}} className="topbarLink" to="" >
          <li className="topListItem">CONTACT</li>
          </Link>
          <Link className="topbarLink" to="/write" >
          <li className="topListItem">WRITE</li>
          </Link>
          {
            user && <li className="topListItem"><button className="logoutBtn" onClick={handleLOGOUT}>LOGOUT </button></li>
          }
        </ul>
      </div>
      <div className="topRight">
        {
          user &&  <div className="topListItem" style={{color:"teal",textTransform:"capitalize", fontSize:"30px", fontWeight:"800"}}  > <Link className="topbarLog2" to="/user" >{user.username} </Link> </div>
        }
{/* ............displaying uploaded pic ................... */}
        {
            user ? <Link className="topbarLog" to="/user" ><img
        className="topImg"
          src={user.profilePic ? (PF + user.profilePic) :"https://image.shutterstock.com/image-vector/people-icon-vector-person-sing-600w-707883430.jpg"}
          alt=""/>
{/* ............displaying uploaded pic ................... */}
           </Link> :
           (<>
           <ul className="topList">
           <Link className="topbarLog" to="/login" >
              <li className="topListItem1">LOGIN</li></Link>
          <Link className="topbarLog" to="/register" >
              <li className="topListItem2">REGISTER</li></Link>
              </ul>
            </>
          )
        }
      </div>
      </div>
      <div className={sideBarValue ? "sidePanelOn" : "sidePanelOff"}>
        <ul className="sideList" onClick={handleClick}>
          <Link className="topbarLink" to="/" >
          <li className="sideListItem">HOME</li>
          </Link>
          <Link className="topbarLink" to="/" >
          <li style={{"text-decoration":"line-through"}} className="sideListItem">ABOUT</li>
          </Link>
          <Link style={{"text-decoration":"line-through"}} className="topbarLink" to="" >
          <li className="sideListItem">CONTACT</li>
          </Link>
          <Link className="topbarLink" to="/write" >
          <li className="sideListItem">WRITE</li>
          </Link>
          {
            user && <li className="sideListItem"><button className="logoutBtn" onClick={handleLOGOUT}>LOGOUT </button></li>
          }
          </ul>
      </div>
    </div>
  );
};

export default Topbar;
 