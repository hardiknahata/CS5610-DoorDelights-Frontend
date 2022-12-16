import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import logo from "../images/door-delights-logo-v2.png";
import {logoutAction} from "../redux/actions/authActions";

export default function AppBarPrimary() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        account: {role}, authenticated, firstName, address,
    } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutAction(history));
    };

    return (<nav className="navbar sticky-top navbar-light bg-light">
            <Link to="/">
                <img src={logo} alt="logo" border="0" height="50%" width="50%"/>
            </Link>
            {authenticated ? (role === "ROLE_SELLER" ? (<div>
                <span className="font-weight-bold ">
                  Seller Dashboard
                </span>
                        <Link to="/">
                            <button className="btn  font-weight-bold">Home</button>
                        </Link>                
                        <Link to="/seller/orders">
                            <button className="btn  font-weight-bold">Orders</button>
                        </Link>
                        <Link to={{pathname: "/profile", state: {address: address}}}>
                            <button className="btn  font-weight-bold">Profile</button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn  font-weight-bold">
                            Logout
                        </button>
                    </div>) : (<div>
                <span className="font-weight-bold ">
                  Hello, {firstName}!
                </span>
                        <Link to="/">
                            <button className="btn  font-weight-bold">Home</button>
                        </Link>
                        {role !== "ROLE_ADMIN" && <>
                            <Link to="/orders">
                                <button className="btn  font-weight-bold">Orders</button>
                            </Link>
                            <Link to={{pathname: "/cart", state: {address: address}}}>
                                <button className="btn  font-weight-bold">Cart</button>
                            </Link>
                        </>}
                        <Link to={{pathname: "/profile", state: {address: address}}}>
                            <button className="btn  font-weight-bold">Profile</button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn  font-weight-bold"
                        >
                            Logout
                        </button>
                    </div>)) : (<div>
                    <nav id="navbar" className="navbar">

                        <ul className="p-1 ">
                            <Link to="/">
                                <button className="btn  font-weight-bold">Home</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn  font-weight-bold">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn  font-weight-bold">Sign Up</button>
                            </Link>
                            <Link to="/profile">
                                <button className="btn  font-weight-bold">Profile</button>
                            </Link>
                            <Link to="/search">
                                <button className="btn  font-weight-bold">Search</button>
                            </Link>
                        </ul>
                    </nav>
                </div>)}
        </nav>);
}
