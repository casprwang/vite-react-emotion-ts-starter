import React, {
  useState,
  useEffect,
  memo,
  useMemo,
  useRef,
  useCallback,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";

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
    overscan: 10,
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
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef();
  useEffect(() => {
    const listener = () => {
      if (
        headerRef.current?.getBoundingClientRect().top -
          tableContainerRef.current?.getBoundingClientRect().top ===
        1
      ) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };
    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener("scroll", listener);
    }
    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.removeEventListener("scroll", listener);
      }
    };
  }, [tableContainerRef]);

  return (
    <div ref={tableContainerRef} className="container">
      <table>
        <caption
          style={{
            width: "78vw",
            position: "sticky",
            height: 191,
            left: 0,
            background: "rgb(43, 148, 246)",
          }}
        >
          <img
            style={{
              height: 191,
              // position: "absolute",
              // left: 300,
            }}
            role="presentation"
            src="https://cdn.robinhood.com/app_assets/list_illustrations/technology/header_web/1x.png"
          />
        </caption>
        <caption
          ref={headerRef}
          style={{
            textAlign: "left",
            position: "sticky",
            top: 0,
            left: 0,
            background: "white",
            height: 40,
            zIndex: 5,
            width: "78vw",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <h1
            css={[
              {
                paddingLeft: 20,
                margin: 0,
                fontWeight: 500,
                transition: "transform 300ms",
              },
              isStuck && {
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
              isStuck && {
                transform: `translateY(${-25}px)`,
              },
              {
                visibility: isStuck ? "visible" : "hidden",
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
            <span>Technology</span>
          </h1>
        </caption>
        <caption
          style={{
            position: "sticky",
            left: 0,
            width: 400,
          }}
        >
          <p
            style={{
              width: 800,
              textAlign: "left",
              fontSize: 15,
              lineHeight: "24px",
              paddingLeft: 20,
              marginBottom: 20,
              marginTop: 0,
              overflowWrap: "break-word",
              whiteSpace: "normal",
              wordBreak: "break-all",
              fontWeight: 500,
            }}
          >
            The future is now. See companies researching and developing the
            technology we use in our daily lives, including electronics,
            software, computers, and information technology.
          </p>
        </caption>
        <thead
          style={{
            top: 80,
            position: "sticky",
          }}
        >
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
