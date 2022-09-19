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

const columnHelper = createColumnHelper();

export const ALIGN_RIGHT_COLS = [
  "52-Week Low",
  "52-Week High",
  "Price",
  "Today % Change",
  "Today’s Volume",
  "Market Cap",
  "Relative Volume",
];

export const useColumns = () =>
  useMemo(() => {
    const ret = [];
    for (const col of cols) {
      if (col.id === "Sparkline") {
        ret.push(
          columnHelper.accessor(col.id, {
            cell: (info) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={chartSvg} className="logo react" alt="React logo" />
              </div>
            ),
            size: 200,
            enableResizing: true,
          })
        );
      } else if (ALIGN_RIGHT_COLS.includes(col.id)) {
        ret.push(
          columnHelper.accessor(col.id, {
            cell: (info) => (
              <div style={{ float: "right" }}>{info.getValue()}</div>
            ),
            size: col.width,
            meta: {
              alignRight: true,
            },
          })
        );
      } else {
        ret.push(
          columnHelper.accessor(col.id, {
            cell: (info) => info.getValue(),
            size: col.width,
          })
        );
      }
    }
    return ret;
  }, []);
