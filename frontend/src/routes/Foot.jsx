import { Link } from "react-router-dom"

const Foot = () => {
  return (
    <div className="text-light rounded mt-5">
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link className="nav-link px-2 text-purple fw-bold" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-purple fw-bold" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-purple fw-bold" to="/signup">Signup</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-purple fw-bold" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-purple fw-bold" to="/feed">Feed</Link></li>
                <li className="nav-item"><Link to="/logout" className="nav-link px-2 text-purple fw-bold">Logout</Link></li>
                
            </ul>
            <h5 className="text-center text-light">&copy; 2024 Cloud City LLC</h5>
        </footer>
    </div>
  )
}

export default Foot