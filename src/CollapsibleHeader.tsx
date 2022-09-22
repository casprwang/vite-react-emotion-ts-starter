import React, { useState, memo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getData } from "./getData";
import { Subheader } from "./Subheader";
// import { CollapsibleHeader } from "./CollapsibleHeader";
import { getColumnDefs, getTableData } from "./Table/hooks/useColumns";
import AutoSizer from "react-virtualized-auto-sizer";

export const CollapsibleHeader = memo(({ isCollapsed }) => {
  return (
    <div
      css={{
        height: 40,
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
          isCollapsed && {
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
          isCollapsed && {
            transform: `translateY(${-25}px)`,
          },
          {
            visibility: isCollapsed ? "visible" : "hidden",
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
        <span>Technology </span>
      </h1>
    </div>
  );
}, isEqual);
