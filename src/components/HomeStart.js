import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import cover from "../images/food-banner.jpeg";

const useStyles = makeStyles((theme) => ({
    presentation: {
        margin: "auto",
        minHeight: "80vh",
        alignItems: "center",
        ["@media (max-width:1024px)"]: {
            flexDirection: "column",
        },
    },
    introduction: {
        flex: 1,
        paddingLeft: 60,
        height: "340px",
    },
    tagline: {
        position: "absolute",
        bottom: "33%",
        // bottom:"20px",
        left: "33%",
        right: "33%",
        fontSize: 40,
        textAlign: "center",
        fontWeight: "bold",
        color: "",
        marginBottom: 50,

    },
    delivery: {
        color: "#157a21",
        fontSize: 64,
        fontWeight: "bold",
        marginTop: -30,
        marginBottom: 20,
    },
    paragraph: {
        width: 400,
        fontSize: 14.5,
    },
    cover: {
        // flex: 1,
        // display: "flex",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        justifyContent: "center",
        height: "72vh",
        width: "100%",
    },
    coverImg: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    ctaOrder: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#05386B",
        marginTop: 30,
    },
}));

const HomeStart = () => {
    const classes = useStyles();
    return (
        <section className={classes.presentation}>
            <div className={classes.cover}>
                <img src={cover} alt="safe-delivery" className={classes.coverImg}/>
                <p className={classes.tagline}>
                    Delivering Delights at your Doorstep!
                </p>
            </div>
        </section>
    )
};

export default React.memo(HomeStart);
