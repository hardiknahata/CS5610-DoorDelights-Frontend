import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import useForm from "../hooks/forms";
import {addToCart, deleteItem, editItem} from "../redux/actions/dataActions";
import ItemDialog from "../components/ItemDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    }, details: {
        display: "flex", flexDirection: "column",
    }, content: {
        flex: "1 0 auto",
    }, cover: {
        height: "180", width: "60%",
    }, snackbar: {
        width: "100%", "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ItemCard(props) {
    const classes = useStyles();
    const {title, imageUrl, description, price, _id} = props;
    const imageUrlSplit = imageUrl.split("\\");
    const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}`; //3002 - server port

    const dispatch = useDispatch();

    const {
        authenticated, account: {role},
    } = useSelector((state) => state.auth);
    const {addCartSuccess} = useSelector((state) => state.data);

    const [open, setOpen] = useState(false);
    const [openSnackBar, setSnackBar] = useState(false);
    const [image, setImage] = useState(null);
    const {inputs, handleInputChange} = useForm({
        title: "", description: "", price: "",
    });

    const handleFileSelect = (event) => {
        setImage(event.target.files[0]);
    };

    const handleClose = () => {
        inputs.title = "";
        inputs.description = "";
        inputs.price = "";
        setImage(null);
        setOpen(false);
    };

    const handleSubmit = () => {
        const itemData = new FormData();
        if (image !== null) itemData.append("image", image); else itemData.append("image", imageUrl);
        itemData.append("title", inputs.title);
        itemData.append("description", inputs.description);
        itemData.append("price", inputs.price);
        dispatch(editItem(itemData, _id)); // eslint-disable-next-line
        handleClose();
    };

    const openEdit = () => {
        inputs.title = title;
        inputs.price = price;
        inputs.description = description;
        setOpen(true);
    };

    const handleDelete = () => {
        dispatch(deleteItem(_id));
    };

    const handleCart = () => {
        const itemData = {
            itemId: _id,
        };
        dispatch(addToCart(itemData));
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            setSnackBar(false);
            return;
        }

        setSnackBar(false);
    };

    const handleSnackBar = (event, reason) => {
        if (addCartSuccess || addCartSuccess == null) setSnackBar(true);
    };

    return (<>
            <div className="col-12">
            <div className="card">
                <div className="card-img">
                    <img src={finalImageUrl} height="184" width="300" alt="Item"/>
                </div>
                <div className="card-body">
                    <p className="font-weight-bold">{title}</p>
                    <p>{description}</p>
                    <p>Price: ${price}</p>
                    {role === "ROLE_SELLER" ? (<div style={{textAlign: "center"}}>
                            <button className="border-0" onClick={openEdit}>
                                <EditIcon style={{color: "green"}}/>
                            </button>
                            <button className="border-0" onClick={handleDelete}>
                                <DeleteIcon style={{color: "#f44336"}}/>
                            </button>
                        </div>) : authenticated ? (<button className="btn btn-primary btn-dark rounded-pill"
                                                           style={{
                                                               backgroundColor: "#5cdb95",
                                                               color: "black",
                                                           }} onClick={() => {
                            handleCart();
                            handleSnackBar();
                        }}>
                            Add to Cart</button>) : (<Link to="/login">
                            <button className="btn btn-primary btn-dark rounded-pill"
                                    color="secondary"
                                    style={{
                                        backgroundColor: "#5cdb95",
                                        color: "black",
                                    }}>Add to Cart
                            </button>
                        </Link>)}
                </div>
                <CardMedia
                    className={classes.cover}
                    image={finalImageUrl}
                    title="Item order"
                />
            </div>
            <ItemDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleFileSelect={handleFileSelect}
                inputs={inputs}
                handleInputChange={handleInputChange}
            />
            <div className={classes.snackbar}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3600}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        style={{backgroundColor: "#157a21"}}
                    >
                        Item added to cart!
                    </Alert>
                </Snackbar>
            </div>
            </div>
        </>);
}
