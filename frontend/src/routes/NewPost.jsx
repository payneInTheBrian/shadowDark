import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API_BASE } from "../constants";

export function NewPost() {
	const { user: loggedInUser, setUser: setLoggedInUser, setMessages } = useOutletContext();
	const userIdOrName = useParams().userIdOrName;
	const navigate = useNavigate();

	const [user, setUser] = useState();
	const [posts, setPosts] = useState([]);
	

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
		navigate(-1);
	};

	// const handleClick = () => {
	// 	this.="text-purple"
	// }
	


	return (
		<div className="container">
			
			
				
			
					
						
						<form action="/api/post/createPost" encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>   
							
							<div className="row text-light mx-5 my-4 d-flex justify-content-center"> 
							<h2 className="text-center">Create a new character</h2>
							<div className="mb-3 ">
								<label htmlFor="imgUpload purple" className="form-label">Media</label>
								<input type="file" className="form-control purple" id="imageUpload" name="file" />
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label text-light">Name</label>
								<input type="text" className="form-control purple " id="name" name="name" />
							</div>
							
							<div className="mb-3">
								<label htmlFor="ancestry" className="form-label text-light">Ancestry</label>
								<input type="text" className="form-control purple" id="ancestry" name="ancestry"/>
							</div>
							<div className="mb-3">
								<label htmlFor="str" className="form-label text-light">Str</label>
								<input type="text" className="form-control purple" id="str" name="str"/>
							</div>
							<div className="mb-3">
								<label htmlFor="int" className="form-label text-light">Int</label>
								<input type="text" className="form-control purple" id="int" name="int"/>
							</div>
							<div className="mb-3">
								<label htmlFor="class" className="form-label text-light">Class</label>
								<input type="text" className="form-control purple" id="class" name="class"/>
							</div>
							<div className="mb-3">
								<label htmlFor="level" className="form-label text-light">Level</label>
								<input type="text" className="form-control purple" id="level" name="level"/>
							</div>
							<div className="mb-3">
								<label htmlFor="xp" className="form-label text-light">XP</label>
								<input type="text" className="form-control purple" id="xp" name="xp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="maxXp" className="form-label text-light">Max XP</label>
								<input type="text" className="form-control purple" id="maxXp" name="maxXp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="dex" className="form-label text-light">Dex</label>
								<input type="text" className="form-control purple" id="dex" name="dex"/>
							</div>
							<div className="mb-3">
								<label htmlFor="wis" className="form-label text-light">Wis</label>
								<input type="text" className="form-control purple" id="wis" name="wis"/>
							</div>
							<div className="mb-3">
								<label htmlFor="title" className="form-label text-light">Title</label>
								<input type="text" className="form-control purple" id="title" name="title"/>
							</div>
							<div className="mb-3">
								<label htmlFor="alignment" className="form-label text-light">Alignment</label>
								<input type="text" className="form-control purple" id="alignment" name="alignment"/>
							</div>
							<div className="mb-3">
								<label htmlFor="con" className="form-label text-light">Con</label>
								<input type="text" className="form-control purple" id="con" name="con"/>
							</div>
							<div className="mb-3">
								<label htmlFor="cha" className="form-label text-light">Cha</label>
								<input type="text" className="form-control purple" id="cha" name="cha"/>
							</div>
							<div className="mb-3">
								<label htmlFor="background" className="form-label text-light">Background</label>
								<input type="text" className="form-control purple" id="background" name="background"/>
							</div>
							<div className="mb-3">
								<label htmlFor="deity" className="form-label text-light">Deity</label>
								<input type="text" className="form-control purple" id="deity" name="deity"/>
							</div>
							<div className="mb-3">
								<label htmlFor="hp" className="form-label text-light">Hp</label>
								<input type="text" className="form-control purple" id="hp" name="hp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="maxHp" className="form-label text-light">Max Hp</label>
								<input type="text" className="form-control purple" id="maxHp" name="maxHp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="ac" className="form-label text-light">AC</label>
								<input type="text" className="form-control purple" id="ac" name="ac"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack1" className="form-label text-light">Attack 1</label>
								<input type="text" className="form-control purple" id="attack1" name="attack1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack2" className="form-label text-light">Attack 2</label>
								<input type="text" className="form-control purple" id="attack2" name="attack2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack3" className="form-label text-light">Attack 3</label>
								<input type="text" className="form-control purple" id="attack3" name="attack3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="attack4" className="form-label text-light">Attack 4</label>
								<input type="text" className="form-control purple" id="attack4" name="attack4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent1" className="form-label text-light">Talent 1</label>
								<input type="text" className="form-control purple" id="talent1" name="talent1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent2" className="form-label text-light">Talent 2</label>
								<input type="text" className="form-control purple" id="talent2" name="talent2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent3" className="form-label text-light">Talent 3</label>
								<input type="text" className="form-control purple" id="talent3" name="talent3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent4" className="form-label text-light">Talent 4</label>
								<input type="text" className="form-control purple" id="talent4" name="talent4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent5" className="form-label text-light">Talent 5</label>
								<input type="text" className="form-control purple" id="talent5" name="talent5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent6" className="form-label text-light">Talent 6</label>
								<input type="text" className="form-control purple" id="talent6" name="talent6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent7" className="form-label text-light">Talent 7</label>
								<input type="text" className="form-control purple" id="talent7" name="talent7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="talent8" className="form-label text-light">Talent 8</label>
								<input type="text" className="form-control purple" id="talent8" name="talent8"/>
							</div>
                
							<div className="mb-3">
								<label htmlFor="spell1" className="form-label text-light">Spell 1</label>
								<input type="text" className="form-control purple" id="spell1" name="spell1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell2" className="form-label text-light">Spell 2</label>
								<input type="text" className="form-control purple" id="spell2" name="spell2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell3" className="form-label text-light">Spell 3</label>
								<input type="text" className="form-control purple" id="spell3" name="spell3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell4" className="form-label text-light">Spell 4</label>
								<input type="text" className="form-control purple" id="spell4" name="spell4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell5" className="form-label text-light">Spell 5</label>
								<input type="text" className="form-control purple" id="spell5" name="spell5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell6" className="form-label text-light">Spell 6</label>
								<input type="text" className="form-control purple" id="spell6" name="spell6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell7" className="form-label text-light">Spell 7</label>
								<input type="text" className="form-control purple" id="spell7" name="spell7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell8" className="form-label text-light">Spell 8</label>
								<input type="text" className="form-control purple" id="spell8" name="spell8"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell9" className="form-label text-light">Spell 9</label>
								<input type="text" className="form-control purple" id="spell9" name="spell9"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell10" className="form-label text-light">Spell 10</label>
								<input type="text" className="form-control purple" id="spell10" name="spell10"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell11" className="form-label text-light">Spell 11</label>
								<input type="text" className="form-control purple" id="spell11" name="spell11"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell12" className="form-label text-light">Spell 12</label>
								<input type="text" className="form-control purple" id="spell12" name="spell12"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell13" className="form-label text-light">Spell 13</label>
								<input type="text" className="form-control purple" id="spell13" name="spell13"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell14" className="form-label text-light">Spell 14</label>
								<input type="text" className="form-control purple" id="spell14" name="spell14"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell15" className="form-label text-light">Spell 15</label>
								<input type="text" className="form-control purple" id="spell15" name="spell15"/>
							</div>
							<div className="mb-3">
								<label htmlFor="spell16" className="form-label text-light">Spell 16</label>
								<input type="text" className="form-control purple" id="spell16" name="spell16"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear1" className="form-label text-light">Gear 1</label>
								<input type="text" className="form-control purple" id="gear1" name="gear1"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear2" className="form-label text-light">Gear 2</label>
								<input type="text" className="form-control purple" id="gear2" name="gear2"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear3" className="form-label text-light">Gear 3</label>
								<input type="text" className="form-control purple" id="gear3" name="gear3"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear4" className="form-label text-light">Gear 4</label>
								<input type="text" className="form-control purple" id="gear4" name="gear4"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear5" className="form-label text-light">Gear 5</label>
								<input type="text" className="form-control purple" id="gear5" name="gear5"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear6" className="form-label text-light">Gear 6</label>
								<input type="text" className="form-control purple" id="gear6" name="gear6"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear7" className="form-label text-light">Gear 7</label>
								<input type="text" className="form-control purple" id="gear7" name="gear7"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear8" className="form-label text-light">Gear 8</label>
								<input type="text" className="form-control purple" id="gear8" name="gear8"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear9" className="form-label text-light">Gear 9</label>
								<input type="text" className="form-control purple" id="gear9" name="gear9"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear10" className="form-label text-light">Gear 10</label>
								<input type="text" className="form-control purple" id="gear10" name="gear10"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear11" className="form-label text-light">Gear 11</label>
								<input type="text" className="form-control purple" id="gear11" name="gear11"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear12" className="form-label text-light">Gear 12</label>
								<input type="text" className="form-control purple" id="gear12" name="gear12"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear13" className="form-label text-light">Gear 13</label>
								<input type="text" className="form-control purple" id="gear13" name="gear13"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear14" className="form-label text-light">Gear 14</label>
								<input type="text" className="form-control purple" id="gear14" name="gear14"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear15" className="form-label text-light">Gear 15</label>
								<input type="text" className="form-control purple" id="gear15" name="gear15"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear165" className="form-label text-light">Gear 16</label>
								<input type="text" className="form-control purple" id="gear165" name="gear165"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear17" className="form-label text-light">Gear 17</label>
								<input type="text" className="form-control purple" id="gear17" name="gear17"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear18" className="form-label text-light">Gear 18</label>
								<input type="text" className="form-control purple" id="gear18" name="gear18"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear19" className="form-label text-light">Gear 19</label>
								<input type="text" className="form-control purple" id="gear19" name="gear19"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gear20" className="form-label text-light">Gear 20</label>
								<input type="text" className="form-control purple" id="gear20" name="gear20"/>
							</div>
							<div className="mb-3">
								<label htmlFor="gp" className="form-label text-light">Gp</label>
								<input type="text" className="form-control purple" id="gp" name="gp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="sp" className="form-label text-light">Sp</label>
								<input type="text" className="form-control purple" id="sp" name="sp"/>
							</div>
							<div className="mb-3">
								<label htmlFor="cp" className="form-label text-light">Cp</label>
								<input type="text" className="form-control purple" id="cp" name="cp"/>
							</div>

							<button type="submit" className="btn my-5 purple-btn col-3 text-center fw-bold" value="Upload">Submit</button>
                            </div>
                        </form>
					
				
				
					
			
		</div>
	)
}