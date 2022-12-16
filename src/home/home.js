import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import HomeStart from "../components/HomeStart";
import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";
import DDFeatures from "../components/dd-features";


const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
    position: "absolute",
  },
  SearchBar: {
    // margin: "24px 0 28px 360px",
    position:"absolute",
    bottom:"33%",
    // bottom:"20px",
    left:"33%",
    right:"33%",
    top:"70%",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "",

  },
}));

const Home = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);
  const [locationStatus, setLocationStatus] = useState(
    localStorage.getItem("location") ? true : false
  );

  let restaurantMarkup = loading ? <Spinner /> : <RestaurantContent />;
  return (
      <div className="containerx">
        {(() => {
          if (authenticated && role === "ROLE_SELLER") {
            return (
                <Redirect to="/seller/dashboard" />
            )
          } else if (authenticated && role === "ROLE_ADMIN") {
            return (
                <Redirect to="/admin/dashboard" />
            )
          } else {
            return (
                <>
                <HomeStart />
            <Grid container direction="column">
              <Grid item>
              </Grid>
              <Grid item className={classes.SearchBar}>
                <SearchBar page="home" action={setLocationStatus} />
              </Grid>
              <Grid item container>
                <Grid item xs={false} sm={1} />
                <Grid item xs={12} sm={10}>
                  {locationStatus ? (
                      restaurantMarkup
                  ) : (
                      <Typography variant="body1" className={classes.center} noWrap>
                        Enter your location to view nearby restaurants
                      </Typography>
                      
                  )}
                  <br></br>
                </Grid>
                <Grid item xs={false} sm={1} />
              </Grid>
            </Grid>
            {!authenticated && <DDFeatures />}
                </>
            )
          }
        })()}
      </div>
  );
};

export default Home;
