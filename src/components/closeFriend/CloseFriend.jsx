import "./closeFriend.css";
import { Link } from "react-router-dom";

export default function CloseFriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link to={`http://localhost:3000/profile/${user._id}`}><img className="sidebarFriendImg"crossorigin="anonymous" src={user.profilePicture||PF+"download.png"} alt="" />
      </Link>
      <span className="sidebarFriendName">{user.userName}</span>
    </li>
  );
}
