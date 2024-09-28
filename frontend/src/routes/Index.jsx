import { Link } from "react-router-dom";

export default function Index() {
	return <main className="container">
		<img src="/shadowDark.jpg" alt="shadow dark" className="img-fluid d-flex justify-content-center" />
		<div className="row justify-content-around mt-5">
			<Link to="/login" className="col-3 btn btn-dark mb-5"> Login</Link>
			<Link to="/signup" className="col-3 btn btn-dark mb-5"> Signup</Link>
		</div>
	</main>
}