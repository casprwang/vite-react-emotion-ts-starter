import React, { useState, memo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";
// import { Subheader } from "./Subheader";
// import { CollapsibleHeader } from "./CollapsibleHeader";
import { getColumnDefs, getTableData } from "./Table/hooks/useColumns";
import AutoSizer from "react-virtualized-auto-sizer";

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
        fontWeight: 400,
      }}
    >
      The future is now. See companies researching and developing the technology
      we use in our daily lives, including electronics, software, computers, and
      information technology.
    </p>
  );
}, isEqual);
