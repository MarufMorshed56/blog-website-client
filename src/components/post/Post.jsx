import React from "react";
import "./post.css";
import {Link} from "react-router-dom"
import { ImageUrl } from "../axiosReqMethods";





const Post = ({post}) => {

  // console.log('post2',post)
  const {categories, ...restOfPost} = post
  
  const Author = restOfPost.username
  // console.log("categories",categories)
  // console.log("others",restOfPost)

  const handleContinueReading=(e)=>{
    e.preventDefault()
  }
  

  //.........Displaying uploaded pic.......//

  const PF = ImageUrl
  
  return (
    <>
      <div className="post">
        {
          restOfPost.pic &&  <img className="postImg" src={PF + restOfPost.pic } alt=""  />
        }
{/* .........Displaying uploaded pic........*/}
        <div className="postInfo">
          <div className="postCategories">
            {
              categories.map((category)=>(
                <span className="postCat">
                <Link style={{"text-decoration":"none","color":"inherit"}} to={{ pathname: '/',
                    search: `?category=${category}`, state: { cat: category } }}>
                      {category}
                    </Link>
                      </span>
              ))
            }
            
          </div>
          <span className="postTitle">{restOfPost.title}</span>
          <hr />
          <div className="authorDateDiv">
          <span className="postAuthor">
            <Link style={{"text-decoration":"none","color":"inherit"}} to={{ pathname: '/',
                    search: `?author=${Author}`, state: {author: Author } }}>
                      
                    Author: <b>{Author}</b>
            </Link>
            </span>
          <span className="postDate">{new Date(restOfPost.createdAt).toDateString()}</span>
          </div>
          <hr className="hr" />
        </div>
        <div className="postDesc">
          <p className="postPara">
           {restOfPost.description}
          </p>
        </div>
        
        <button className="postContinueBtn" onClick={handleContinueReading}>
          <Link to={`/post/${restOfPost._id}`} style={{"textDecoration":"none", color:"inherit"}}>
            Continue reading.... <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link></button>
        
      </div>

      
    </>
  );
};

export default Post;
