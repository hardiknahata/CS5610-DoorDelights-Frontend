import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {updateProfile} from "../redux/actions/authActions";

const EditProfile = () => {

    const {
        account: {role},
    } = useSelector((state) => state.auth);
    const initialProfile = useSelector(state => state.auth);
    let [profile, setProfile] = useState(initialProfile);
    const dispatch = useDispatch();
    const updateProfileHandler = () => {
        dispatch(updateProfile({
            ...profile,
            firstName: profile.firstName,
            lastName: profile.lastName,
        }));
    };
    return (
        <>
            <div className="row mt-2 ml-4 mb-4">
                <h3 className="ms-2 ">
                    Profile
                </h3>
            </div>
            <div className="col-7">
                <Link to="/profile" className="btn btn-dark rounded-pill float-end mb-2"
                      onClick={updateProfileHandler}
                > Save </Link>
            </div>
            {role === "ROLE_SELLER" &&
                <div className="row mt-2 ml-4">
                    <div className="col-1">
                        <span className="me-3">Restaurant Name:</span>
                    </div>
                    <div className="col-4">
                        <input value={profile.name}
                               className="form-control "
                               onChange={(event) => setProfile({...profile, name: event.target.value})}/>
                    </div>
                </div>
            }
            {role !== "ROLE_SELLER" &&
                <>
                    <div className="row mt-2 ml-4">
                        <div className="col-1">
                            <span className="me-3">First Name:</span>
                        </div>
                        <div className="col-4">
                            <input value={profile.firstName}
                                   className="form-control"
                                   onChange={(event) => setProfile({...profile, firstName: event.target.value})}/>
                        </div>
                    </div>
                    <div className="row mt-2 ml-4">
                        <div className="col-1">
                            <span className="me-3">Last Name:</span>
                        </div>
                        <div className="col-4">
                            <input value={profile.lastName}
                                   className="form-control "
                                   onChange={(event) => setProfile({...profile, lastName: event.target.value})}/>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default EditProfile;