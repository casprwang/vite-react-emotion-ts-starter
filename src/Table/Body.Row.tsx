import React, { useState, memo, useMemo, useRef, useCallback } from "react";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  Cell,
  SortingState,
  useReactTable,
  Header,
} from "@tanstack/react-table";
import isEqual from "lodash/isEqual";

export const BodyRow = memo(({ row }: { row: Row<any> }) => {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell: Cell<any, any>) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}, isEqual);
