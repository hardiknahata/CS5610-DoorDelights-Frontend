import React from "react";
import {useSelector} from "react-redux";
import logo from "../images/door-delights-logo-v2.png";

export default function Footer() {
    const {
        authenticated,
    } = useSelector((state) => state.auth);

    return (
        <div className="container-fluid p-0 mb-0 pb-0" style={{position: "absolute"}}>

            <footer className="text-center text-lg-start text-white" style={{backgroundColor: "#1c2331"}}>

                <section className="mt-10">
                    <div className="container text-center text-md-start mt-5">

                        <div className="row">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 mt-5">

                                <img src={logo} alt="doordelights" style={{width: "230px"}}/>
                                <p className="mt-5">
                                    We deliver delicious food from your favorite restaurants right at your doorstep.
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 mt-5">

                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px", backgroundColor: "#5cdb95", height: "2px"}}
                                />
                                {!authenticated &&
                                    <p>
                                        <a href="/addRestaurant" className="text-white">Add Restaurant</a>
                                    </p>
                                }
                                <p>
                                    <a href="/login" className="text-white">Login</a>
                                </p>
                                <p>
                                    <a href="/register" className="text-white">Sign Up</a>
                                </p>
                                <p>
                                    <a href="/search" className="text-white">Search</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 mt-5">

                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px", backgroundColor: "#5cdb95", height: "2px"}}
                                />
                                <p><i className="fas fa-home mr-3"></i> Boston, MA 02115, US</p>
                                <p><i className="fas fa-envelope mr-3"></i> contact@doordelights.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-3"
                    style={{backgroundCcolor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2022 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/"> DoorDelights </a>
                </div>
            </footer>
        </div>
    );
}
