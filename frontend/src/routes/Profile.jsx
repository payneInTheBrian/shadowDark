import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { API_BASE } from "../constants";

export function Profile() {
	const { user: loggedInUser, setUser: setLoggedInUser, setMessages } = useOutletContext();
	const userIdOrName = useParams().userIdOrName;

	const [user, setUser] = useState();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(API_BASE + "/api/profile/" + userIdOrName, { credentials: "include" })
			.then((res) => res.json())
			.then(({ user, posts }) => {
				setUser(user)
				setPosts(posts);
			});
	}, [userIdOrName]);

	if (user === undefined) return null;
	else if (!user) return <div>User not found</div>;

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const response = await fetch(API_BASE + form.getAttribute('action'), {
			method: form.method,
			body: new FormData(form),
			credentials: "include"
		});
		const json = await response.json();
		if (json.messages) setMessages(json.messages);
		if (json.post) {
			setPosts([...posts, json.post]);
			form.reset();
		}
	};


	return (
		<div className="container min-vh-100">
			<div className="row ">
				<div className=" text-light">
					<div>
						<h3 className="my-3"><strong>Welcome back</strong> {user.userName}</h3>
						{/* <p><strong>Email</strong>: {user.email}</p> */}
						<Link className="btn purple-btn fw-bold" to="/newpost">New Character</Link>
						
					</div>
					<div className="mt-5">
						<h2 className="text-center">Characters</h2>
						<PostList posts={posts} />
					<div className="row justify-content-center mt-5">
						{/* <Link className="btn purple text-light col-2 " to="/feed">Return</Link> */}
						
						{loggedInUser?._id === user._id
							? <Link to="/logout" className="col-2 btn purple-btn fw-bold">Logout</Link>
							: null}
					</div>
				</div>
				<div className="col-6">
					
					</div>
				</div>
					
			</div>
		</div>
	)
}