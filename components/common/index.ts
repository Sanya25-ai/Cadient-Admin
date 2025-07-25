// Common components for reuse across the application
export { default as ApplicationCommonHeader } from './application-common-header'
export type { ActionItem, ThemeConfig, ApplicationCommonHeaderProps } from './application-common-header'

// Predefined themes for common use cases
export const themes = {
  orange: {
    titleColor: "text-orange-600",
    buttonBg: "bg-orange-500",
    buttonHover: "hover:bg-orange-600",
    controlsBg: "bg-orange-50",
    controlsBorder: "border-orange-100",
    dropdownBorder: "border-orange-500",
    dropdownText: "text-orange-600"
  },
  green: {
    titleColor: "text-green-600",
    buttonBg: "bg-green-600",
    buttonHover: "hover:bg-green-700",
    controlsBg: "bg-green-50",
    controlsBorder: "border-green-100",
    dropdownBorder: "border-green-600",
    dropdownText: "text-green-600"
  },
  red: {
    titleColor: "text-red-600",
    buttonBg: "bg-red-600",
    buttonHover: "hover:bg-red-700",
    controlsBg: "bg-red-50",
    controlsBorder: "border-red-100",
    dropdownBorder: "border-red-600",
    dropdownText: "text-red-600"
  },
  blue: {
    titleColor: "text-blue-600",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
    controlsBg: "bg-blue-50",
    controlsBorder: "border-blue-100",
    dropdownBorder: "border-blue-600",
    dropdownText: "text-blue-600"
  }
}
