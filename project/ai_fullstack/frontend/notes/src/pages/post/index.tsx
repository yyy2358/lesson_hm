import React from 'react';
import {
  useParams
} from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams();
  console.log(id, "-------")
  return (
    <>
      PostDetail
    </>
  )
} 

export default PostDetail;