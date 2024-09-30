import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

export default function DataTableComponent({rowData1, colDefs1}) {
	console.log(rowData1, colDefs1)
		// Row Data: The data to be displayed.
		const [rowData, setRowData] = useState(rowData1);
		

		// Column Definitions: Defines the columns to be displayed.
		const [colDefs, setColDefs] = useState(colDefs1);
		const defaultColDef = {
			filter: true,
			sortable: true
		}
		const EditableCallbackParams = (TData, TValue)=>{
			console.log(TData, TValue)
		}
		return (
			<div
				className="ag-theme-quartz" // applying the Data Grid theme
				style={{ height: "85%"}} // the Data Grid will fill the size of the parent container
			>
				{rowData1.length !== 0 && 
				<AgGridReact
					rowData={rowData}
					columnDefs={colDefs}
					pagination={true}
					defaultColDef={defaultColDef}
					editable={true}
				/>
}
			</div>
		);
	}
