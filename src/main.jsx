import React from "react";
import ReactDOM from "react-dom/client";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-input-date-picker";
import { CalciteInputDatePicker } from "@esri/calcite-components-react";

setAssetPath(location.href);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalciteInputDatePicker value="2024-08-11" min="2024-07-01"></CalciteInputDatePicker>
  </React.StrictMode>
);