declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number
    absoluteStrokeWidth?: boolean
  }
  export type Icon = FC<IconProps>
  export const Search: Icon
  export const Settings: Icon
  export const MoreHorizontal: Icon
  export const Star: Icon
  export const StarOff: Icon
  export const Plus: Icon
  export const ChevronLeft: Icon
  export const ChevronRight: Icon
  export const X: Icon
  export const Bell: Icon
  export const Filter: Icon
  export const Bookmark: Icon
  export const Phone: Icon
  export const Mail: Icon
  export const FileText: Icon
  export const Printer: Icon
  export const Share2: Icon
  export const Check: Icon
  export const Circle: Icon
  export const ChevronDown: Icon
  export const ChevronUp: Icon
  export const GripVertical: Icon
  export const PanelLeft: Icon
  export const User: Icon
  export const UserCheck: Icon
  export const BarChart2: Icon
  export const LogOut: Icon
  export const CreditCard: Icon
  export const Briefcase: Icon
  export const UserPlus: Icon
}

declare module '@/components/ui/button' {
  import { FC, ButtonHTMLAttributes } from 'react'
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }
  export const Button: FC<ButtonProps>
}

declare module '@/components/ui/input' {
  import { FC, InputHTMLAttributes } from 'react'
  export const Input: FC<InputHTMLAttributes<HTMLInputElement>>
}
