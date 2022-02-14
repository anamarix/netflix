import React from "react";
import "./Overview.css";

function Overview(props) {

  return (

    <div className="overview-container">
      <div className="overview-box">
        {props.render()}
      </div>
    </div>
  );
}

export default Overview;
