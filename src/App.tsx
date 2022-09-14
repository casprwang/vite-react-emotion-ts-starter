import React, { useState } from "react";
import { Table } from "./Table";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";

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
      <Table data={data} update={() => setData(getData())} />
      <br />
      table size: {data.length} x {Object.keys(data[0]).length}
    </div>
  );
}
