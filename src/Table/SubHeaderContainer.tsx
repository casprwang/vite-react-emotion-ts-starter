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

export const SubHeaderContainer = memo(
  ({ width, children }: { width: number; children?: React.ReactNode }) => {
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
  },
  isEqual
);
