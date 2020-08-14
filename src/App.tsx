import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Edit,
  EditSettingsModel,
  Toolbar,
  ToolbarItems,
  IEditCell,
} from "@syncfusion/ej2-react-grids";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Ajax } from "@syncfusion/ej2-base";
import "./App.css";

function App() {
  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  const toolbarOptions: ToolbarItems[] = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
  ];
  function editTemplate(args: any) {
    return (
      <MaskedTextBoxComponent
        value={args.PhoneNumber}
        mask="000-000-0000"
        id="PhoneNumber"
      />
    );
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    const ajax = new Ajax(
      "https://services.odata.org/V4/Northwind/Northwind.svc/Orders",
      "GET"
    );
    ajax.send();
    ajax.onSuccess = (data: any) => {
      setData(JSON.parse(data).value);
    };
  }, []);
  return (
    <div style={{ margin: "10%", marginTop: "5%" }}>
      <GridComponent
        dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 6 }}
        editSettings={editOptions}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="OrderID"
            headerText="ID"
            textAlign="Right"
            width="100"
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="CustomerID"
            headerText="EmployeeNo"
            width="150"
          />
          <ColumnDirective
            field="ShipCountry"
            headerText="Company"
            editType="dropdownedit"
          />
          <ColumnDirective field="ShipName" headerText="Department" />
          <ColumnDirective
            field="Freight"
            headerText="Salary"
            textAlign="Right"
            format="C2"
            width="150"
            editType="numericedit"
          />
          <ColumnDirective
            field="OrderDate"
            headerText="JoiningDate"
            type="date"
            format="yMd"
            width="150"
            editTemplate={editTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default App;
