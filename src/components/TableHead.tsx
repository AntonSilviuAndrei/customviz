import React from "react";

interface IProps {
  headings: string[];
}

export const TableHead: React.FC<IProps> = ({ headings }) => {
  return (
    <thead className="text-gray-700 uppercase bg-gray-50">
      <tr>
        <th
          rowSpan={2}
          className="p-4 bg-blue-950 text-white h-8 text-bold text-center border-2 border-black"
        >
          UKI <br />
          Performance Review
        </th>
        <th
          colSpan={headings.length}
          className="p-4 bg-gray-500 text-white h-8 text-bold text-center border-2 border-black"
        >
          Day
        </th>
      </tr>
      <tr>
        {headings.map((heading) => (
          <th className="text-center border-2 border-black" key={heading}>
            {heading.split(" ").map((part) => (
              <>
                {part}
                <br />
              </>
            ))}
          </th>
        ))}
      </tr>
    </thead>
  );
};
