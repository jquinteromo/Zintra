interface VerifiedBadgeProps {
  size?: number;
  className?: string;
}

const VerifiedBadge = ({ size = 18, className }: VerifiedBadgeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="url(#zintraGold)"
    width={size}
    height={size}
   className={`inline-block align-middle drop-shadow-sm ${className ?? ""}`}
  >
    <defs>
      <linearGradient id="zintraGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFC300" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="#F5B800" strokeWidth="1.5" />
    <path
      d="M8 12l2.5 2.5L16 9"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VerifiedBadge