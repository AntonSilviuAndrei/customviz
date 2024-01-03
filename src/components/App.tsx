import React from "react";

import { Table } from "@/components/Table";
import { VisConfig, VisData, VisQueryResponse } from "@/types";

interface IProps {
  config?: VisConfig;
  data?: VisData;
  response?: VisQueryResponse;
}

export const App: React.FC<IProps> = ({ data, response, config }) => {
  if (!data || !response) {
    return <h1>Loading...</h1>;
  }

  const headings = [
    ...response.fields.dimensions.map(
      (field: { label: string }) => field.label,
    ),
    ...response.fields.measures.map((field: { label: string }) => field.label),
  ];

  const { headings: headingsEnabled } = config;

  return (
    <Table
      headingsEnabled={
        typeof headingsEnabled === "undefined" ? true : headingsEnabled
      }
      headings={headings}
      rows={data}
    />
  );
};
