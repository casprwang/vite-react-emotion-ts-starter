import React, { useState, memo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";
import { Subheader } from "./Subheader";
import { CollapsibleHeader } from "./CollapsibleHeader";
import { getColumnDefs, getTableData } from "./Table/hooks/useColumns";
import AutoSizer from "react-virtualized-auto-sizer";

export default function App() {
  const [data, setData] = useState(getTableData());
  return (
    <div
      css={{
        width: "78vw",
      }}
    >
      <div
        style={{
          height: "calc(98vh - 50px)",
          position: "absolute",
          left: "1vw",
          border: "1px solid lightgray",
          width: "18vw",
        }}
      ></div>
      <AutoSizer disableHeight>
        {({ width }) => {
          return (
            <Table
              columns={getColumnDefs()}
              width={width}
              data={data}
              update={() => {
                setData(getTableData());
              }}
              subheaderRenderer={() => <Subheader />}
              collapsibleHeaderRenderer={(isCollapsed) => (
                <CollapsibleHeader isCollapsed={isCollapsed} />
              )}
            />
          );
        }}
      </AutoSizer>
      ,
      <br />
    </div>
  );
}
