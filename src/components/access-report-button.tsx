import { FileText } from "lucide-react";

export default function AccessReportButton() {
  return (
    <div className="flex items-center h-full justify-end">
      <button title="Access Report">
        <FileText height="19" width="19" className="text-primary-300"/>
      </button>
    </div>
  );
}