import React, { useState } from "react";

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
  filterKey?: keyof T; // NEW
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
  filterKey,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({
    key: null,
    dir: null,
  });

  const [filterText, setFilterText] = useState("");

  // 1. Filtering
  const filtered = filterKey && filterText
    ? data.filter((row) =>
        String(row[filterKey])
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
    : data;

  // 2. Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;

    const av = a[sort.key];
    const bv = b[sort.key];

    if (typeof av === "number" && typeof bv === "number") {
      return sort.dir === "asc" ? av - bv : bv - av;
    }

    return sort.dir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  if (sorted.length === 0) return <p>{emptyMessage}</p>;

  return (
    <div>
      {/* Search Input */}
      {filterKey && (
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder={`Filter by ${String(filterKey)}...`}
            value={filterText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterText(e.target.value)
            }
            style={{
              padding: "6px 10px",
              borderRadius: 4,
              border: "1px solid #D1D5DB",
              width: 220,
            }}
          />
        </div>
      )}

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
    </div>
  );
}

export default DataTable;