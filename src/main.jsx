import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-cell";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-header";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-list-item-group";
import "@esri/calcite-components/dist/components/calcite-popover";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-chip-group";
import "@esri/calcite-components/dist/components/calcite-dialog";
import "./main.css";

setAssetPath(location.href);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <calcite-dialog modal heading="Map fields" open className="map-fields-modal">
      <TestComponent />
    </calcite-dialog>
  </React.StrictMode>
);

function TestComponent() {
  // calcite-table internal table-container now adds an overflow: auto style
  // when popover is opened it overflows.  Even if the table has a large fixed height,
  // the table still internally scrolls.
  // If I add more TableRows, the overflow is not added and scrolling is ok
  // Alternative, render using createPortal outside of the table
  const [fieldSelectRef, setFieldSelectRef] = useState(null);
  return (
  <div className="map-fields__content">
    <div className="map-fields__content-main">
      <calcite-table>
        <calcite-table-row>
          <calcite-table-header heading="Heading 1"></calcite-table-header>
        </calcite-table-row>
        {/* Try with just 3 rows and then uncomment all rows.
            Make sure `Last incompatible field` is visible at end of popover.
            */}
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        {/* <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} />
        <TableRow  onFieldSelect={setFieldSelectRef} /> */}
      </calcite-table>
      { /* No difference if outside of table, more complicated to change in MapFieldsModal */}
      {/* {fieldSelectRef &&
      createPortal(
        <calcite-popover
        referenceElement={fieldSelectRef}
        oncalcitePopoverClose={() => setFieldSelectRef(null)}
        flipDisabled
        placement="bottom"
        label="my label"
        offsetDistance={1}
        className="map-fields__popover"
        open
        pointerDisabled
        triggerDisabled
        autoClose
      >
        <div
          style={{
            overflow: "auto",
            //width: `${fieldSelectRef.getBoundingClientRect().width}px`,
            width: "350px",
            maxHeight: "350px",
          }}
        >
          <calcite-list
            label="field list"
            selectionMode="single"
            selectionAppearance="border"
            filterEnabled
            filterPlaceholder="Type in here"
            // https://github.com/Esri/calcite-design-system/issues/7545
            style={{ overflow: "auto" }}
          >
            <calcite-list-item-group
              heading="Compatible fields"
            >
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Last compatible field" ></calcite-list-item>
            </calcite-list-item-group>
            <calcite-list-item-group
              heading="Incompatible fields"
              disabled={true}
            >
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Description 1" ></calcite-list-item>
              <calcite-list-item
              label="one" 
              description="Last incompatible field" ></calcite-list-item>
            </calcite-list-item-group>
          </calcite-list>
        </div>
      </calcite-popover>,
        fieldSelectRef.parentElement,
      )} */}
    </div>
  </div>
  );
}

function TableRow({ onFieldSelect }) {
  const [fieldSelectRef, setFieldSelectRef] = useState(null);
  return (
    <calcite-table-row>
      <calcite-table-cell>
        <calcite-list>
          <calcite-list-item 
            label="one" 
            description="Description 1" 
            oncalciteListItemSelect={(event) => {
              setFieldSelectRef(event.currentTarget);
              onFieldSelect(event.currentTarget);
            }}
          >
          </calcite-list-item>
        </calcite-list>
        {/* Current code which used to work */}
        {/* When there is only a few rows scrolling is strange
            calcite-table  internally sets div.table-container overflow: auto 
            If I turn this off manually in the container, popover 
            displays correctly in all cases */}
        {fieldSelectRef &&
            <calcite-popover
            referenceElement={fieldSelectRef}
            oncalcitePopoverClose={() => setFieldSelectRef(null)}
            flipDisabled // required for design not to flip
            // Setting this fixes small number of rows, but breaks large number of rows
            // overlayPositioning="fixed"
            placement="bottom"
            label="my label"
            offsetDistance={1}
            //className="map-fields__popover"
            open
            pointerDisabled
            triggerDisabled
            autoClose
          >
            <div
              style={{
                overflow: "auto",
                //width: `${fieldSelectRef.getBoundingClientRect().width}px`,
                width: "350px",
                maxHeight: "350px",
              }}
            >
              <calcite-list
                label="field list"
                selectionMode="single"
                selectionAppearance="border"
                filterEnabled
                filterPlaceholder="Type in here"
                // https://github.com/Esri/calcite-design-system/issues/7545
                style={{ overflow: "auto" }}
              >
                <calcite-list-item-group
                  heading="Compatible fields"
                >
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Last compatible field" ></calcite-list-item>
                </calcite-list-item-group>
                <calcite-list-item-group
                  heading="Incompatible fields"
                  disabled={true}
                >
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Last incompatible field" ></calcite-list-item>
                </calcite-list-item-group>
              </calcite-list>
            </div>
          </calcite-popover>}
      </calcite-table-cell>
      { /* Tried to move popover outside of table cell, but still problems */}
      {/* {fieldSelectRef &&
          createPortal(
            <calcite-popover
            referenceElement={fieldSelectRef}
            oncalcitePopoverClose={() => setFieldSelectRef(null)}
            flipDisabled
            placement="bottom"
            label="my label"
            offsetDistance={1}
            //className="map-fields__popover"
            open
            pointerDisabled
            triggerDisabled
            autoClose
          >
            <div
              style={{
                overflow: "auto",
                //width: `${fieldSelectRef.getBoundingClientRect().width}px`,
                width: "350px",
                maxHeight: "350px",
              }}
            >
              <calcite-list
                label="field list"
                selectionMode="single"
                selectionAppearance="border"
                filterEnabled
                filterPlaceholder="Type in here"
                // https://github.com/Esri/calcite-design-system/issues/7545
                style={{ overflow: "auto" }}
              >
                <calcite-list-item-group
                  heading="Compatible fields"
                >
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Last compatible field" ></calcite-list-item>
                </calcite-list-item-group>
                <calcite-list-item-group
                  heading="Incompatible fields"
                  disabled={true}
                >
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Description 1" ></calcite-list-item>
                  <calcite-list-item
                  label="one" 
                  description="Last incompatible field" ></calcite-list-item>
                </calcite-list-item-group>
              </calcite-list>
            </div>
          </calcite-popover>,
            fieldSelectRef.parentElement,
            // Using document.body, looks good when not in dialog for small number and all rows
            // document.body,
          )} */}
    </calcite-table-row>
  );
}