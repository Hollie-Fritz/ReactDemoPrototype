import React from "react";

function GoogleMap(props) {
    const frameRef = props.data;

    return(
        <>
      {/* Google Maps card display */}
      <div style={{ overflow: "hidden", position: "relative", padding: "40%", height: "200px",width: "500px"}}>
        <iframe
          ref={frameRef}
          id="abc"
          title="Google Map"
          width="100%"
          height="400px"
          frameBorder="0"
          style={{
            border: "0",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
      </div>
      </>   
  )
}
  export default GoogleMap;