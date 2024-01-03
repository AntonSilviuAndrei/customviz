/* eslint-disable class-methods-use-this */
import * as React from "react";
import { Root, hydrateRoot } from "react-dom/client";
import "./styles.css";

import {
  Looker,
  VisConfig,
  VisData,
  VisOptions,
  VisQueryResponse,
  VisUpdateDetails,
  VisualizationDefinition,
  VisualizationError,
} from "@/types";
import { App } from "@/components/App";

// Global values provided via the API
declare const looker: Looker;

interface UKITableVisualisation extends VisualizationDefinition {
  element?: HTMLElement;
  chart?: Root;
}

class Visualisation implements UKITableVisualisation {
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  public id = "uki-finance-table";
  public label = "UKI Finance Table";
  public options: VisOptions = {
    headings: {
      type: "boolean",
      label: "Show Headings",
      order: 1,
      default: true,
    },
    totalLabel: {
      type: "string",
      label: "Total Label",
      order: 2,
      default: "Total",
    },
  };

  // Instance variables
  public element: HTMLElement;
  public chart: Root;

  // Stubs for sandboxed Looker methods

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public addError(_error: VisualizationError) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public clearErrors(_errorName?: string) {}

  // Set up the initial state of the visualization
  public create(element: HTMLElement, config: VisConfig) {
    console.log("create");
    console.log({ element, config, options: this.options });

    // Create a container element.
    const container = element.appendChild(document.createElement("div"));

    // Create an element to contain the data.
    this.element = container.appendChild(document.createElement("div"));

    // Render to the target element
    this.chart = hydrateRoot(this.element, <App config={config} />);
  }

  // Render in response to the data or settings changing
  public updateAsync(
    data: VisData,
    _element: HTMLElement,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    _details: VisUpdateDetails | undefined,
    done: () => void,
  ) {
    // Clear any errors from previous updates
    this.clearErrors();

    console.log("update");
    console.log({
      data,
      _element,
      config,
      queryResponse,
      _details,
      options: this.options,
    });

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length === 0) {
      this.addError({
        title: "No Dimensions",
        message: "This chart requires dimensions.",
      });
      return;
    }

    // Finally update the state with our new data
    this.chart = hydrateRoot(
      this.element,
      <App response={queryResponse} data={data} config={config} />,
    );

    done();
  }
}

looker.plugins.visualizations.add(new Visualisation());
