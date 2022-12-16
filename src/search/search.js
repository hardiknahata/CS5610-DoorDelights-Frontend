import {Redirect} from "react-router-dom";
import React, {useState} from "react";
import {useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import GoogleRestaurantContent from "../components/GoogleRestaurantContent";


const useStyles = makeStyles(() => ({
    center: {
        textAlign: "center",
        position: "absolute",
    },
    SearchBar2: {
        margin: "auto",
        width: "50%",
        padding: 15,
        position: "relative",
        fontSize: 40,
        fontWeight: 400,
        textAlign: "center",
        color: "",

    },
}));


export default function Search() {
    const classes = useStyles();
    const {loading} = useSelector((state) => state.data);
    const {
        account: {role},
        authenticated,
    } = useSelector((state) => state.auth);
    const [locationStatus, setLocationStatus] = useState(
        localStorage.getItem("location") ? true : false
    );

    let restaurantMarkup = loading ? <Spinner/> : <GoogleRestaurantContent/>;
    return (
        <>
            {authenticated && role === "ROLE_SELLER" ? (
                <Redirect to="/seller/dashboard"/>
            ) : (
                <>
                    <Grid container direction="column">
                        <Grid item className={classes.SearchBar2}>
                            <SearchBar page="search" action={setLocationStatus}/>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={false} sm={1}/>
                            <Grid item xs={12} sm={10}>
                                {locationStatus ? (
                                    restaurantMarkup
                                ) : (
                                    <Typography variant="body1" className={classes.center} noWrap>
                                        Enter your location to view nearby restaurants
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={false} sm={1}/>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
