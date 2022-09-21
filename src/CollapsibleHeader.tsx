import React, { useState, memo } from "react";
import isEqual from "lodash/isEqual";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export const CollapsibleHeader = memo(({ isCollapsed }) => {
  return (
    <>
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
    </>
  );
}, isEqual);
