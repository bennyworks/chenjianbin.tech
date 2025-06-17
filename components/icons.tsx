import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  BookOpen,
  Settings2,
  Send,
  LifeBuoy,
  Frame,
  PieChart,
  Map,
  Trash,
  Twitter,
  User,
  Calendar,
  X,
  type Icon as LucideIcon,
} from 'lucide-react'

export type Icon = typeof LucideIcon

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  calendar: Calendar,
  bookOpen: BookOpen,
  settings2: Settings2,
  send: Send,
  lifeBuoy: LifeBuoy,
  frame: Frame,
  pieChart: PieChart,
  map: Map,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
    </svg>
  ),
  chenjianbin: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      viewBox="0 0 420.4140930175781 323.6000061035156"
      fill="none"
      {...props}
    >
      <rect x="0" y="0" width="0" height="0" fill="rgba(249, 249, 249, 1)" />
      <ellipse
        cx="320.4140930175781"
        cy="161.79999999999998"
        rx="100"
        ry="161.79999999999998"
        fill="#FF3402"
      ></ellipse>
      <path
        fillRule="evenodd"
        fill="#FF3402"
        fillOpacity="0.5"
        d="M309.213 0L230.787 -9.6045e-15C224.829 -1.03341e-14 220 4.82936 220 10.7867L220 312.813C220 318.771 224.829 323.6 230.787 323.6L309.213 323.6C315.171 323.6 320 318.771 320 312.813L320 10.7867C320 4.82936 315.171 0 309.213 0Z"
      ></path>
      <path
        d="M0 323.6L200 0L200 323.6L154.364 323.6C163.978 293.093 159.159 264.52 140.38 253.677C116.466 239.87 78.9699 260.044 56.63 298.737C51.8855 306.954 48.2062 315.346 45.5826 323.6L0 323.6Z"
        fillRule="evenodd"
        fill="#FF3402"
      ></path>
      <path
        d="M330 0.798892L330 322.801C326.711 323.329 323.375 323.6 320 323.6C316.625 323.6 313.289 323.329 310 322.801L310 0.798891C313.289 0.270521 316.625 0 320 0C323.375 0 326.711 0.270521 330 0.798892Z"
        fillRule="evenodd"
        fill="#FFFFFF"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
}
