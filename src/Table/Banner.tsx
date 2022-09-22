import React, {
  useState,
  useEffect,
  memo,
  useMemo,
  useRef,
  forwardRef,
  useCallback,
  Ref,
} from "react";
import isEqual from "lodash/isEqual";

const BANNER_HEIGHT = 191;

export const Banner = memo(
  forwardRef(({ width }: { width: number }, ref: Ref<HTMLElement>) => {
    return (
      <caption
        ref={ref}
        style={{
          width,
          position: "sticky",
          height: BANNER_HEIGHT,
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
