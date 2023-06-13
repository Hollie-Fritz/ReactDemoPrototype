import React from "react";
import {
  Form,
  FormControl,
  Col,
  Row,
  Container,
  FloatingLabel,
} from "react-bootstrap";

import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <>
    <Container>
      <Form inline="true" onSubmit={(event) =>{event.preventDefault()}}>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <FloatingLabel controlId="floatingName" label={placeholder}>
              <FormControl
                className={`search-box ${className} `}
                type="search"
                placeholder={placeholder}
                onChange={onChangeHandler}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </Container>
  </>
);

export default SearchBox;
