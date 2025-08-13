import { themeQuartz } from "ag-grid-community";
import { themeColors } from "../../../../tailwind.config";

export const agTheme = themeQuartz.withParams({
  spacing: 7,
  rowHeight: 45,
  borderColor: "none",
  headerTextColor: themeColors.primary[50],
  textColor: themeColors.gray[600],
  // panelTitleBarTextColor: themeColors.neutral[50],
  // iconButtonHoverColor: themeColors.neutral[50],
  // iconButtonHoverBackgroundColor: "rgba(255, 255, 255, 0.1)",
  // iconButtonActiveColor: themeColors.neutral[50],
  headerCellHoverBackgroundColor: themeColors.primary[600],
  rowHoverColor: themeColors.gray[200],
  oddRowBackgroundColor: themeColors.gray[100],
  menuBorder: { style: "solid", width: 1, color: themeColors.primary[100] },
  backgroundColor: themeColors.white,
  headerBackgroundColor: themeColors.primary[500]
});