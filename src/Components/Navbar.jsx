import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from '../Modal';
import Cart from '../Screen/Cart';
import { useCart } from "./ContextReducer";

function Navbar() {

    let data = useCart();

    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic " to="/">AK-Foods</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto mb-2">
                            <li>
                                <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("authToken") &&
                                <li>
                                    <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            }
                        </ul>
                        {!localStorage.getItem("authToken") ? (
                            <div>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                            </div>
                        ) : (
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true); }}>
                                    MY Cart{" "}
                                    <Badge pill bg='danger'> {data?.length || 0} </Badge>
                                </div>

                                {cartView && <Modal onClose={() => { setCartView(false); }}> <Cart /> </Modal>}

                                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
