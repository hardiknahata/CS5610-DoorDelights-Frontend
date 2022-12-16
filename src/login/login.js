import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import useForm from "../hooks/forms";
import {loginAction} from "../redux/actions/authActions";

export default function Login() {

    const {loading, serverError, errors, signUpSuccess} = useSelector((state) => state.UI);
    const dispatch = useDispatch();
    const history = useHistory();

    const loginHandle = (props) => {
        const userData = {
            email: inputs.email, password: inputs.password,
        };
        dispatch(loginAction(userData, history));
    };

    const {inputs, handleInputChange, handleSubmit} = useForm({
        email: "", password: "",
    }, loginHandle);

    let incorrectCredentialsError = null;
    let verifyEmailError = null;
    if (errors) {
        if (errors.includes("Invalid email/password")) incorrectCredentialsError = errors;
        if (errors.includes("Verify your email")) verifyEmailError = errors;
    }

    return (<form>
            <div className="row justify-content-center">
                <div className="col-auto ms-2">
                    <h3 className="mt-2">
                        Login
                    </h3>
                    <form noValidate onSubmit={handleSubmit}>
                        {signUpSuccess && (<h5 variant="body2">
                                Account registered successfully! Please Login Now!
                            </h5>)}
                        <input
                            id="email"
                            name="email"
                            label="Email"
                            className={"mb-4 form-control"}
                            onChange={handleInputChange}
                            value={inputs.email}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className="form-control"
                            onChange={handleInputChange}
                            value={inputs.password}
                        />
                        {serverError && (<span className="text-danger">
                                {"server error, please try again"}
                            </span>)}
                        {verifyEmailError && (<span className="text-danger">
                                {verifyEmailError}
                            </span>)}
                        {incorrectCredentialsError && (<span className="text-danger">
                                {incorrectCredentialsError}
                            </span>)}
                        <br/>
                        <button className="mt-1" style={{backgroundColor: "#5cdb95", marginLeft: "33%"}}>
                            Login
                            {loading && (<CircularProgress size={20}/>)}
                        </button>
                        <br/>
                        <br/>
                        <small>
                            Don't have an account? <Link style={{color: "blue"}} to="/register"> Sign Up</Link>
                        </small>
                    </form>
                </div>
            </div>

        </form>);
}
