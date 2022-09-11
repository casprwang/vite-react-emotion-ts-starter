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
import {
  useVirtualizer,
  Virtualizer,
  useWindowVirtualizer,
} from "@tanstack/react-virtual";
import isEqual from "lodash/isEqual";
import { HeaderRow } from "./HeaderRow";
import { BodyRow } from "./Body.Row";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import "./styles.css";
import { useColumns } from "./hooks";

const COLUMN_HEIGHT = 44;
const ROW_HEIGTH = 72;

export const Table = ({ data, update }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columns = useColumns();
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "Symbol",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    state: {
      sorting,
    },
    manualSorting: true,
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    overscan: 3,
    getScrollElement: useCallback(
      () => tableContainerRef.current,
      [tableContainerRef.current]
    ),
    estimateSize: useCallback(
      () => (rows.length * ROW_HEIGTH + COLUMN_HEIGHT) / (rows.length + 1),
      [rows]
    ),
  });

  const [virtualRows, totalSize] = useMemo(
    () => [rowVirtualizer.getVirtualItems(), rowVirtualizer.getTotalSize()],
    [rowVirtualizer.getVirtualItems(), rowVirtualizer.getTotalSize()]
  );
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  const handleSort = useCallback(
    (e, header) => {
      e.preventDefault();
      const nextOrder = header.column.getNextSortingOrder();
      setSorting(
        nextOrder
          ? [
              {
                desc: nextOrder === "desc",
                id: header.id,
              },
            ]
          : []
      );
      update();
    },
    [sorting, setSorting, update]
  );

  return (
    <div ref={tableContainerRef} className="container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  <HeaderRow header={header} onSort={handleSort} />
                </React.Fragment>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              <BodyRow row={rows[virtualRow.index]} />
            </React.Fragment>
          ))}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
