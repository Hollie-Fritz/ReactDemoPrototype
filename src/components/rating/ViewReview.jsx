import React from 'react'
import  { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";


const ViewReview = (resName, show, handleClose) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${resName}`;
          const response = await fetch(url);
          const data = await response.json();
          setReviews(data);
          console.log(JSON.stringify(data));
        };
        fetchData();
      }, [resName]);

    return (
        <>
        
        </>
    )
}

export default ViewReview