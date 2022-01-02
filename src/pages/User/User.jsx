import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './user.css'

import Topbar from '../../components/topbar/Topbar'
import { useSelector, useDispatch } from 'react-redux'
import { logOut,loginSuccess } from '../../redux/userRedux'
import { useHistory, useLocation } from 'react-router-dom'
import { userRequest, publicRequest } from '../../components/axiosReqMethods'

import {ImageUrl} from "../../components/axiosReqMethods" 

const User = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [file, setFile] = useState(null)

  const user = useSelector((state) => state.user.currentUser)

  const [newUsername, setNewUsername] = useState(user.username)
  const [newEmail, setNewEmail] = useState(user.email)
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log("idu",user._id)

    const updatedUser = {
      username:newUsername,
      email:newEmail,
      password:newPassword,
    }

    {
      /*...............handling user pic upload ................*/
    }

    //  for "pic" to be uploaded fragments of code were written in   "api-> index.js" "react-> Write.jsx, Post.jsx,  SinglePost.jsx, user.jsx "

    // "api-> index.js" "react-> Write.jsx" used for writing the code for uploading &
    // for seeing the "pic" code was written in "Post.jsx" & "SinglePost.jsx" & in "user.jsx" to update the user
    {
      /*............handling pic upload...................*/
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      updatedUser.profilePic = fileName
      try {
        await userRequest.post('/upload', data)
      } catch (error) {
        console.log("can't upload")
      }
    }
    {
      /*............handling pic upload...................*/
    }
    try {
        const res = await userRequest.put(`/user/${user._id}`, updatedUser)
        dispatch(loginSuccess(res.data))
      window.location.reload()
    } catch (error) {
      console.log("can't post", error)
    }
  }


  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await userRequest.delete(`/user/${user._id}`)
      dispatch(logOut())
    } catch (err) {
      console.log(err)
    }
    history.push('/')
  }

  
//..............Displaying uploaded image .........//

  const PF = ImageUrl

  {/* ............displaying uploaded pic ................... */}

  return (
    <>
      <Topbar />
      <div className="user">
        <div className="userWrapper">
          <div className="userTitle">
            <span className="userUpdateTitle">Update Account</span>
            <button className="userDeleteBtn" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
          <form className="userForm" onSubmit={handleSubmit} action="writeProfile">
            <div className="userProPicUpdateContainer">
              <div className="userProPicContainer">
                <label>Current Profile Picture:</label>
                {/* ............displaying uploaded pic ................... */}
                {file ? (
                  <img className="userProPic" src={URL.createObjectURL(file)} />
                ) : (
                  <img className="userProPic" src={PF + user.profilePic} />
                )}
{/* ............displaying uploaded pic ................... */}
              </div>
              <div className="userProPicChangeContainer">
                <label htmlFor="inputimage" className="inputfileLabel">
                  Change Profile Image {' '}
                  <i className="userPicUploadIcon fa-regular fa-image"></i>
                  {/*............handling pic upload...................*/}
                  </label>
                  <input
                    type="file"
                    id="inputimage"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {/*............handling pic upload...................*/}
              </div>
            </div>
            <label>Username:</label>
            <input
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              value={newUsername}
            />
            <label>Email:</label>
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              type="email"
              value={newEmail}
            />
            <label>Password:</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />

            <button className="userBtn" type="submit">
              {' '}
              Change
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default User
