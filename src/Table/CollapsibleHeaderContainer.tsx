import React, {
  useState,
  forwardRef,
  useEffect,
  memo,
  useMemo,
  useRef,
  useCallback,
} from "react";
import isEqual from "lodash/isEqual";

import { css, jsx } from "@emotion/react";

export const CollapsibleHeaderContainer = memo(
  ({ width, children }: { width: number; children?: React.ReactNode }) => {
    if (!children) return null;
    return (
      <caption
        style={{
          textAlign: "left",
          position: "sticky",
          top: 0,
          left: 0,
          background: "white",
          zIndex: 2,
          width,
        }}
      >
        {children}
      </caption>
    );
  },
  isEqual
);
