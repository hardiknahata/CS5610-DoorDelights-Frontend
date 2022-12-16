import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import openSocket from "socket.io-client";

import {getOrders, socketStatusUpdate} from "../redux/actions/dataActions";
import OrderCard from "../components/OrderCard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadThis,
    para: {
        fontSize: "x-large",
        marginLeft: "32%",
    },
    title: {
        margin: "10px 0px 10px 130px",
        display: "inline-block",
        marginRight: "40%",
    },
}));

const Orders = (props) => {
    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.data);
    const {
        account: {role},
        _id,
    } = useSelector((state) => state.auth);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getOrders());
        const socket = openSocket(process.env.REACT_APP_SERVER_URL);
        socket.emit("add-user", {userId: _id});
        socket.on("orders", (data) => {
            if (data.action === "update") {
                dispatch(socketStatusUpdate(data.order));
            }
            if (data.action === "create") {
                dispatch(getOrders());
                dispatch(getOrders());
            }
        });
    }, []);

    return (
        <>
            <h2 className="text-center mt-5 mb-5">
                Order History
            </h2>
            <div className="row" style={{margin: "10px"}}>
                {orders ? (
                    orders.length > 0 ? (
                        orders.map((order) => (
                            <div className="col mr-1 mb-3" key={order._id}>
                                <OrderCard order={order} role={role}/>
                            </div>
                        ))
                    ) : (
                        <p className={classes.para}>No Orders present.</p>
                    )
                ) : null}
            </div>
        </>
    );
};

export default Orders;
