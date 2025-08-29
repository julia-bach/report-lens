import { Select, SelectItem } from "@heroui/react";
import { CalendarRange } from "lucide-react";
import { timeRangeStore } from "@/store/time-range-store";
import { useShallow } from "zustand/react/shallow";

export default function TimeRangeSelect() {
  const { setTimeRange } = timeRangeStore(useShallow((state) => state));

  const timeOptions = [
    { key: "1d", label: "Last 24 hours" },
    { key: "7d", label: "Last 7 days" },
    { key: "30d", label: "Last 30 days" },
    { key: "all", label: "All time" }
  ];

  return (
    <div className="w-[max(8rem,8vw)] mb-5 text-gray-400">
      <Select
        className="text-gray-400"
        defaultSelectedKeys={["7d"]}
        endContent={<CalendarRange height="16" width="16"/>}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        {timeOptions.map((option => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        )))}
      </Select>
    </div>
  );
}