import React from "react";
import {useDispatch} from "react-redux";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SummaryExpansion from "./FilterExpansion";
import {changeOrderStatus} from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadThis,
    red: {
        color: "red",
    },
    green: {
        color: "green",
    },
}));

const OrderCard = (props) => {
    const order = props.order;
    const role = props.role;
    const classes = useStyles();
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();

    const handleCancel = () => {
        const body = {
            status: "Cancelled",
        };
        dispatch(changeOrderStatus(order._id, body));
    };

    const handleAccept = () => {
        const body = {
            status: "Accepted",
        };
        dispatch(changeOrderStatus(order._id, body));
    };

    const handleDelivery = () => {
        const body = {
            status: "Out For Delivery",
        };
        dispatch(changeOrderStatus(order._id, body));
    };

    const handleCompleted = () => {
        const body = {
            status: "Completed",
        };
        dispatch(changeOrderStatus(order._id, body));
    };

    return (

        <div className="card text-white" style={{backgroundColor: "#1c2331"}}>
            <div className="card-body">
                <p>
                    OrderId - #{order._id}
                </p>
                <p>
                    {role === "ROLE_USER" && `Ordered From - ${order.seller.name}`}
                    {role === "ROLE_SELLER" &&
                        `Ordered By - ${order.user.name}, +1 ${order.user.address.phoneNo}`}
                </p>
                {role === "ROLE_USER" && (
                    <p>
                        Call - +1 {order.seller.phone}
                    </p>
                )}

                {role === "ROLE_SELLER" && (
                    <p>Address -{" "} {order.user.address.aptName + ", " + order.user.address.locality}</p>
                )}
                <div>
                    <SummaryExpansion condition="Orders" items={order.items}/>
                </div>
                <p className="mt-2">
                    Ordered - {dayjs(order.createdAt).fromNow()}
                </p>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <FiberManualRecordIcon
                        disabled
                        className={
                            order.status === "Cancelled" ? classes.red : classes.green}/>
                    <p>Order {order.status}</p>
                </div>
                {role === "ROLE_USER" && order.status === "Placed" && (
                    <button
                        className="btn btn-primary btn-danger"
                        onClick={handleCancel}
                        disabled={order.status !== "Placed"}>
                        Cancel Order
                    </button>
                )}
                {role === "ROLE_SELLER" && order.status === "Placed" && (
                    <>
                        <div style={{display: "inline-block"}}>
                            <button className="btn btn-primary btn-danger mr-1" onClick={handleCancel}>
                                Cancel Order
                            </button>
                            <button className="btn btn-primary " style={{backgroundColor: "green"}}
                                    onClick={handleAccept}>
                                Accept Order
                            </button>
                        </div>
                    </>
                )}
                {role === "ROLE_SELLER" && order.status === "Accepted" && (
                    <button className="btn btn-primary " style={{backgroundColor: "green"}} onClick={handleDelivery}>
                        Out For Delivery
                    </button>
                )}
                {role === "ROLE_SELLER" && order.status === "Out For Delivery" && (
                    <button className="btn btn-primary " style={{backgroundColor: "green"}} onClick={handleCompleted}>
                        Order Completed
                    </button>
                )}
                <br/>
            </div>
        </div>

    );
};

export default OrderCard;
