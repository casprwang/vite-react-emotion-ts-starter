import React, { useState, memo, useMemo, useRef, useCallback } from "react";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getSortedRowModel,
  Row,
  Cell,
  SortingState,
  useReactTable,
  Header,
} from "@tanstack/react-table";
import isEqual from "lodash/isEqual";

export const HeaderRow = memo(
  ({ header, onSort }: { header: Header<any, any> }) => {
    return (
      <th
        key={header.id}
        colSpan={header.colSpan}
        style={{
          width: header.getSize(),
          userSelect: "none",
        }}
        onClick={(e) => onSort(e, header)}
      >
        <div
          style={{
            float: header.column.columnDef.meta?.alignRight ? "right" : "none",
          }}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: " ▲",
            desc: " ▼",
          }[header.column.getIsSorted() as string] ?? null}
        </div>
      </th>
    );
  },
  isEqual
);
