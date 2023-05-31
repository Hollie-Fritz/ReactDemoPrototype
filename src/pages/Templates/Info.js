import React from "react";
import { Card } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";

function Info(props){
    const {resdata, averageRating} = props.data;
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