import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>


            <div className="container">
                <h1 className="my-5" >Footer</h1>
                <footer className="row row-cols-5 py-5 my-5 border-top">
                    <div className="col">

                        <p className="text-muted">© 2024 AK-Foods , INC</p>
                    </div>

                    <div className="col">

                    </div>

                    <div className="col">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;
