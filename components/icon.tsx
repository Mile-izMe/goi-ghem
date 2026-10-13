import type { ReactNode } from "react";

const icons = {
  logo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16.5 7.5-3 6-6 3 3-6 6-3Z" />
      <path d="m10.5 10.5 3 3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  list: (
    <>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="m3 6 .01 0M3 12h.01M3 18h.01" strokeWidth="3" />
    </>
  ),
  template: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M4 9h16M10 9v12" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  "arrow-right": <path d="M4 12h16m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M20 12H4m6-6-6 6 6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 5 7 7-7 7" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18M7 15h2m6 0h2m-10 3h2" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 7H5a2 2 0 0 1 0-4h13v4M4 5v14a2 2 0 0 0 2 2h14V7" />
      <path d="M21 12h-5a2 2 0 0 0 0 4h5v-4Z" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </>
  ),
  edit: (
    <>
      <path d="m15 4 5 5M4 20l5-1 12-12a2.1 2.1 0 0 0-5-5L4 14l-1 7 6-2M13 21h8" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  shirt: <path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4a4 4 0 0 1-8 0Z" />,
  wave: (
    <>
      <path d="M2 8c3-4 5 4 8 0s5 4 8 0c1.5-2 3-1.5 4 0M2 13c3-4 5 4 8 0s5 4 8 0c1.5-2 3-1.5 4 0M2 18c3-4 5 4 8 0s5 4 8 0c1.5-2 3-1.5 4 0" />
    </>
  ),
  tennis: (
    <>
      <ellipse
        cx="14.5"
        cy="8.5"
        rx="5.5"
        ry="7"
        transform="rotate(40 14.5 8.5)"
      />
      <path d="m10 14-2 3m-1-1-4 5 2 1 4-5M13 3l7 6M10 6l7 6M10 10l8-7M12 13l8-7" />
    </>
  ),
  bag: (
    <>
      <rect x="4" y="7" width="16" height="14" rx="3" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2M8 11v1m8-1v1" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  moon: <path d="M20.9 13.2A9 9 0 0 1 10.8 3.1 9 9 0 1 0 20.9 13.2Z" />,
  plane: <path d="m22 2-8 20-4-8-8-4 20-8ZM10 14 22 2M6 18l-3 3" />,
  mountain: (
    <>
      <path d="m2 20 8-16 5 9 2-4 5 11H2Z" />
      <path d="m7 10 3 2 2-3" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm12 1h2a3 3 0 1 1 0 6h-2M3 23h16M7 2v2m4-2v2m4-2v2" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  circle: <circle cx="12" cy="12" r="9" />,
  filter: (
    <>
      <path d="M4 6h16M7 12h10m-7 6h4" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  external: (
    <>
      <path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    </>
  ),
  alert: (
    <>
      <path d="m10.3 4-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4m0 4h.01" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}
