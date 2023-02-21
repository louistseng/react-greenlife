import React from 'react';
import { css } from "@emotion/core";
// import PuffLoader from "react-spinners/PuffLoader";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;


export default function InitailLoader({loading}) {

    return (
        <div className="initail-loading">
            <HashLoader
                css={override}
                size={80}
                color={"#5cc777"}
                loading={loading}
            />
        </div>
    )


}
