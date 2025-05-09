import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GetRowIdFunc } from "ag-grid-community";
import { useMemo } from "react";
import { agTheme } from "@/components/wrappers/ag-grid/theme";

interface AgGridProps extends AgGridReactProps {
  gridHeight?: number
  getRowId?:  GetRowIdFunc | undefined
}

export default function AgGrid({ gridHeight = 0, ...props }: AgGridProps) {
  const gridStyle = useMemo(() => ({ height: `${gridHeight}px` }), [gridHeight]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true
    };
  }, []);

  return (
    <div style={gridStyle} className="min-w-[550px]">
      <AgGridReact
        {...props}
        pagination={true}
        defaultColDef={defaultColDef}
        theme={agTheme}
        paginationPageSize={20}
        domLayout="normal"
      />
    </div>
  );
};