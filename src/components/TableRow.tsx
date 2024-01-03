import React from "react";

import { Row } from "@/types";

interface IProps {
  row: Row;
}

export const TableRow: React.FC<IProps> = ({ row }) => {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      {Object.entries(row).map(([key, entry]) => {
        const additionalClasses = [];

        if (key.includes("%")) {
          additionalClasses.push(
            entry.value > 0
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold",
          );
        }

        return (
          <td
            key={entry.value}
            className={`px-6 py-4 text-center ${additionalClasses.join(" ")}`}
          >
            {`${entry.value}${key.includes("%") ? "%" : ""}`}
          </td>
        );
      })}
    </tr>
  );
};
