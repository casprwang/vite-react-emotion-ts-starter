import React, { useState, memo } from "react";
import { Table } from "./Table";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";

const Subheader = memo(() => {
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

const CollapsibleHeader = memo(({ isCollapsed }) => {
  return (
    <>
      <h1
        css={[
          {
            paddingLeft: 20,
            margin: 0,
            fontWeight: 500,
            transition: "transform 300ms",
          },
          isCollapsed && {
            transform: `translateY(-${70}px)`,
          },
        ]}
      >
        Technology
      </h1>
      <h1
        css={[
          {
            margin: 0,
            paddingLeft: 20,
            fontWeight: 500,
            transition: "transform 300ms",
            transform: `translateY(${70}px)`,
          },
          isCollapsed && {
            transform: `translateY(${-25}px)`,
          },
          {
            visibility: isCollapsed ? "visible" : "hidden",
          },
          {
            display: "flex",
            gap: 10,
          },
        ]}
      >
        <span>
          <img
            css={{
              height: 29,
              borderRadius: 5,
            }}
            src="https://cdn.robinhood.com/app_assets/list_illustrations/technology/portrait_48/1x.png"
          />
        </span>
        <span>Technology </span>
      </h1>
    </>
  );
}, isEqual);

export default function App() {
  const [data, setData] = useState(getData());
  return (
    <div>
      <div
        style={{
          height: "calc(98vh - 50px)",
          position: "absolute",
          left: "1vw",
          border: "1px solid lightgray",
          width: "18vw",
        }}
      ></div>
      <Table
        data={data}
        update={() => setData(getData())}
        subheaderRenderer={() => <Subheader />}
        collapsibleHeaderRenderer={(isCollapsed) => (
          <CollapsibleHeader isCollapsed={isCollapsed} />
        )}
      />
      <br />
      table size: {data.length} x {Object.keys(data[0]).length}
    </div>
  );
}
