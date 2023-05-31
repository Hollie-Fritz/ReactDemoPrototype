import React, { useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import Card from "../card/card.component";

const CardList = ({ restaurants }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    // Previous button
    paginationItems.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // Ellipsis for indicating previous or continuing results
    if (currentPage > 3) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-previous" />);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1 ||
        i === totalPages
      ) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    // Ellipsis for indicating next or continuing results
    if (currentPage < totalPages - 2) {
      paginationItems.push(<Pagination.Ellipsis key="ellipsis-next" />);
    }

    // Next button
    paginationItems.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return paginationItems;
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
