import { Link } from "react-router-dom";

const PostPreview = ({ _id, media, name }) => <li className="col-6 justify-content-between mt-5">
	<Link to={`/post/${_id}`}>
		{media.endsWith('.mp4') ? <video src={media} alt={name} ></video> : media.endsWith('.mp3') ? <p>{name}</p> : 
		<img src={media} className="img-fluid" alt={name}  /> }
	</Link>
</li>

export default PostPreview;