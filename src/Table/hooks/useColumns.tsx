import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import chartSvg from "../chart.svg";
import { cols } from "../../getData";

import zipWith from "lodash/zipWith";
import shuffle from "lodash/shuffle";
import response from "../../payload.json";

type ColumnData = {
  id: string;
  alignment: string;
  pollable: boolean;
  component: any;
};

type RowItem = {
  component: {
    text: string;
  };
};

type RowData = {
  instrument_id: string;
  items: RowItem[];
};

const columnHelper = createColumnHelper<RowData>();

const columns: ColumnData[] = zipWith(
  response.columns,
  response.rows[0].items,
  (col1, col2) => ({
    ...col1,
    ...col2,
  })
);

const colIndexMap: { [key: string]: number } = response.columns.reduce(
  (prev, curr, currIdx) => {
    return {
      ...prev,
      [curr.id]: currIdx,
    };
  },
  {}
);

export const getColumnDefs = () => {
  const colDefs = [];
  for (const col of columns) {
    colDefs.push(
      columnHelper.accessor(
        (row) => {
          return row.items[colIndexMap[col.id]].component.text;
        },
        {
          id: col.id,
          cell: (info) => {
            return <div>{info.getValue()}</div>;
          },
          size: 200,
        }
      )
    );
  }
  return colDefs;
};

export const getTableData = () => {
  return shuffle(response.rows.slice(1));
};
