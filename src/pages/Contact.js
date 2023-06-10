import React from "react";
import { Card, ListGroup} from "react-bootstrap";
import "../components/Grid.css";
import "../pages/About.css";
import NavBarHome from "../components/NavBarHome";

const Contact = () => {
  const cardInfo = [
    {
      image:
        "https://nuorderbucket.s3.us-west-2.amazonaws.com/Hollie.png",
      name: "Hollie Fritz",
      position: "Program Manager and Front-End Developer of NuOrder since 2022",
      email: "hollie.fritz@bellevuecollege.edu",
      github: "https://github.com/Hollie-Fritz",
    },
    {
      image:
        "https://nuorderbucket.s3.us-west-2.amazonaws.com/Giang.png",
      name: "Giang Ngo",
      position: "Front-End Developer of NuOrder since 2022",
      email: "giang.ngo@bellevuecollege.edu",
      github: "https://github.com/gnngo",
    },
    {
      image:
        "https://nuorderbucket.s3.us-west-2.amazonaws.com/Kyle.png",
      name: "Kyle Mai",
      position: "Full-Stack Developer of NuOrder since 2022",
      email: "nao.mai@belllevuecollege.edu",
      github: "https://github.com/kylemai96",
    },
    {
      image:
        "https://nuorderbucket.s3.us-west-2.amazonaws.com/Jona.png",
      name: "Jonida Durbaku",
      position: "Front-End Developer of NuOrder since 2022",
      email: "jonida.durbaku@belllevuecollege.edu",
      github: "https://github.com/jonida19",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "18rem" }} className="box" key={index}>
        <Card.Img
          variant="top"
          src={card.image}
          className="avatar d-block mx-auto img-fluid wd-30"
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{card.name}</Card.Title>
          <Card.Text style={{ textAlign: "center" }}>{card.position}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{ textAlign: "center" }}>
            Email: <Card.Link href={`mailto:${card.email}`}> {card.email}</Card.Link>
          </ListGroup.Item>
          <ListGroup.Item style={{ textAlign: "center" }}>
          Github:{" "}
            <Card.Link href={card.github} target="_blank" rel="noopener noreferrer">
              {card.github}
            </Card.Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (
    <>
     <NavBarHome/>
      <div className="grid">{cardInfo.map(renderCard)}</div>
    </>
  );
};

export default Contact;
