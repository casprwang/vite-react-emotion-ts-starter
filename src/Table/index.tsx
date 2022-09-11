import React, { useState, useMemo, useRef, useCallback } from "react";

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
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { useVirtual } from "react-virtual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import "./styles.css";
import { useColumns } from "./hooks";

const COLUMN_HEIGHT = 44;
const ROW_HEIGTH = 72;

export const Table = ({ data, update }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columns = useColumns(data);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "Symbol",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
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
    getScrollElement: useCallback(
      () => tableContainerRef.current,
      [tableContainerRef.current]
    ),
    estimateSize: useCallback(
      () => (data.length * ROW_HEIGTH + COLUMN_HEIGHT) / (data.length + 1),
      [data]
    ),
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
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
                <th
                  {...{
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                      userSelect: "none",
                    },
                  }}
                  onClick={(e) => handleSort(e, header)}
                >
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
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
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
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
