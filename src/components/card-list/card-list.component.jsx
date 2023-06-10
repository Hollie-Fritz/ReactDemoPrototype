import React, { useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import Card from "../card/card.component";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "./card-list.styles.css";

const CardList = ({ restaurants }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    //previous button
    paginationItems.push(
      <Pagination.Item
        key="prev"
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <GrFormPrevious />
      </Pagination.Item>
    );

    //page 1
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </Pagination.Item>
    );

    //page 2 or ...
    if (currentPage > 4) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-previous" />);
    } else {
      paginationItems.push(
        <Pagination.Item
          key={2}
          active={currentPage === 2}
          onClick={() => handlePageChange(2)}
        >
          {2}
        </Pagination.Item>
      );
    }

    //fix page 2 not displaying
    //curr page if > 2 and < last page
    if (currentPage > 2 && currentPage < totalPages) {
      paginationItems.push(
        <Pagination.Item
          key={currentPage}
          active
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </Pagination.Item>
      );
    }

    //page after curr page and ellipsis
    if (currentPage < totalPages - 3) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-next" />);
    } else if (currentPage < totalPages - 1) {
      for (let i = currentPage + 1; i < totalPages; i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    //last page
    if (totalPages > 1) {
      paginationItems.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    //next button
    paginationItems.push(
      <Pagination.Item
        key="next"
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <GrFormNext />
      </Pagination.Item>
    );

    return paginationItems;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Container fluid>
          <Row xs={2} md={3} lg={4}>
            {currentItems.map((restaurant) => (
              <Card key={restaurant.userId} restaurant={restaurant} />
            ))}
          </Row>
        </Container>
        <br />
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </>
  );
};

export default CardList;
