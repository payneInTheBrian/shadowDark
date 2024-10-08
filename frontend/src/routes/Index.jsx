import { Link } from "react-router-dom";

export default function Index() {
	return <main className="container">
		<img src="/shadowDark.jpg" alt="shadow dark" className="img-fluid mx-auto" />
		<div className="row justify-content-around mt-5">
			<Link to="/login" className="col-3 btn purple-btn mb-5 fw-bold"> Login</Link>
			<Link to="/signup" className="col-3 btn purple-btn mb-5 fw-bold"> Signup</Link>
		</div>
	</main>
}