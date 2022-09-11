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

const columnHelper = createColumnHelper();

export const useColumns = (data) =>
  useMemo(() => {
    const ret = [];
    Object.keys(data[0]).forEach((key) => {
      if (key === "Sparkline") {
        ret.push(
          columnHelper.accessor(key, {
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
      } else {
        ret.push(
          columnHelper.accessor(key, {
            cell: (info) => info.getValue(),
            enableResizing: true,
          })
        );
      }
    });
    return ret;
  }, [data]);
