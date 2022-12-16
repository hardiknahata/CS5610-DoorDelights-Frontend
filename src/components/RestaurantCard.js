import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteRestaurant} from "../redux/actions/dataActions";


export default function RestaurantCard(props) {
    const {
        name,
        tags,
        costForOne,
        minOrderAmount,
        payment,
        imageUrl,
        _id,
    } = props;
    let finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
    const dispatch = useDispatch();
    let restUrl = name.split(" ");
    restUrl = restUrl.join("-").toLowerCase();
    let paymentString;

    if (payment.length === 1)
        paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

    if (payment.length === 2)
        paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;
    const {
        account: {role},
        authenticated,
    } = useSelector((state) => state.auth);
    const handleDelete = () => {
        console.log("shreya id:", _id);
        dispatch(deleteRestaurant(_id));
    };
    return (
        <div className="card">
            <div className="card-body">
                <img className="card-img-top" src={finalImageUrl} height="120px" width="80px" alt={"image not found"}/>
                <h5 className="card-title font-weight-bold mb-3">{name}</h5>
                <p className="card-text mt-2">
                    <div className="font-weight-bold">{tags}</div>
                    <div>Costs ${costForOne} for one</div>
                    <div>Minimum order ${minOrderAmount}</div>
                    <div>{paymentString}</div>
                    {authenticated && role === "ROLE_ADMIN" ?
                        (<button className="btn btn-primary rounded-pill mt-3" onClick={handleDelete}>
                            Delete
                        </button>) : (<Link
                            to={{
                                pathname: `order/${restUrl}`,
                                state: {
                                    restId: _id,
                                },
                            }}
                        >
                            <button className="btn btn-primary rounded-pill mt-3 btn-dark"
                                    style={{backgroundColor: "#5cdb95", color: "black",}}>
                                Order now
                            </button>
                        </Link>)
                    }
                </p>
            </div>
        </div>
    );
}
