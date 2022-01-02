import React,{useState,useEffect} from 'react'
// import lorem from "../../assets/lorem.png"
import "./sidebar.css"

import { publicRequest } from '../axiosReqMethods'

import {Link} from "react-router-dom"



const Sidebar = () => {

const [post, setAllPost] = useState()

useEffect(()=>{

    const allPost = async()=>{
      const res = await publicRequest.get("/post")
      setAllPost(res.data)
    }
    allPost()
    // we are fetching allPost here so that we can pass it to "Sidebar" componenet where we extract the Unique Categories from all thePosts
},[])




  // createing a Category list..... shob gulo post er Categories theke unique category name gulo neya hoyeche
  
  
  let categoryList = []
  post && post.map((singlePost)=>(    
    // categoryList = [...categoryList,singlePost.categories]
       singlePost.categories.map((categories)=>(
            categoryList = [...categoryList,categories]
       ))
       // ekhane "categoryList" er vetor shob post shob category name royeche (er fole onek category name er duplicate royeche  ), er por "sortedCategoryList" e  shudhu shob type er category 1 ta kore niye duplicate gulo k bad diye deya houyeche 
  )) 

  let sortedCategoryList =[...new Set(categoryList)];
  // "new Set( Unsorted Array )" er maddhome  array theke duplicate gulo bad diye shob rokomer value er shudhu matro 1 ta kore neya notun array banano hoy

  console.log("sidebar",sortedCategoryList)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Admin</span>
        <img
          className="sidebarImg"
          src="https://image.shutterstock.com/image-vector/people-icon-vector-person-sing-600w-707883430.jpg"
          alt=""
          srcset=""
        />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor,
          aliquam.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {
            sortedCategoryList.map((categoryName)=>(

              <li className="sidebarListItem"><Link style={{"text-decoration":"none","color":"inherit"}} to={{ pathname: '/',
                    search: `?category=${categoryName}`, state: { cat: categoryName } }}>{categoryName}
                    </Link>
                    </li>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className='sidebarIcons'>
         <a style={{"textDecoration":"none","color":"#3B5998"}} href='https://www.facebook.com/Maruf.Morshed.Dipto/' >
        <i className="topIcon fa-brands fa-facebook"></i>
        </a>
        <a style={{"textDecoration":"none","color":"#00ACEE"}} href='https://mmd-portfolio-website.netlify.app/' >
        <i className="topIcon fa-brands fa-twitter"></i>
        </a>
        <a style={{"textDecoration":"none","color":"#E60023"}} href='https://mmd-portfolio-website.netlify.app/' >
        <i className="topIcon fa-brands fa-pinterest"></i>
        </a>
        <a style={{"textDecoration":"none","color":"#cd486b"}} href='https://mmd-portfolio-website.netlify.app/' >
        <i className="topIcon far fa-address-card"></i>
        </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Sidebar

