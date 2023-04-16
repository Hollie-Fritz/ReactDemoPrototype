import React from "react";
import { Card, ListGroup} from "react-bootstrap";
import "../components/Grid.css";
import "../pages/About.css";
import NavBarHome from "../components/NavBarHome";

const Contact = () => {
  const cardInfo = [
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/009/384/545/original/kitty-cat-clipart-design-illustration-free-png.png",
      name: "Hollie Fritz",
      position: "Program Manager and Front-End Developer of NuOrder since 2022",
      email: "hollie.fritz@bellevuecollege.edu",
      github: "https://github.com/Hollie-Fritz",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/009/354/797/small/kitty-cat-clipart-design-illustration-free-png.png",
      name: "Giang Ngo",
      position: "Front-End Developer of NuOrder since 2022",
      email: "giang.ngo@bellevuecollege.edu",
      github: "https://github.com/gnngo",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/009/380/316/small_2x/kitty-cat-clipart-design-illustration-free-png.png",
      name: "Nao Mai",
      position: "Full-Stack Developer of NuOrder since 2022",
      email: "nao.mai@belllevuecollege.edu",
      github: "https://github.com/kylemai96",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/009/383/800/small/kitty-cat-clipart-design-illustration-free-png.png",
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
            Email: <Card.Link href="#"> {card.email}</Card.Link>
          </ListGroup.Item>
          <ListGroup.Item style={{ textAlign: "center" }}>
            Github: <Card.Link href="#">{card.github}</Card.Link>
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
