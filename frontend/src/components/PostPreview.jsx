import { Link } from "react-router-dom";

const PostPreview = ({ _id, media, name }) => <li className="col-6 justify-content-between mt-5">
	<Link to={`/post/${_id}`}>
		{{media} ? <div className="img-alt row"><div className="row "><img src={media} className="img-fluid " alt={name}  /></div><h3 className="mt-2 text-center">{name.toUpperCase()}</h3></div> 
				: <h3 className="border rounded texture text-purple mx-4 my-4 px-3 py-3">{name}</h3>}
	</Link>
</li>

export default PostPreview;