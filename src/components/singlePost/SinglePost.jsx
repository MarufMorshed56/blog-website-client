import React, { useState, useEffect } from 'react'
// import web from '../../assets/web.jpg'
import './singlePost.css'
import { publicRequest, userRequest } from '../axiosReqMethods'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {ImageUrl} from "../axiosReqMethods"




const SinglePost = () => {
  //.............Update Mode..................//

  const [updateMode, setUpdateMode] = useState(false)
  const [newTitle, setNewTitle] = useState()
  const [newDescription, setNewDesciption] = useState()

  //.............Update Mode..................//

  const location = useLocation()
  const url_Id = location.pathname.split('/')[2]
  const user = useSelector((state) => state.user.currentUser)
  // console.log("url_Id",url_Id)
  const [singlePost, setSinglePost] = useState(false)

  // console.log('singleData', singlePost)

  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await publicRequest.get(`/post/find/${url_Id}`)
      setSinglePost(res.data)
 //.............Update Mode..................//
      setNewTitle(res.data.title)
      setNewDesciption(res.data.description)
      //this is necessary because in "updateMode" we will be desplaying these variables's value because we  can't make changes on data with displaying "singlePost.title", "singlePost.description" because  "onChange" won't work
 //.............Update Mode..................//
    }
    fetchSinglePost()
  }, [url_Id])

  const history = useHistory()

  // console.log(singlePost)


  //  const searchCat =(e)=>{
  //      history.push("/",{category:e.target.value})
  //  }

  const handleUpdate = async(e) => {
    // e.preventDefault() // we want to refresh
    try {
      await userRequest.put(`/post/${singlePost._id}` , {
        title:newTitle,
        description:newDescription,
        // we are just Sending the updated values
      }  )
    } catch (err) {
      console.log(err)
    }
    window.location.reload()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await userRequest.delete(`/post/${singlePost._id}`)
    } catch (err) {
      console.log(err)
    }
    history.push('/')
  }

  {
    /* .........Displaying uploaded pic........*/
  }
  const PF = ImageUrl

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePost">
          {singlePost.pic && (
            <img className="singlePostImg" src={PF + singlePost.pic} alt="" />
          )}
{/* .........Displaying uploaded pic........*/}

          <div className="singlePostInfo">
            <div className="singlePostCategories">
              <div className="singlePostCatDiv">
                <span className="singlePostCatName">
                  <b>Category:</b>
                </span>
                {singlePost &&
                  singlePost.categories.map((category) => (
                    <Link
                      style={{ 'text-decoration': 'none' }}
                      to={{
                        pathname: '/',
                        search: `?category=${category}`,
                        state: { cat: category },
                      }}
                    >
                      <span className="singlePostCat">{category}</span>
                    </Link>
                    // <span className="singlePostCat" onClick={searchCat}>{category}</span>
                  ))}
              </div>

              {singlePost &&
                (singlePost.username === user.username ? (
                  <div className="editContainer">
                    <i
                      onClick={(e) => setUpdateMode(true)}
                      className="singlePostIcon fa-solid fa-pen-to-square"
                    ></i>
                    <i
                      onClick={handleDelete}
                      style={{ color: 'red' }}
                      className=" singlePostIcon fa-solid fa-trash-can"
                    ></i>
                  </div>
                ) : (
                  <div></div>
                ))}
            </div>
            {singlePost && (
              <>
                {updateMode ? (
                  <input
                    style={{ width: '100%' }}
                    className="writeInput"
                    type="text"
                    value={newTitle}
                    onChange={(e)=>setNewTitle(e.target.value)}
                    
                  />
                ) : (
                  <h1 className="singlePostTitle">{singlePost.title}</h1>
                )}
                <span className="singlePostAuthor">
                  <Link
                    style={{ 'text-decoration': 'none', color: 'inherit' }}
                    to={{
                      pathname: '/',
                      search: `?author=${singlePost.username}`,
                      state: { author: singlePost.username },
                    }}
                  >
                    Author: <b>{singlePost.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">
                  {new Date(singlePost.createdAt).toDateString()}
                </span>
              </>
            )}
          </div>
          <hr />
          {singlePost && (
            <>
              <div className="singlePostDesc">
                {updateMode ? (
                  <textarea
                    type="text"
                    className="writeText writeInput"
                    value={newDescription}
                    onChange={(e)=>setNewDesciption(e.target.value)}
                  />
                ) : (
                  <p className="singlePostPara">{singlePost.description}</p>
                )}
              </div>
            </>
          )}
        </div>
        {
          updateMode && <button className='publishBtn' style={{marginLeft:"0px"}} onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  )
}

export default SinglePost
