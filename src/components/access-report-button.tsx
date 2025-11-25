import { FileText } from "lucide-react";
import { GenericObject } from "@/types/generic-types";

type AccessReportButtonProps = {
  onClick: (data?: GenericObject) => void;
  data?: GenericObject;
}

export default function AccessReportButton({ onClick, data }: AccessReportButtonProps) {
  const handleClick = () => {
    onClick(data);
  };

  return (
    <div className="flex items-center h-full justify-end">
      <button title="Access Report" onClick={handleClick}>
        <FileText height="19" width="19" className="text-primary-300"/>
      </button>
    </div>
  );
}