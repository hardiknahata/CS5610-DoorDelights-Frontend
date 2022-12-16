import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function SimpleExpansionPanel(props) {
    let items;
    let totalPrice = 0;
    if (props.condition === "Orders") {
        items = props.items;
        items.forEach((item) => {
            totalPrice = totalPrice + item.quantity * item.item.price;
        });
    }

    return (<div>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <p>
                        {props.condition === "Orders" && "Order Summary"}
                    </p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                    style={{display: "flex", flexDirection: "column"}}
                >
                    {props.condition === "Orders" && (<>
                            {items.map((item) => {
                                return (<p key={item.item._id}>
                                        <div>
                                            <span>Item: </span>
                                            <span style={{fontWeight: "bold"}}> {item.item.title}</span>
                                            <br/>
                                            <span>Item Price: </span>
                                            <span
                                                style={{fontWeight: "bold"}}>${item.item.price} x {item.quantity}</span>
                                        </div>
                                    </p>);
                            })}
                            <p>
                                <span>Total: </span>
                                <span style={{fontWeight: "bold"}}>${totalPrice}</span>
                            </p>
                        </>)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>);
}
