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
		<div className="container">
			<div className="row mt-5">
				<div className="col-6">
					<div>
						<p><strong>Welcome back</strong> {user.userName}</p>
						<p><strong>Email</strong>: {user.email}</p>
						{loggedInUser?._id === user._id
							? <Link to="/logout" className="col-3 btn btn-dark">Logout</Link>
							: null}
						
					</div>
					<div className="mt-5">
						<h2>Create a new character</h2>
						<form action="/api/post/createPost" encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="imgUpload" className="form-label">Media</label>
								<input type="file" className="form-control" id="imageUpload" name="file" />
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Name</label>
								<input type="text" className="form-control" id="name" name="name" />
							</div>
							<div className="mb-3">
								<label htmlFor="ancestry" className="form-label">Ancestry</label>
								<input type="text" className="form-control" id="ancestry" name="ancestry"/>
							</div>
							<div className="mb-3">
								<label htmlFor="str" className="form-label">Str</label>
								<input type="text" className="form-control" id="str" name="str"/>
							</div>
							<div className="mb-3">
								<label htmlFor="int" className="form-label">Int</label>
								<input type="text" className="form-control" id="int" name="int"/>
							</div>
							<div className="mb-3">
								<label htmlFor="class" className="form-label">Class</label>
								<input type="text" className="form-control" id="class" name="class"/>
							</div>
							<div className="mb-3">
								<label htmlFor="level" className="form-label">Level</label>
								<input type="text" className="form-control" id="level" name="level"/>
							</div>
							<div className="mb-3">
								<label htmlFor="xp" className="form-label">XP</label>
								<input type="text" className="form-control" id="xp" name="xp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="maxXp" className="form-label">Max XP</label>
								<input type="text" className="form-control" id="maxXp" name="maxXp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="dex" className="form-label">Dex</label>
								<input type="text" className="form-control" id="dex" name="dex"/>
							</div>
							<div className="mb-3">
								<label htmlFor="wis" className="form-label">Wis</label>
								<input type="text" className="form-control" id="wis" name="wis"/>
							</div>
							<div className="mb-3">
								<label htmlFor="title" className="form-label">Title</label>
								<input type="text" className="form-control" id="title" name="title"/>
							</div>
							<div className="mb-3">
								<label htmlFor="alignment" className="form-label">Alignment</label>
								<input type="text" className="form-control" id="alignment" name="alignment"/>
							</div>
							<div className="mb-3">
								<label htmlFor="con" className="form-label">Con</label>
								<input type="text" className="form-control" id="con" name="con"/>
							</div>
							<div className="mb-3">
								<label htmlFor="cha" className="form-label">Cha</label>
								<input type="text" className="form-control" id="cha" name="cha"/>
							</div>
							<div className="mb-3">
								<label htmlFor="background" className="form-label">Background</label>
								<input type="text" className="form-control" id="background" name="background"/>
							</div>
							<div className="mb-3">
								<label htmlFor="deity" className="form-label">Deity</label>
								<input type="text" className="form-control" id="deity" name="deity"/>
							</div>
							<div className="mb-3">
								<label htmlFor="hp" className="form-label">Hp</label>
								<input type="text" className="form-control" id="hp" name="hp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="ac" className="form-label">AC</label>
								<input type="text" className="form-control" id="ac" name="ac"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack1" className="form-label">Attack 1</label>
								<input type="text" className="form-control" id="attack1" name="attack1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack2" className="form-label">Attack 2</label>
								<input type="text" className="form-control" id="attack2" name="attack2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack3" className="form-label">Attack 3</label>
								<input type="text" className="form-control" id="attack3" name="attack3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack4" className="form-label">Attack 4</label>
								<input type="text" className="form-control" id="attack4" name="attack4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent1" className="form-label">Talent 1</label>
								<input type="text" className="form-control" id="talent1" name="talent1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent2" className="form-label">Talent 2</label>
								<input type="text" className="form-control" id="talent2" name="talent2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent3" className="form-label">Talent 3</label>
								<input type="text" className="form-control" id="talent3" name="talent3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent4" className="form-label">Talent 4</label>
								<input type="text" className="form-control" id="talent4" name="talent4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent5" className="form-label">Talent 5</label>
								<input type="text" className="form-control" id="talent5" name="talent5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent6" className="form-label">Talent 6</label>
								<input type="text" className="form-control" id="talent6" name="talent6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent7" className="form-label">Talent 7</label>
								<input type="text" className="form-control" id="talent7" name="talent7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent8" className="form-label">Talent 8</label>
								<input type="text" className="form-control" id="talent8" name="talent8"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell1" className="form-label">Spell 1</label>
								<input type="text" className="form-control" id="spell1" name="spell1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell2" className="form-label">Spell 2</label>
								<input type="text" className="form-control" id="spell2" name="spell2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell3" className="form-label">Spell 3</label>
								<input type="text" className="form-control" id="spell3" name="spell3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell4" className="form-label">Spell 4</label>
								<input type="text" className="form-control" id="spell4" name="spell4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell5" className="form-label">Spell 5</label>
								<input type="text" className="form-control" id="spell5" name="spell5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell6" className="form-label">Spell 6</label>
								<input type="text" className="form-control" id="spell6" name="spell6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell7" className="form-label">Spell 7</label>
								<input type="text" className="form-control" id="spell7" name="spell7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell8" className="form-label">Spell 8</label>
								<input type="text" className="form-control" id="spell8" name="spell8"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell9" className="form-label">Spell 9</label>
								<input type="text" className="form-control" id="spell9" name="spell9"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell10" className="form-label">Spell 10</label>
								<input type="text" className="form-control" id="spell10" name="spell10"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell11" className="form-label">Spell 11</label>
								<input type="text" className="form-control" id="spell11" name="spell11"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell12" className="form-label">Spell 12</label>
								<input type="text" className="form-control" id="spell12" name="spell12"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell13" className="form-label">Spell 13</label>
								<input type="text" className="form-control" id="spell13" name="spell13"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell14" className="form-label">Spell 14</label>
								<input type="text" className="form-control" id="spell14" name="spell14"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell15" className="form-label">Spell 15</label>
								<input type="text" className="form-control" id="spell15" name="spell15"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell16" className="form-label">Spell 16</label>
								<input type="text" className="form-control" id="spell16" name="spell16"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear1" className="form-label">Gear 1</label>
								<input type="text" className="form-control" id="gear1" name="gear1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear2" className="form-label">Gear 2</label>
								<input type="text" className="form-control" id="gear2" name="gear2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear3" className="form-label">Gear 3</label>
								<input type="text" className="form-control" id="gear3" name="gear3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear4" className="form-label">Gear 4</label>
								<input type="text" className="form-control" id="gear4" name="gear4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear5" className="form-label">Gear 5</label>
								<input type="text" className="form-control" id="gear5" name="gear5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear6" className="form-label">Gear 6</label>
								<input type="text" className="form-control" id="gear6" name="gear6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear7" className="form-label">Gear 7</label>
								<input type="text" className="form-control" id="gear7" name="gear7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear8" className="form-label">Gear 8</label>
								<input type="text" className="form-control" id="gear8" name="gear8"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear9" className="form-label">Gear 9</label>
								<input type="text" className="form-control" id="gear9" name="gear9"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear10" className="form-label">Gear 10</label>
								<input type="text" className="form-control" id="gear10" name="gear10"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear11" className="form-label">Gear 11</label>
								<input type="text" className="form-control" id="gear11" name="gear11"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear12" className="form-label">Gear 12</label>
								<input type="text" className="form-control" id="gear12" name="gear12"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear13" className="form-label">Gear 13</label>
								<input type="text" className="form-control" id="gear13" name="gear13"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear14" className="form-label">Gear 14</label>
								<input type="text" className="form-control" id="gear14" name="gear14"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear15" className="form-label">Gear 15</label>
								<input type="text" className="form-control" id="gear15" name="gear15"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear165" className="form-label">Gear 16</label>
								<input type="text" className="form-control" id="gear165" name="gear165"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear17" className="form-label">Gear 17</label>
								<input type="text" className="form-control" id="gear17" name="gear17"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear18" className="form-label">Gear 18</label>
								<input type="text" className="form-control" id="gear18" name="gear18"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear19" className="form-label">Gear 19</label>
								<input type="text" className="form-control" id="gear19" name="gear19"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear20" className="form-label">Gear 20</label>
								<input type="text" className="form-control" id="gear20" name="gear20"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gp" className="form-label">Gp</label>
								<input type="text" className="form-control" id="gp" name="gp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="sp" className="form-label">Sp</label>
								<input type="text" className="form-control" id="sp" name="sp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="cp" className="form-label">Cp</label>
								<input type="text" className="form-control" id="cp" name="cp"/>
							</div>

							<button type="submit" className="btn btn-dark mb-5" value="Upload">Submit</button>
						</form>
					</div>
				</div>
				<div className="col-6">
					<PostList posts={posts} />
					<div className="row justify-content-center mt-5">
						<Link className="btn btn-dark" to="/feed">Return to Feed</Link>
					</div>
				</div>
					
			</div>
		</div>
	)
}