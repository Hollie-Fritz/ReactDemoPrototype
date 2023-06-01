import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";
import moment from "moment";

function Info(props){
    const {resdata, averageRating} = props.data;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (resdata.openingHours && resdata.closingHours) {
        const now = moment(); // current time
        const openingTime = moment(resdata.openingHours, "HH:mm");
        const closingTime = moment(resdata.closingHours, "HH:mm");
        setIsOpen(now.isBetween(openingTime, closingTime));
      }
    }, [resdata]);

return(   
    <>     
    {/* restaurant address */}
    <Card.Text>
    <nobr className="fw-bold">Address: </nobr>
        {resdata["address1"]} {resdata["address2"]},{" "}
        {resdata["city"]}, {resdata["state"]}{" "}
        {resdata["zipCode"]}
    </Card.Text>
    {/* restaurant phone number */}
    <Card.Text>
        <nobr className="fw-bold">Phone: </nobr>
        {resdata["phone"]}
    </Card.Text>
    {/* restaurant hours */}
    <Card.Text>
        <nobr className="fw-bold">Hours: </nobr>
        {resdata["openHours"]} - {resdata["closeHours"]}
    </Card.Text>
    <Card.Text>
        {isOpen ? "We are currently open!" : "We are currently closed."}
    </Card.Text>

    {/* cuisine type */}
    <Card.Text>
        <nobr className="fw-bold">Cuisine Type: </nobr>
        {resdata["cuisine"]}
    </Card.Text>
    <Card.Text>
        <div style={{ display: "flex", alignItems: "center" }}>
            <span className="fw-bold">Rating: </span>
            <AverageRating averageRating={averageRating} />
        </div>
    </Card.Text></>
)
}

export default Info;