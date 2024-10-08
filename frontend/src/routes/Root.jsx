import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Messages from '../components/Messages';
import { API_BASE } from "../constants";

export default function Root({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (user == undefined) fetch(API_BASE + '/api/user', { credentials: "include" })
      .then(res => res.json())
      .then(res => setUser(res.user));
  }, [user]);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMessages({});
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  return (
    <div className="bg-dark">
      <header className="container">
        <div className="text-center">
          <h1 className="text-light"><Link className="text-light" to={user ? '/profile/' + user.userName : '/'}>Shadow Dark</Link></h1>
          
          <h3 className="text-light">Character Creation App</h3>
        </div>
      </header>
      <main className="purple"></main>
			<Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </div>
  );
}
