import React,{useState,useEffect} from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

import "./home.css"
import {publicRequest} from "../../components/axiosReqMethods"

import {useLocation,useHistory} from "react-router-dom"
import { useSelector } from "react-redux";

const Home = () => {

const [post,setPost] = useState()
// const [allPost, setAllPost] = useState()

const location = useLocation()
const search = location.search


//empty array is truthy value so we made some changes
const querySearchedPost = useSelector((state)=>state.query.posts)

let length = querySearchedPost.length
 
 

// console.log("search",search)

useEffect(()=>{
    const fetchPost =async()=>{
      if(search){
        const res = await publicRequest.get(`/post/${search}`)
        setPost(res.data)
      }else{const res = await publicRequest.get("/post")
      setPost(res.data)}
    }

    // const allPost = async()=>{
    //   const res = await publicRequest.get("/post")
    //   setAllPost(res.data)
    // }
    fetchPost()
    // allPost()
    // we are fetching allPost here so that we can pass it to "Sidebar" componenet where we extract the Unique Categories from all thePosts
},[search])


// console.log("befor home",querySearchedPost)

 const history = useHistory()

const handleClear=(e)=>{
  e.preventDefault()

  history.push("/")
}


  return <>
    <Topbar />
    <Header />
    <div className="home">
      <div className="homeWrapper">
     {search && ( <div className="search"><b> {` ${search.split("=")[0].slice(1)}`} =  {search.split("=")[1]}</b> <button className="clearBtn" onClick={handleClear}>Clear</button> </div>)
     }

     {/* {(length > 0) && ( <div className="search" >Searched<b>{querySearchedPost}</b> <button onClick={handleClear}>Clear</button> </div>)
     } */}
    {  
      (length <= 0 ) ?(post &&  <Posts post={post}/>) : (search ? (post &&  <Posts post={post}/>) : <Posts post={querySearchedPost}/>  )
       }
       </div>
         
      <Sidebar/> 
           
  </div>
    </>
};

export default Home;
