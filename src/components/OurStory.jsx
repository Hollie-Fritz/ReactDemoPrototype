import React from 'react'
import { Accordion } from 'react-bootstrap'
import "../components/OurStory.css"

const OurStory = () => {

    function handleOnClick(event) {
        console.log('onClick', event);
    }
    return (
        <div>
            <Accordion defaultActiveKey="1">
                <Accordion.Item  className="accr">
                    <Accordion.Header onClick={handleOnClick} className="header-accr">Our Story</Accordion.Header>
                    <Accordion.Body>
                        We offer restaurant owners a website for free to present their own restaurant page
                        on the site as well as take in orders and requests. No prior experience is needed to
                        use NuOrder for creating the restaurant wesite. Templates are available on the
                        application to make your restaurant page unique and eye catching. Also,
                        customers have various options to choose from the list of local restaurant
                        and enjoy their authentic dishes.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <br /><br />
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion defaultActiveKey="1">
                <Accordion.Item className="accr">
                    <Accordion.Header onClick={handleOnClick} className="header-accr">1. What fees will I pay for as a restaurant owner getting
                        access to NuOrder?</Accordion.Header>
                    <Accordion.Body>
                        The use of NuOrder will be completely free.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="1">
                <Accordion.Item className="accr">
                    <Accordion.Header onClick={handleOnClick} className="header-accr">2. What makes NuOrder different from other ordering
                        websites?</Accordion.Header>
                    <Accordion.Body>
                        A restaurant has complete control and choice over
                        over their prices and will not give up a percentage to
                        to be hosted.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="1">
                <Accordion.Item  className="accr">
                    <Accordion.Header onClick={handleOnClick} className="header-accr">3. Will  NuOrder be responsible for customer service
                        for all the restaurants it hosts?</Accordion.Header>
                    <Accordion.Body>
                        No, NuOrder will have the contact for the restaurant
                        but because the application will not be dealing with
                        transactions, it will be the restaurantU+2019s job to issue
                        refunds or other services for the customers.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="1">
                <Accordion.Item className="accr">
                    <Accordion.Header onClick={handleOnClick} className="header-accr">4. Is delivery offered?</Accordion.Header>
                    <Accordion.Body>
                        No, not at this time. A restaurant customer will be able
                        to see if the individual restaurant offers delivery and
                        will be able to contact the restaurant directly using
                        the contact information.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default OurStory
