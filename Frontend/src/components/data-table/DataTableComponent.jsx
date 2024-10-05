import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

export default function DataTableComponent({ allProducts, allColumns, onCellEditingStopped, defaultColDef }) {
	console.log(allProducts, allColumns)
	const [rowData, setRowData] = useState(allProducts);
	const [colDefs, setColDefs] = useState(allColumns);
	useEffect(()=>{
		setRowData(allProducts)
	}, [allProducts])
	
	return (
		<div
			className="ag-theme-quartz" // applying the Data Grid theme
			style={{ height: "85%" }} // the Data Grid will fill the size of the parent container
		>
				<AgGridReact
					rowData={rowData}
					columnDefs={colDefs}
					pagination={true}
					defaultColDef={defaultColDef}
					onCellEditingStopped={onCellEditingStopped}
				/>
		</div>
	);
}
