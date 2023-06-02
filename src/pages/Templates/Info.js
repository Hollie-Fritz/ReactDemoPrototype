import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";
import moment from "moment-timezone";

function Info(props) {
  const { resdata, averageRating } = props.data;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIsOpen = () => {
      const now = moment().tz("America/Los_Angeles");

      const day = now.format('dddd');

      if((resdata["operatingHours"] && resdata["operatingHours"]["openHours"][day]==="Closed") || (resdata["operatingHours"] && resdata["operatingHours"]["openHours"][day]==="Closed")){
        setIsOpen(false);
        return;
      }

      const startTime = resdata["operatingHours"]["openHours"][day];
      const endTime = resdata["operatingHours"]["closeHours"][day];
      // const startTime = '12:00 AM';
      // const endTime = '12:30 AM';

      var format = 'HH:mm A';

      var convertedNow = moment(now.format('HH:mm A'), format);
      var beforeTime = moment(startTime, format);
      var afterTime = moment(endTime, format);


      // console.log(convertedNow);
      // console.log(convertedNow.isBetween(beforeTime, afterTime));

      setIsOpen(convertedNow.isBetween(beforeTime, afterTime));
    };

    checkIsOpen();
    const interval = setInterval(checkIsOpen, 60000);
    return () => clearInterval(interval);
  }, [resdata]);

  return (
    <>
      {/* restaurant address */}
      <Card.Text>
        <nobr className="fw-bold">Address: </nobr>
        {resdata["address1"]} {resdata["address2"]}, {resdata["city"]},{" "}
        {resdata["state"]} {resdata["zipCode"]}
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
        {console.log('isOpen:', isOpen)} {/* test status */}
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
      </Card.Text>
    </>
  );
}

export default Info;
