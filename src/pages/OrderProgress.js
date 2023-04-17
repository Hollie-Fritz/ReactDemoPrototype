import React from "react";
import { ProgressBar } from "react-bootstrap";

const OrderProgress = ({ stage }) => {
  const getVariant = () => {
    switch (stage) {
      case "Order placed":
        return "info";
      case "Preparing":
        return "warning";
      case "Ready":
        return "success";
      default:
        return "info";
    }
  };

  const getNow = () => {
    switch (stage) {
      case "Order placed":
        return 33;
      case "Preparing":
        return 66;
      case "Ready":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <ProgressBar
      now={getNow()}
      label={stage}
      variant={getVariant()}
      animated
      striped
    />
  );
};

export default OrderProgress;
