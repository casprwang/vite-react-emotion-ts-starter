import React, { useState, memo } from "react";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export const Subheader = memo(() => {
  return (
    <p
      style={{
        width: 800,
        maxWidth: "100%",
        float: "left",
        textAlign: "left",
        fontSize: 15,
        lineHeight: "24px",
        paddingLeft: 20,
        marginBottom: 20,
        marginTop: 0,
        marginLeft: 0,
        overflowWrap: "break-word",
        whiteSpace: "normal",
        wordBreak: "break-all",
        fontWeight: 500,
      }}
    >
      The future is now. See companies researching and developing the technology
      we use in our daily lives, including electronics, software, computers, and
      information technology.
    </p>
  );
}, isEqual);
