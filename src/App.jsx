import { useState } from "react";
import "./App.css";
import Login from "./Screen/Login";
import Home from "./Screen/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from "./Screen/Signup.jsx";
import { CartProvider } from "./Components/ContextReducer.jsx"; // Ensure correct import
import MyOrder from "./Screen/MyOrder.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <CartProvider>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/createuser" element={<Signup />} />
                    <Route path="/myOrder" element={<MyOrder />} />
                </Routes>
            </Router>
        
        </CartProvider>
    );
}

export default App;
