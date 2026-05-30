import { useMemo } from "react";

export function usePaginationRange(
  pageIndex: number,
  pageCount: number,
  delta = 1
) {
  return useMemo(() => {
    const range: (number | "ellipsis")[] = [];
    if (pageCount <= 1) return range;

    const left = Math.max(1, pageIndex - delta);
    const right = Math.min(pageCount - 2, pageIndex + delta);

    range.push(0);
    if (left > 1) range.push("ellipsis");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < pageCount - 2) range.push("ellipsis");
    range.push(pageCount - 1);

    return range;
  }, [pageIndex, pageCount, delta]);
}
