import React, {
  useState,
  useEffect,
  memo,
  useMemo,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import isEqual from "lodash/isEqual";

export const Banner = memo(
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
            height: 191,
          }}
          role="presentation"
          src="https://cdn.robinhood.com/app_assets/list_illustrations/technology/header_web/1x.png"
        />
      </caption>
    );
  }),
  isEqual
);
