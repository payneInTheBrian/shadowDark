import { Link } from "react-router-dom";

const PostPreview = ({ _id, media, name }) => <li className="col-6 justify-content-between mt-5">
	<Link to={`/post/${_id}`}>
		{{media} ? <img src={media} className="img-fluid img-alt" alt={name}  /> : <h3 className="border rounded texture bg-dark text-purple mx-4 my-4 px-3 py-3">{name}</h3>}
	</Link>
</li>

export default PostPreview;