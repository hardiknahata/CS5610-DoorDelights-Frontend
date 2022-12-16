import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {getUserData} from "../redux/actions/authActions";

const Profile = () => {
    const dispatch = useDispatch();
    let userRole;
    let userFirstName;
    let userLastName;
    const {
        authenticated, account: {role, email}, firstName, lastName, name, formattedAddress, address,
    } = useSelector((state) => state.auth);
    if (role === "ROLE_USER") {
        userRole = "User";
        userFirstName = firstName;
        userLastName = lastName;
    } else if (role === "ROLE_SELLER") {
        userRole = "Seller";
        userFirstName = name;
    } else if (role === "ROLE_ADMIN") {
        userRole = "Admin";
        userFirstName = firstName;
        userLastName = lastName;
    } else {
        userRole = "User does not have an account"
        userLastName = "Doe";
        userFirstName = "Jane";
    }
    useEffect(() => {
        console.log("in useEffect cart");
        dispatch(getUserData());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <>
            <div className="row mt-2 ml-4 mb-4">
                <h3 className="ms-2 ">
                    Profile
                </h3>
            </div>

            <div className="row mt-2 ml-4">
                <div className="col-2">
                    {authenticated && role === "ROLE_SELLER" && <span className="me-3">Restaurant Name:</span>}

                    {authenticated && role === "ROLE_USER" && <span className="me-3">First Name:</span>}
                    {authenticated && role === "ROLE_ADMIN" && <span className="me-3">First Name:</span>}
                    {!authenticated && <span className="me-3">First Name:</span>}
                </div>
                <div className="col-4">
                    <input value={userFirstName}
                           className="form-control border-0" readOnly/>
                </div>
            </div>
            {role !== "ROLE_SELLER" && <div className="row mt-2 ml-4">
                <div className="col-2">
                    <span className="me-3">Last Name:</span>
                </div>
                <div className="col-4">
                    <input value={userLastName}
                           className="form-control border-0" readOnly/>
                </div>
            </div>}
            {authenticated && <div className="row mt-2 ml-4">
                <div className="col-2">
                    <span className="me-3">Email: </span>
                </div>
                <div className="col-4">
                    <input value={email}
                           className="form-control border-0" readOnly/>
                </div>
            </div>}
            {address && authenticated && <div className="row mt-2 ml-4">
                <div className="col-2">
                    <span className="me-3">Address: </span>
                </div>
                <div className="col-4">
                    <input value={formattedAddress}
                           className="form-control border-0" readOnly/>
                </div>
            </div>}
            <div className="row mt-2 ml-4">
                <div className="col-2">
                    <span className="me-3">Role: </span>
                </div>
                <div className="col-4">
                    <input value={userRole}
                           className="form-control border-0" readOnly/>
                </div>
            </div>
            {authenticated && <div className="row mt-5 ml-4">
                <Link to="/edit-profile"
                      className="float-end btn btn-outline-dark rounded-pill fw-bold">Edit profile</Link>
            </div>}

        </>);
};
export default Profile;