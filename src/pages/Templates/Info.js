import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";
import moment from "moment-timezone"

function Info(props){
    const {resdata, averageRating} = props.data;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

    
        let openingTime, closingTime;
    
        if (resdata.openHours && resdata.closeHours) {
          openingTime = moment.tz(resdata.openHours, "hh:mm A", 'America/Los_Angeles');
          closingTime = moment.tz(resdata.closeHours, "hh:mm A", 'America/Los_Angeles');
    
          if (closingTime.isBefore(openingTime)) {
            closingTime = closingTime.add(1, 'days');
          }
        }
    
        const checkIsOpen = () => {
          const now = moment().tz('America/Los_Angeles'); // Move the `now` constant here
    
          console.log('Now:', now.format("hh:mm A")); // This will log the current time
          console.log('Opening Time:', openingTime.format("hh:mm A")); // This will log the opening time
          console.log('Closing Time:', closingTime.format("hh:mm A")); // This will log the closing time
    
          return now.isBetween(openingTime, closingTime, undefined, '[]');
        };

        setIsOpen(checkIsOpen());
        
        const interval = setInterval(() => setIsOpen(checkIsOpen()), 60000);
        return () => clearInterval(interval);
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