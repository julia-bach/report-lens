import { themeQuartz } from "ag-grid-community";
import { themeColors } from "../../../../tailwind.config";

export const agTheme = themeQuartz.withParams({
  spacing: 6,
  rowHeight: 30,
  borderColor: "none",
  headerTextColor: themeColors.primary[50],
  textColor: themeColors.primary[600],
  // panelTitleBarTextColor: themeColors.neutral[50],
  // iconButtonHoverColor: themeColors.neutral[50],
  // iconButtonHoverBackgroundColor: "rgba(255, 255, 255, 0.1)",
  // iconButtonActiveColor: themeColors.neutral[50],
  // findActiveMatchColor: themeColors.neutral[50],
  // headerCellHoverBackgroundColor: "rgba(0, 0, 0, 0.2)",
  // oddRowBackgroundColor: themeColors.slate["200"],
  // menuBackgroundColor: themeColors.slate[200],
  // menuBorder: { style: "solid", width: 1, color: themeColors.secondary[300] },
  backgroundColor: themeColors.primary[100],
  headerBackgroundColor: themeColors.primary[600]
});