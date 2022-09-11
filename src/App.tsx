import React, { useState } from "react";
import { Table } from "./Table";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";

export default function App() {
  const [data, setData] = useState(getData());
  return (
    <div>
      <button
        onClick={() => {
          setData(getData());
        }}
      >
        update
      </button>
      <Table data={data} update={() => setData(getData())} />
    </div>
  );
}
