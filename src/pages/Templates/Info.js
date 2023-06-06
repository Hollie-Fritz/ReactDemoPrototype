import React, { useEffect, useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import AverageRating from "../../components/rating/AverageRating";
import moment from "moment-timezone";
import styles from "./Template1.module.css";

function Info(props) {
  const { resdata, averageRating } = props.data;
  const [isOpen, setIsOpen] = useState(false);
  const [openHours, setOpenHours] = useState("");
  const [closeHours, setCloseHours] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const checkIsOpen = () => {
      const now = moment().tz("America/Los_Angeles");

      const day = now.format("dddd");

      if (
        (resdata["operatingHours"] &&
          resdata["operatingHours"]["openHours"][day] === "Closed") ||
        (resdata["operatingHours"] &&
          resdata["operatingHours"]["openHours"][day] === "Closed")
      ) {
        setIsOpen(false);
        return;
      }

      const startTime = resdata["operatingHours"]["openHours"][day];
      const endTime = resdata["operatingHours"]["closeHours"][day];
      // const startTime = '12:00 AM';
      // const endTime = '12:30 AM';

      var format = "HH:mm A";

      var convertedNow = moment(now.format("HH:mm A"), format);
      var beforeTime = moment(startTime, format);
      var afterTime = moment(endTime, format);

      // console.log(convertedNow);
      // console.log(convertedNow.isBetween(beforeTime, afterTime));

      setIsOpen(convertedNow.isBetween(beforeTime, afterTime));
      setOpenHours(startTime);
      setCloseHours(endTime);
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
        <nobr className="fw-bold">Today's Hours: </nobr>
        {openHours} - {closeHours}
        <span
          style={{
            marginLeft: "10px",
            color: isOpen ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isOpen ? "We are currently open!" : "We are currently closed."}
        </span>
      </Card.Text>
      <Button 
        onClick={handleOpenModal} 
        variant="light"
        className="fw-bold">
          Operating Hours
          </Button>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Operating Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <nobr className="fw-bold">Monday: </nobr>
            {resdata["operatingHours"]["openHours"]["Monday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Monday"]}
          </p>
          <p>
            <nobr className="fw-bold">Tuesday: </nobr>
            {resdata["operatingHours"]["openHours"]["Tuesday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Tuesday"]}
          </p>
          <p>
            <nobr className="fw-bold">Wednesday: </nobr>
            {resdata["operatingHours"]["openHours"]["Wednesday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Wednesday"]}
          </p>
          <p>
            <nobr className="fw-bold">Thursday: </nobr>
            {resdata["operatingHours"]["openHours"]["Thursday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Thursday"]}
          </p>
          <p>
            <nobr className="fw-bold">Friday: </nobr>
            {resdata["operatingHours"]["openHours"]["Friday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Friday"]}
          </p>
          <p>
            <nobr className="fw-bold">Saturday: </nobr>
            {resdata["operatingHours"]["openHours"]["Saturday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Saturday"]}
          </p>
          <p>
            <nobr className="fw-bold">Sunday: </nobr>
            {resdata["operatingHours"]["openHours"]["Sunday"]} -{" "}
            {resdata["operatingHours"]["closeHours"]["Sunday"]}
          </p>
        </Modal.Body>
      </Modal>
      <br></br>
      <br></br>
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
