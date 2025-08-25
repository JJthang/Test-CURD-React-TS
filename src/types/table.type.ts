import React from "react";

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  className?: string;
  truncate?: boolean;
  type?: "text" | "date" | "number";
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface ifSortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

export interface CommonTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  searchTerm?: string;
  emptyMessage?: string;
}
