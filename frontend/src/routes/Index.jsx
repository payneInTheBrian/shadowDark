import { Link } from "react-router-dom";

export default function Index() {
	return <main className="container">
		<img src="/shadowDark.jpg" alt="shadow dark" className="img-fluid mx-auto" />
		<div>
			<h4 className="text-light my-4 mx-2 text-center">Shadow Dark is built on old school D&D. Create a character and track your progress as you play!</h4>
		</div>
		<div className="row justify-content-around mt-3">
			<Link to="/login" className="col-3 btn purple-btn mb-5 fw-bold"> Login</Link>
			<Link to="/signup" className="col-3 btn purple-btn mb-5 fw-bold"> Signup</Link>
		</div>
	</main>
}