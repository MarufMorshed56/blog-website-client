import React, { useState } from 'react'
import './write.css'

import Topbar from '../../components/topbar/Topbar'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userRequest,publicRequest } from '../../components/axiosReqMethods'

const Write = () => {
  const user = useSelector((state) => state.user)
  
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  // logic for setting no. of categgories

  const [catNo, setCatNo] = useState([1])
  let num = catNo.length
  
  const handleNo = (e) => {
    let array = new Array(Number(e.target.value)).fill(0)
    setCatNo(array)
  }

  //...........................

  const [selectCategory, setSelectCategory] = useState([])

  const handleSelectCategory = (e) => {
    setSelectCategory([...selectCategory, e.target.value])
  }

  let subTotalCategory = [...new Set(selectCategory)]
  let totalCategory = subTotalCategory.slice(-num)

  //  console.log(-num)
  //  console.log("sc", selectCategory)
  //  console.log("tc", totalCategory)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      title: title,
      description: description,
      username: user.currentUser.username,
      userId: user.currentUser._id,
      categories: totalCategory
    }
    
{/*...............handling pic upload................*/}


//  for "pic" to be uploaded fragments of code were written in   "api-> index.js" "react-> Write.jsx, Post.jsx,  SinglePost.jsx, user.jsx " 

// "api-> index.js" "react-> Write.jsx" used for writing the code for uploading &      
  // for seeing the "pic" code was written in "Post.jsx" & "SinglePost.jsx" & in "user.jsx" to update the user

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.pic = fileName
      try {
        await userRequest.post('/upload', data)
      } catch (error) {
        console.log("can't upload")
      }
    }
 {/*............handling pic upload...................*/}
    try {
      const res = await userRequest.post('/post', newPost)
      history.push(`/post/${res.data._id}`)
    } catch (error) {
      console.log("can't post",error)
    }
  }

  return (
    <>
      <Topbar />
      <div className="write">
        {
          file && <img className="addImg" src={URL.createObjectURL(file)} />
        }
        <form onSubmit={handleSubmit} action="writeForm">
          <div className="writeFormGroup">
            <label htmlFor="inputFile">
              Add Image: {''}
              <i className="writeIcon  fa-solid fa-folder-plus"></i>
            </label>
 {/*............handling pic upload...................*/}
            <input type="file" id="inputFile" style={{color:"transparent"}} onChange={(e)=> setFile(e.target.files[0])} />
 {/*............handling pic upload...................*/}


            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <div className="allCatDiv">
              <span>No. of categories:</span>
              <select
                className=" selectCatNo"
                name="catNo"
                onChange={(e) => {
                  handleNo(e)
                }}
              >
                <option selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div className="catDiv">
                {catNo.map((esd) => (
                  <select
                    onChange={(e) => {
                      handleSelectCategory(e)
                    }}
                    className=" selectCat"
                    name="category"
                  >
                    <option selected disabled>
                      category
                    </option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Music">Music</option>
                    <option value="Music">Fitness</option>
                    <option value="DIY">DIY</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Personal">Personal</option>
                    <option value="Movie">Movie</option>
                    <option value="Games">Games</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Random">Random</option>
                    <option value="Others">Others</option>
                  </select>
                ))}
              </div>
            </div>
          </div>
          <div className="writeFormGroup">
            <textarea
              type="text"
              className="writeText writeInput"
              placeholder="Your story..."
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="publishBtn">
            Publish
          </button>
        </form>
      </div>
    </>
  )
}

export default Write
