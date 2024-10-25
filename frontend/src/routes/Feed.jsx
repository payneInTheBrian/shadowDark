import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { API_BASE } from "../constants";

export default function Feed() {
	const [tab, setTab] = useState('public');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setPosts([]);
		fetch(API_BASE + "/api/feed/" + tab, { credentials: "include" })
			.then((res) => res.json())
			.then((data) => setPosts(data));
	}, [tab]);

	const handleTabChange = (e) => {
		setTab(e.target.textContent.toLowerCase());
		
	};

	return (
		<div className="container min-vh-100">
			<ul className="nav nav-pills nav-fill" role="tablist">
				<li className="nav-item dark-purple rounded mx-1">
					<button className={`nav-link purple` + (tab === 'public' ? ' active'  : '')} role="tab" aria-selected={tab === 'public'} onClick={handleTabChange}>Public</button>
				</li>
				<li className="nav-item dark-purple rounded mx-1">
					<button className={`nav-link purple` + (tab === 'following' ? ' active' : '')} role="tab" aria-selected={tab === 'following'} onClick={handleTabChange}>Your Group</button>
				</li>
			</ul>
			<div className="row justify-content-center mt-5">
				<PostList posts={posts} />
			</div>
		</div>
	)
}