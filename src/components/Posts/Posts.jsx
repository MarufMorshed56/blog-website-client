import React from 'react'
import Post from '../post/Post'
import "./posts.css"

const Posts = ({post}) => {
  
  // console.log("postsadadaj",post)
  return (
    <div className='posts'>
        {post.map((post) => (
        <Post post={post} />
      ))}

    </div>
  )
}

export default Posts
