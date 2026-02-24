import React, { useState, useEffect } from "react";

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
  filterKey?: keyof T;
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
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });
  const [filterText, setFilterText] = useState("");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterText]);

  // 1. Filtering
  const filtered =
    filterKey && filterText
      ? data.filter((row) =>
          String(row[filterKey])
            .toLowerCase()
            .includes(filterText.toLowerCase()),
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

  // 3. Pagination Logic
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sorted.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      {/* Search Input */}
      {filterKey && (
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder={`Filter by ${String(filterKey)}...`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
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
                  padding: 12,
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
          {paginatedData.length > 0 ? (
            paginatedData.map((row, ri) => (
              <tr
                key={String(row[rowKey])}
                onClick={() => onRowClick?.(row)}
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  background: ri % 2 === 0 ? "#fff" : "#F8FAFC",
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} style={{ padding: 12 }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: 20, textAlign: "center" }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <div>
          Showing <b>{startIndex + 1}</b> to{" "}
          <b>{Math.min(startIndex + pageSize, sorted.length)}</b> of{" "}
          <b>{sorted.length}</b> results
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={buttonStyle(currentPage === 1)}
          >
            Previous
          </button>

          <span style={{ margin: "0 8px" }}>
            Page <b>{currentPage}</b> of <b>{totalPages}</b>
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={buttonStyle(currentPage === totalPages)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = (disabled: boolean) => ({
  padding: "6px 12px",
  borderRadius: "4px",
  border: "1px solid #D1D5DB",
  backgroundColor: disabled ? "#F3F4F6" : "#FFF",
  color: disabled ? "#9CA3AF" : "#374151",
  cursor: disabled ? "not-allowed" : "pointer",
});

export default DataTable;
