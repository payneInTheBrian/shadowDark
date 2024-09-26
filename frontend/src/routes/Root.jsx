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
    <>
      <header className="container">
        <div className="text-center">
          <h1 className="text-dark"><Link className="text-dark" to={user ? '/profile/' + user.userName : '/'}>Shadow Dark</Link></h1>
          
          <span>Character Creation App</span>
        </div>
      </header>
			<Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}
