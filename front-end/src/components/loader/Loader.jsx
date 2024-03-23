import React from "react";
import { DNA } from "react-loader-spinner";
import "./Loader.css";

const Loader = (props) => {
  return (
    <div className="loader-main">
      {props.load == true ? (
        <div className="dna">
          <DNA
            visible={true}
            height="70"
            width="70"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loader;
