import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API_BASE } from "../constants";
import Comment from '../components/Comment'

export default function Post() {
	const { user } = useOutletContext();
	const postId = useParams().id;
	const navigate = useNavigate();

	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		fetch(API_BASE + `/api/post/${postId}`, { credentials: "include" })
			.then((res) => res.json())
			.then(({ post, comments }) => {
				setPost(post);
				setComments(comments);
			});
	}, [setPost, postId]);

	if (!user) return null;

	if (post === undefined) return null;
	else if (post === null) return <h2>Post not found</h2>;

	const handleLike = async (event) => {
		event.preventDefault();
		const button = event.currentTarget;
		const response = await fetch(API_BASE + button.getAttribute('action'), {
			method: button.getAttribute('method'),
			credentials: "include"
		});
		const change = await response.json();
		setPost({ ...post, likes: post.likes + change });
	};

	const handleDelete = async (event) => {
		event.preventDefault();
		const button = event.currentTarget;
		await fetch(API_BASE + button.getAttribute('action'), {
			method: button.getAttribute('method'),
			credentials: "include"
		});
		navigate(-1);
	};

	const handleUpdate = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const response = await fetch(API_BASE + form.getAttribute('action'), {
			method: form.method,
			body: new FormData(form),
			credentials: "include"
		});
		const json = await response.json();
		if (json.post) {
			setPost(json.post);
			form.reset();
			form.querySelector('[data-bs-dismiss]').click();
		}
	};

	const handleAddComment = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const response = await fetch(API_BASE + form.getAttribute('action'), {
			method: form.method,
			body: new URLSearchParams(new FormData(form)),
			credentials: "include"
		});
		const comment = await response.json();
		setComments([...comments, comment]);
		form.reset();
	};

	const deleteComment = async (id, event) => {
		const newComments = JSON.parse(JSON.stringify(comments));
		const commentArrays = new Map();
		for (const comment of newComments) commentArrays.set(comment._id, newComments);

		const queue = [...newComments];
		while (queue.length) {
			const comment = queue.shift();
			if (comment._id === id) {

				event.preventDefault();
				const form = event.currentTarget;
				const response = await fetch(API_BASE + form.getAttribute('action'), {
					method: form.method,
					body: new URLSearchParams(new FormData(form)),
					credentials: "include"
				});
				const deletedComment = await response.json();
				if (deletedComment) {
					Object.assign(comment, deletedComment);
				} else {
					const array = commentArrays.get(comment.id);
					array.splice(array.indexOf(comment), 1);
				}
				break;
			}
			for (const subComment of comment.comments) {
				queue.push(subComment);
				commentArrays.set(subComment.id, comment.comments);
			}
		}

		setComments(newComments);
	}

	const updateComment = async (id, event) => {
		const newComments = JSON.parse(JSON.stringify(comments));

		const queue = [...newComments];
		while (queue.length) {
			const comment = queue.shift();
			if (comment._id === id) {
				event.preventDefault();
				const form = event.currentTarget;
				const response = await fetch(API_BASE + form.getAttribute('action'), {
					method: form.method,
					body: new URLSearchParams(new FormData(form)),
					credentials: "include"
				});
				Object.assign(comment, await response.json());
				form.querySelector('[data-bs-dismiss]').click();
				break;
			}
			for (const subComment of comment.comments) {
				queue.push(subComment);
			}
		}

		setComments(newComments);
	}


	const addComment = async (id, event) => {
		const newComments = JSON.parse(JSON.stringify(comments));

		const queue = [...newComments];
		while (queue.length) {
			const comment = queue.shift();
			if (comment._id === id) {
				event.preventDefault();
				const form = event.currentTarget;
				const response = await fetch(API_BASE + form.getAttribute('action'), {
					method: form.method,
					body: new URLSearchParams(new FormData(form)),
					credentials: "include"
				});
				const newComment = await response.json()
				comment.comments.push(newComment);
				form.closest('.accordion').querySelector('button').click();
				form.reset();
				break;
			}
			for (const subComment of comment.comments) {
				queue.push(subComment);
			}
		}

		setComments(newComments);
	}

	return (
		<div className="container texture" >
			<div className="row justify-content-center mt-5">
				<div className="col-6">
					<h2 className="text-light">
						{post.name}
						
					</h2>
					{/* {post.media.endsWith('.mp4') ? <video src={post.media} controls alt={post.caption} ></video> : post.media.endsWith('.mp3') ? <audio src={post.media} controls alt={post.caption} /> : <img src={post.media} className="img-fluid" alt={post.caption}  />} */}
					{post.media ? <img src={post.media} className="img-fluid" alt={post.name}  /> : <h3 className="border rounded bg-dark text-purple mx-4 my-4 px-3 py-3 ">{post.name}</h3>}
					<div className="row justify-content-between">
					
						
						{post.user === user._id && (
							<>
								<div className="btn-group col-4" role="group" aria-label="Post Actions">
									 <button action={`/api/post/likePost/${post._id}?_method=PUT`} method="POST" className="btn btn-primary fa fa-heart" type="submit" onClick={handleLike}></button> 
									<button type="button" className="btn btn-warning fa fa-edit" data-bs-toggle="modal" data-bs-target="#editPost"></button>
									<button action={`/api/post/deletePost/${post._id}?_method=DELETE`} method="POST" className="btn btn-danger fa fa-trash" type="submit" onClick={handleDelete}></button>
								</div>
								 <h3 className="col-3 text-light">Likes {post.likes}</h3> 
								<div className="modal fade" id="editPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<form className="modal-content" encType="multipart/form-data" action={`/api/post/editPost/${post.id}?_method=PATCH`} method="POST" onSubmit={handleUpdate}>
											<div className="modal-header">
												<h5 className="modal-title" id="exampleModalLabel">Edit Character</h5>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancel"></button>
											</div>
											<div className="modal-body">
												<div className="mb-3">
													<label htmlFor="name" className="form-label">Name</label>
													<input type="text" className="form-control" id="name" name="name" defaultValue={post.name} />
												</div>
												<div className="mb-3">
													<label htmlFor="title" className="form-label">Title</label>
													<input type="text" className="form-control" id="title" name="title" defaultValue={post.title} />
												</div>
												<div className="mb-3">
													<label htmlFor="ancestry" className="form-label">Ancestry</label>
													<input type="text" className="form-control" id="ancestry" name="ancestry" defaultValue={post.ancestry} />
												</div>
												<div className="mb-3">
													<label htmlFor="str" className="form-label">Str</label>
													<input type="text" className="form-control" id="str" name="str" defaultValue={post.str} />
												</div>
												<div className="mb-3">
													<label htmlFor="int" className="form-label">Int</label>
													<input type="text" className="form-control" id="int" name="int" defaultValue={post.int} />
												</div>
												<div className="mb-3">
													<label htmlFor="class" className="form-label">Class</label>
													<input type="text" className="form-control" id="class" name="class" defaultValue={post.class} />
												</div>
												<div className="mb-3">
													<label htmlFor="level" className="form-label">Level</label>
													<input type="text" className="form-control" id="level" name="level" defaultValue={post.level} />
												</div>
												<div className="mb-3">
													<label htmlFor="xp" className="form-label">Xp</label>
													<input type="text" className="form-control" id="xp" name="xp" defaultValue={post.xp} />
												</div>
												<div className="mb-3">
													<label htmlFor="maxXp" className="form-label">Max Xp</label>
													<input type="text" className="form-control" id="maxXp" name="maxXp" defaultValue={post.maxXp} />
												</div>
												<div className="mb-3">
													<label htmlFor="dex" className="form-label">Dex</label>
													<input type="text" className="form-control" id="dex" name="dex" defaultValue={post.dex} />
												</div>
												<div className="mb-3">
													<label htmlFor="wis" className="form-label">Wis</label>
													<input type="text" className="form-control" id="wis" name="wis" defaultValue={post.wis} />
												</div>
												<div className="mb-3">
													<label htmlFor="title" className="form-label">Title</label>
													<input type="text" className="form-control" id="title" name="title" defaultValue={post.title} />
												</div>
												<div className="mb-3">
													<label htmlFor="alignment" className="form-label">Alignment</label>
													<input type="text" className="form-control" id="alignment" name="alignment" defaultValue={post.alignment} />
												</div>
												<div className="mb-3">
													<label htmlFor="con" className="form-label">Con</label>
													<input type="text" className="form-control" id="con" name="con" defaultValue={post.con} />
												</div>
												<div className="mb-3">
													<label htmlFor="cha" className="form-label">Cha</label>
													<input type="text" className="form-control" id="cha" name="cha" defaultValue={post.cha} />
												</div>
												<div className="mb-3">
													<label htmlFor="background" className="form-label">Background</label>
													<input type="text" className="form-control" id="background" name="background" defaultValue={post.background} />
												</div>
												<div className="mb-3">
													<label htmlFor="deity" className="form-label">Deity</label>
													<input type="text" className="form-control" id="deity" name="deity" defaultValue={post.deity} />
												</div>
												<div className="mb-3">
													<label htmlFor="hp" className="form-label">Hp</label>
													<input type="text" className="form-control" id="hp" name="hp" defaultValue={post.hp} />
												</div>
												<div className="mb-3">
													<label htmlFor="ac" className="form-label">Ac</label>
													<input type="text" className="form-control" id="ac" name="ac" defaultValue={post.ac} />
												</div>
												<div className="mb-3">
													<label htmlFor="attack1" className="form-label">Attack 1</label>
													<input type="text" className="form-control" id="attack1" name="attack1" defaultValue={post.attack1} />
												</div>
												<div className="mb-3">
													<label htmlFor="attack2" className="form-label">Attack 2</label>
													<input type="text" className="form-control" id="attack2" name="attack2" defaultValue={post.attack2} />
												</div>
												<div className="mb-3">
													<label htmlFor="attack3" className="form-label">Attack 3</label>
													<input type="text" className="form-control" id="attack3" name="attack3" defaultValue={post.attack3} />
												</div>
												<div className="mb-3">
													<label htmlFor="attack4" className="form-label">Attack4</label>
													<input type="text" className="form-control" id="attack4" name="attack4" defaultValue={post.attack4} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent1" className="form-label">Talent 1</label>
													<input type="text" className="form-control" id="talent1" name="talent1" defaultValue={post.talent1} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent2" className="form-label">Talent 2</label>
													<input type="text" className="form-control" id="talent2" name="talent2" defaultValue={post.talent2} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent3" className="form-label">Talent 3</label>
													<input type="text" className="form-control" id="talent3" name="talent3" defaultValue={post.talent3} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent4" className="form-label">Talent 4</label>
													<input type="text" className="form-control" id="talent4" name="talent4" defaultValue={post.talent4} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent5" className="form-label">Talent 5</label>
													<input type="text" className="form-control" id="talent5" name="talent5" defaultValue={post.talent5} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent6" className="form-label">Talent6</label>
													<input type="text" className="form-control" id="talent6" name="talent6" defaultValue={post.talent6} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent7" className="form-label">Talent 7</label>
													<input type="text" className="form-control" id="talent7" name="talen71" defaultValue={post.talent7} />
												</div>
												<div className="mb-3">
													<label htmlFor="talent8" className="form-label">Talent 8</label>
													<input type="text" className="form-control" id="talent8" name="talent8" defaultValue={post.talent8} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell1" className="form-label">Spell 1</label>
													<input type="text" className="form-control" id="spell1" name="spell1" defaultValue={post.spell1} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell2" className="form-label">Spell 2</label>
													<input type="text" className="form-control" id="spell2" name="spell2" defaultValue={post.spell2} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell3" className="form-label">Spell 3</label>
													<input type="text" className="form-control" id="spell3" name="spell3" defaultValue={post.spell3} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell4" className="form-label">Spell 4</label>
													<input type="text" className="form-control" id="spell4" name="spell4" defaultValue={post.spell4} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell5" className="form-label">Spell 5</label>
													<input type="text" className="form-control" id="spell5" name="spell5" defaultValue={post.spell5} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell6" className="form-label">Spell 6</label>
													<input type="text" className="form-control" id="spell6" name="spell6" defaultValue={post.spell6} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell7" className="form-label">Spell 7</label>
													<input type="text" className="form-control" id="spell7" name="spell7" defaultValue={post.spell7} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell8" className="form-label">Spell 8</label>
													<input type="text" className="form-control" id="spell8" name="spell8" defaultValue={post.spell8} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell9" className="form-label">Spell 9</label>
													<input type="text" className="form-control" id="spell9" name="spell9" defaultValue={post.spell9} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell10" className="form-label">Spell 10</label>
													<input type="text" className="form-control" id="spell10" name="spell10" defaultValue={post.spell10} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell11" className="form-label">Spell 11</label>
													<input type="text" className="form-control" id="spell11" name="spell11" defaultValue={post.spell11} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell12" className="form-label">Spell 12</label>
													<input type="text" className="form-control" id="spell12" name="spell12" defaultValue={post.spell12} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell13" className="form-label">Spell 13</label>
													<input type="text" className="form-control" id="spell13" name="spell13" defaultValue={post.spell13} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell14" className="form-label">Spell 14</label>
													<input type="text" className="form-control" id="spell14" name="spell14" defaultValue={post.spell14} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell15" className="form-label">Spell 15</label>
													<input type="text" className="form-control" id="spell15" name="spell15" defaultValue={post.spell15} />
												</div>
												<div className="mb-3">
													<label htmlFor="spell16" className="form-label">Spell 16</label>
													<input type="text" className="form-control" id="spell16" name="spell16" defaultValue={post.spell16} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear1" className="form-label">Gear 1</label>
													<input type="text" className="form-control" id="gear1" name="gear1" defaultValue={post.gear1} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear2" className="form-label">Gear 2</label>
													<input type="text" className="form-control" id="gear2" name="gear2" defaultValue={post.gear2} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear3" className="form-label">Gear 3</label>
													<input type="text" className="form-control" id="gear3" name="gear3" defaultValue={post.gear3} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear4" className="form-label">Gear 4</label>
													<input type="text" className="form-control" id="gear4" name="gear4" defaultValue={post.gear4} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear5" className="form-label">Gear 5</label>
													<input type="text" className="form-control" id="gear5" name="gear5" defaultValue={post.gear5} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear6" className="form-label">Gear 6</label>
													<input type="text" className="form-control" id="gear6" name="gear6" defaultValue={post.gear6} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear7" className="form-label">Gear 7</label>
													<input type="text" className="form-control" id="gear7" name="gear7" defaultValue={post.gear7} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear8" className="form-label">Gear 8</label>
													<input type="text" className="form-control" id="gear8" name="gear8" defaultValue={post.gear8} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear9" className="form-label">Gear 9</label>
													<input type="text" className="form-control" id="gear9" name="gear9" defaultValue={post.gear9} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear10" className="form-label">Gear 10</label>
													<input type="text" className="form-control" id="gear10" name="gear10" defaultValue={post.gear10} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear11" className="form-label">Gear 11</label>
													<input type="text" className="form-control" id="gear11" name="gear11" defaultValue={post.gear11} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear12" className="form-label">Gear 12</label>
													<input type="text" className="form-control" id="gear12" name="gear12" defaultValue={post.gear12} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear13" className="form-label">Gear 13</label>
													<input type="text" className="form-control" id="gear13" name="gear13" defaultValue={post.gear13} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear14" className="form-label">Gear 14</label>
													<input type="text" className="form-control" id="gear14" name="gear14" defaultValue={post.gear14} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear15" className="form-label">Gear 15</label>
													<input type="text" className="form-control" id="gear15" name="gear15" defaultValue={post.gear15} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear16" className="form-label">Gear 16</label>
													<input type="text" className="form-control" id="gear16" name="gear16" defaultValue={post.gear16} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear17" className="form-label">Gear 17</label>
													<input type="text" className="form-control" id="gear17" name="gear17" defaultValue={post.gear17} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear18" className="form-label">Gear 18</label>
													<input type="text" className="form-control" id="gear18" name="gear18" defaultValue={post.gear18} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear19" className="form-label">Gear 19</label>
													<input type="text" className="form-control" id="gear19" name="gear19" defaultValue={post.gear19} />
												</div>
												<div className="mb-3">
													<label htmlFor="gear20" className="form-label">Gear 20</label>
													<input type="text" className="form-control" id="gear20" name="gear20" defaultValue={post.gear20} />
												</div>
												<div className="mb-3">
													<label htmlFor="gp" className="form-label">Gp</label>
													<input type="text" className="form-control" id="gp" name="gp" defaultValue={post.gp} />
												</div>
												<div className="mb-3">
													<label htmlFor="sp" className="form-label">Sp</label>
													<input type="text" className="form-control" id="sp" name="sp" defaultValue={post.sp} />
												</div>
												<div className="mb-3">
													<label htmlFor="cp" className="form-label">Cp</label>
													<input type="text" className="form-control" id="cp" name="cp" defaultValue={post.cp} />
												</div>
												<div className="mb-3">
													<label htmlFor="imgUpload" className="form-label">New Media</label>
													<input type="file" className="form-control" id="imageUpload" name="file" />
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
												<button className="btn btn-dark">Update Character</button>
											</div>
										</form>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="col-3 mt-5 ">
					
					<p className="border px-2 bg-dark text-light rounded"><b>Title: </b>{post.title}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>Ancestry: </b>{post.ancestry}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>STR: </b>{post.str}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>INT: </b>{post.int}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>CLASS: </b>{post.class}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>LEVEL: </b>{post.level}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>XP: </b>{post.xp}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>MAX XP: </b>{post.maxXp}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>DEX: </b>{post.dex}</p>
				</div>
				<div className="col-3 mt-5 ">
					<p className="border px-2 bg-dark text-light rounded"><b>WIS: </b>{post.wis}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>TITLE: </b>{post.title}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>ALIGNMENT: </b>{post.alignment}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>CON: </b>{post.con}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>CHA: </b>{post.cha}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>BACKGROUND: </b>{post.background}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>DEITY: </b>{post.deity}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>HP: </b>{post.hp}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>AC: </b>{post.ac}</p>
				</div>	
				<div className="col-3 mt-5 ">	
					<div className="border px-2 bg-dark text-light rounded">
						<p><b>ATTACKS</b></p>
						<p>{post.attack1}</p>
						<p>{post.attack2}</p>
						<p>{post.attack3}</p>
						<p>{post.attack4}</p>
					</div>	
					<p className="border mt-5 px-2 bg-dark text-light rounded"><b>GP: </b>{post.gp}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>SP: </b>{post.sp}</p>
					<p className="border px-2 bg-dark text-light rounded"><b>CP: </b>{post.cp}</p>

				</div>
				<div className="col-3 mt-5 ">
					<div className="border px-2 bg-dark text-light rounded">
						<p><b>TALENTS</b></p>
						<p>{post.talent1}</p>
						<p>{post.talent2}</p>
						<p>{post.talent3}</p>
						<p>{post.talent4}</p>
						<p>{post.talent5}</p>
						<p>{post.talent6}</p>
						<p>{post.talent7}</p>
						<p>{post.talent8}</p>
					</div>
				</div>
				<div className="col-3 mt-5 ">
					<div className="border px-2 bg-dark text-light rounded">
						<p><b>SPELLS</b></p>
						<p>{post.spell1}</p>
						<p>{post.spell2}</p>
						<p>{post.spell3}</p>
						<p>{post.spell4}</p>
						<p>{post.spell5}</p>
						<p>{post.spell6}</p>
						<p>{post.spell7}</p>
						<p>{post.spell8}</p>
						<p>{post.spell9}</p>
						<p>{post.spell10}</p>
						<p>{post.spell11}</p>
						<p>{post.spell12}</p>
						<p>{post.spell13}</p>
						<p>{post.spell14}</p>
						<p>{post.spell15}</p>
						<p>{post.spell16}</p>
					</div>
				</div>
				<div className="col-3 mt-5 ">	
					<div className="border px-2 bg-dark text-light rounded">
						<p><b>GEAR</b></p>
						<p>{post.gear1}</p>
						<p>{post.gear2}</p>
						<p>{post.gear3}</p>
						<p>{post.gear4}</p>
						<p>{post.gear5}</p>
						<p>{post.gear6}</p>
						<p>{post.gear7}</p>
						<p>{post.gear8}</p>
						<p>{post.gear9}</p>
						<p>{post.gear10}</p>
						<p>{post.gear11}</p>
						<p>{post.gear12}</p>
						<p>{post.gear13}</p>
						<p>{post.gear14}</p>
						<p>{post.gear15}</p>
						<p>{post.gear16}</p>
						<p>{post.gear17}</p>
						<p>{post.gear18}</p>
						<p>{post.gear19}</p>
						<p>{post.gear20}</p>
					</div>
				</div>
				
				<div className="mt-5">
					<h2 className="text-light">Add a comment</h2>
					<form action={'/api/comment/createComment/' + post._id} method="POST" onSubmit={handleAddComment}>
						<div className="mb-3">
							{/* <label htmlFor="text" className="form-label">Comment</label> */}
							<textarea className="form-control bg-dark text-light" id="text" name="text"></textarea>
						</div>
						<button type="submit" className="btn btn-dark" value="Upload">Submit</button>
					</form>
				</div>
				<ul>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							depth={0}

							postId={post._id}
							userId={user._id}
							deleteComment={deleteComment}
							updateComment={updateComment}
							addComment={addComment}
						/>
					))}
				</ul>
				{/* <div className="col-3 my-5">
					<Link className="btn btn-dark mx-1 " to={`/profile/` + user.userName}>Return to Profile</Link>
					<Link className="btn btn-dark" to="/feed">Return to Feed</Link>
				</div> */}
			</div>
		</div>
	)
}