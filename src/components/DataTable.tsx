import React, { useState } from "react";

// 1. Column definition is generic
interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

type SortDir = "asc" | "desc" | null;

interface SortState<T> {
  key: keyof T | null;
  dir: SortDir;
}

function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  onRowClick,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({
    key: null,
    dir: null,
  });

  // Toggle sorting
  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  // Sort copy of data (never mutate original)
  const sorted = [...data].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;

    const av = a[sort.key];
    const bv = b[sort.key];

    // Handle numbers and strings safely
    if (typeof av === "number" && typeof bv === "number") {
      return sort.dir === "asc" ? av - bv : bv - av;
    }

    return sort.dir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  if (data.length === 0) return <p>{emptyMessage}</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#1E3A8A", color: "#fff" }}>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
              style={{
                padding: 8,
                textAlign: "left",
                cursor: col.sortable ? "pointer" : "default",
                userSelect: "none",
              }}
            >
              {col.header}

              {/* Sort indicator */}
              {col.sortable &&
                (sort.key === col.key
                  ? sort.dir === "asc"
                    ? " ▲"
                    : " ▼"
                  : " ⇅")}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sorted.map((row, ri) => (
          <tr
            key={String(row[rowKey])}
            onClick={() => onRowClick?.(row)}
            style={{
              background: ri % 2 === 0 ? "#fff" : "#F8FAFC",
              cursor: onRowClick ? "pointer" : "default",
            }}
          >
            {columns.map((col) => (
              <td key={String(col.key)} style={{ padding: 8 }}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;