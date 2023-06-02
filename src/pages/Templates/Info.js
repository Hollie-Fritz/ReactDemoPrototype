import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";
import moment from "moment-timezone";

function Info(props) {
  const { resdata, averageRating } = props.data;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIsOpen = () => {
      if (resdata.openHours && resdata.closeHours) {
        const now = moment().tz("America/Los_Angeles");
        let openingTime = moment.tz(
          `${now.format("YYYY-MM-DD")} ${resdata.openHours}`,
          "YYYY-MM-DD hh:mm A",
          "America/Los_Angeles"
        );
        let closingTime = moment.tz(
          `${now.format("YYYY-MM-DD")} ${resdata.closeHours}`,
          "YYYY-MM-DD hh:mm A",
          "America/Los_Angeles"
        );

        console.log("Now:", now.format("hh:mm A")); // This will log the current time
        console.log("Opening Time:", openingTime.format("hh:mm A")); // This will log the opening time
        console.log("Closing Time:", closingTime.format("hh:mm A")); // This will log the closing time

        if (closingTime.isBefore(openingTime)) {
          closingTime = closingTime.add(1, "days");
        }

        setIsOpen(now.isBetween(openingTime, closingTime, undefined, "[]"));
      }
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
