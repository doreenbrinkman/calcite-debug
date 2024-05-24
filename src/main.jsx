import React from "react";
import ReactDOM from "react-dom/client";
import { setAssetPath } from '@esri/calcite-components/dist/components';
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-split-button";
import "@esri/calcite-components/dist/components/calcite-dropdown-item";
import "@esri/calcite-components/dist/components/calcite-dropdown-group";
import {
  CalciteModal,
  CalciteSplitButton,
  CalciteDropdownItem,
  CalciteDropdownGroup,
} from "@esri/calcite-components-react";

setAssetPath(location.href);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalciteModal
      width="s"
      scale="m"
      widthScale="s"
      open
      outsideCloseDisabled
      dismissible>
        <div slot="header">Safari split button</div>
        <div slot="content">Add some content here</div>
        <CalciteSplitButton
          slot="secondary"
          primaryText="Save and leave"
          scale="m">
          <CalciteDropdownGroup selectionMode="none">
            <CalciteDropdownItem>Save and leave</CalciteDropdownItem>
            <CalciteDropdownItem>Save as</CalciteDropdownItem>
            <CalciteDropdownItem>Save option</CalciteDropdownItem>
          </CalciteDropdownGroup>
        </CalciteSplitButton>
      </CalciteModal>
  </React.StrictMode>
);
