export default function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M197 762c87-102 203-102 319-29s231 102 319 0" />
      <path d="M342 637a170 170 0 1 1 339 0" />
    </svg>
  );
}
