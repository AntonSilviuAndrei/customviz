import React from "react";

import { TableHead } from "@/components/TableHead";
import { TableRow } from "@/components/TableRow";
import { VisData } from "@/types";

interface IProps {
  headingsEnabled: boolean;
  headings: string[];
  rows: VisData;
}

export const Table: React.FC<IProps> = ({
  headings,
  rows,
  headingsEnabled = true,
}) => {
  return (
    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-gray-50 mb-2">
      {headingsEnabled && <TableHead headings={headings} />}
      <tbody>
        {rows.map((row, idx) => (
          <TableRow key={idx} row={row} />
        ))}
      </tbody>
    </table>
  );
};
