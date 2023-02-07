import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {Link,  useParams} from 'react-router-dom';
import axios from "axios";
// import { Users } from "../../dummyData";
import { useState } from "react";
import { useEffect } from "react";
import {format} from "timeago.js"
export default function Post({ post}) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [del,setDelete]=useState(false);
  const params=useParams();
  const [user,setUser]=useState({});
  const id=JSON.parse(localStorage.getItem('id'));
  useEffect(()=>{
    const fetchUser=async ()=>{
      const res=await axios.get(`https://backend-gwa2.onrender.com/${post.userId}/getUser`);

       setUser(res.data);
       console.log(post.image);
    }
    
      fetchUser();
      if(params){
        if(params.id===id){
          setDelete(true);
        }else{
          setDelete(false);
        }
      }
    
  },[post.userId])
  useEffect(() => {
    setIsLiked(post.likes.includes(id));
  }, [id, post.likes]);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const likeHandler =()=>{
    // try {
    //   axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    // } catch (err) {}
    // setLike(isLiked ? like - 1 : like + 1);
    // setIsLiked(!isLiked);
    try{
      axios.put(`https://backend-gwa2.onrender.com/${post._id}/likeDisPost`,{userId:id});
    }catch(err){};
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  
  const handleDelete=async (e)=>{
    e.preventDefault();
      await axios.delete(`https://backend-gwa2.onrender.com/${post._id}/deletePost`,{userId:id});
      
      alert("Post deleted");
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${post.userId}`} >
            <img
              className="postProfileImg"
              crossorigin="anonymous"
              src={user.profilePicture||PF+"download.png" }
              alt=""
              
              />
              </Link>
            <span className="postUsername">
              {user.userName}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
            
          </div>
          <div className="postTopRight">
            {/* <MoreVert /> */}
            {del?
            <i className="fa-solid fa-trash" style={{"cursor":"pointer"}} onClick={(e)=>{
              handleDelete(e);
            }}></i>:""
            }
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" crossorigin="anonymous"src={PF+post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} crossorigin="anonymous"onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} crossorigin="anonymous"onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
