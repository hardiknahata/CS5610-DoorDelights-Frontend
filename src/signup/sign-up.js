import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import useForm from "../hooks/forms";
import {signupUser} from "../redux/actions/authActions";

export default function Register() {

    const {loading, serverError, errors} = useSelector((state) => state.UI);
    const dispatch = useDispatch();
    const history = useHistory();

    const signupHandle = (props) => {
        const newUserData = {
            email: inputs.email,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            role: inputs.role,
            password: inputs.password,
            confirmPassword: inputs.confirmPassword,
        };
        console.log("shreya: ", newUserData);
        dispatch(signupUser(newUserData, history));
    };

    const {inputs, handleInputChange, handleSubmit} = useForm({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "",
    }, signupHandle);
    let emailError = null;
    let passwordError = null;
    let confirmPasswordError = null;
    let firstNameEmptyError = null;
    let lastNameEmptyError = null;
    let roleError = null;

    if (errors) {
        if (typeof errors !== "string") {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].msg.includes("First Name")) firstNameEmptyError = errors[i].msg;
                if (errors[i].msg.includes("Last Name")) lastNameEmptyError = errors[i].msg;
                if (errors[i].msg.includes("valid email")) emailError = errors[i].msg;
                if (errors[i].msg.includes("Email address already")) emailError = errors[i].msg;
                if (errors[i].msg.includes("least 6 characters long")) passwordError = errors[i].msg;
                if (errors[i].msg.includes("Passwords have to")) confirmPasswordError = errors[i].msg;
                if (errors[i].msg.includes("Role can not be empty")) roleError = errors[i].msg
            }
        }
        console.log(errors)
    }
    return (<div className="row justify-content-center">
            <div className="col-auto ms-2">
                <h3>
                    Register
                </h3>
                <form noValidate onSubmit={handleSubmit}>
                    <input
                        className="form-control mt-2 mb-2"
                        placeholder="First Name"
                        id="firstName"
                        name="firstName"
                        onChange={handleInputChange}
                        value={inputs.firstName}
                    />
                    {firstNameEmptyError && (<span className="text-danger">
                            {firstNameEmptyError}
                        </span>)}
                    <input
                        className="form-control mt-2 mb-2"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={inputs.lastName}
                    />
                    {lastNameEmptyError && (<span className="text-danger">
                            {lastNameEmptyError}
                        </span>)}
                    <input
                        className="form-control mt-2 mb-2"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={inputs.email}
                    />
                    {emailError && (<span className="text-danger">
                            {emailError}
                        </span>)}
                    <input
                        className="form-control mt-2 mb-2"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={inputs.password}
                    />
                    {passwordError && (<span className="text-danger">
                            {passwordError}
                        </span>)}
                    <input
                        className="form-control mt-2 mb-2"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                        value={inputs.confirmPassword}
                        helperText={passwordError ? passwordError : confirmPasswordError}
                        error={passwordError ? true : confirmPasswordError ? true : false}
                    />
                    {confirmPasswordError && (<span className="text-danger">
                            {confirmPasswordError}
                        </span>)}
                    <div>
                        <label className="mt-2" htmlFor="role">Choose a role:</label>
                        <select id="role" name="role" className="form-control mt-1" value={inputs.role}
                                onChange={handleInputChange}>
                            <option value="">Choose a role</option>
                            <option selected value="ROLE_USER">USER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
                        {roleError && (<span className="text-danger">
                            {roleError}
                        </span>)}
                    </div>
                    {serverError && (<span className="text-danger">
                            {"server error, please try again"}
                        </span>)}

                    <button className="mt-3 mb-2" style={{backgroundColor: "#5cdb95", marginLeft: "33%"}}>
                        Sign-up
                        {loading && (<CircularProgress size={20}/>)}
                    </button>
                    <br/>
                    <small>
                        Already have an account? <Link to="/login">Login</Link>
                    </small>
                </form>
            </div>
        </div>);
}
