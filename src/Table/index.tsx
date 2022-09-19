import React, {
  useState,
  forwardRef,
  useEffect,
  memo,
  useMemo,
  useRef,
  useCallback,
} from "react";

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
import {
  useColumns,
  useIsComponentVisible,
  useIsComponentStuckTop,
} from "./hooks";

const COLUMN_HEIGHT = 44;
const ROW_HEIGTH = 72;
const BANNER_HEIGHT = 191;

const SubHeader = ({ width, children }) => {
  // non sticky non collapsible component
  if (!children) return null;
  return (
    <caption
      style={{
        position: "sticky",
        left: 0,
        width,
      }}
    >
      {children}
    </caption>
  );
};

const CollapsibleHeader = ({ width, children }) => {
  if (!children) return null;
  return (
    <caption
      style={{
        textAlign: "left",
        position: "sticky",
        top: 0,
        left: 0,
        background: "white",
        height: 40,
        zIndex: 5,
        width,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {children}
    </caption>
  );
};

const Banner = memo(
  forwardRef(({ width, height }: {}, ref) => {
    return (
      <caption
        ref={ref}
        style={{
          width,
          position: "sticky",
          height,
          left: 0,
          background: "rgb(43, 148, 246)",
        }}
      >
        <img
          style={{
            height: BANNER_HEIGHT,
          }}
          role="presentation"
          src="https://cdn.robinhood.com/app_assets/list_illustrations/technology/header_web/1x.png"
        />
      </caption>
    );
  }),
  isEqual
);

export const Table = ({
  data,
  update,
  subheaderRenderer,
  collapsibleHeaderRenderer,
}) => {
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

  const bannerRef = useRef(null);
  const isBannerStuck = useIsComponentStuckTop(bannerRef, tableContainerRef);
  return (
    <div ref={tableContainerRef} className="container">
      <table>
        <Banner width="78vw" height={BANNER_HEIGHT} ref={bannerRef} />
        <CollapsibleHeader width="78vw">
          {collapsibleHeaderRenderer?.(isBannerStuck)}
        </CollapsibleHeader>
        <SubHeader width="78vw">{subheaderRenderer()}</SubHeader>
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
