import React from "react";

export default function DonutChart({ value, size = 100, stroke = 8, color = "#FFA500", bg = "#eee" }: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  bg?: string;
}) {
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const angle = (value / 100) * 2 * Math.PI;
  const startAngle = -Math.PI / 2; // Start at 12 o'clock
  const endAngle = startAngle + angle;

  function polarToCartesian(cx: number, cy: number, r: number, a: number) {
    return [
      cx + r * Math.cos(a),
      cy + r * Math.sin(a)
    ];
  }

  const [x1, y1] = polarToCartesian(center, center, radius, startAngle);
  const [x2, y2] = polarToCartesian(center, center, radius, endAngle);
  const largeArcFlag = value > 50 ? 1 : 0;

  const arcPath = `
    M ${x1} ${y1}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
  `;

  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={bg}
        strokeWidth={stroke}
        fill="none"
      />
      {/* Value arc */}
      <path
        d={arcPath}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
      {/* Score text */}
      <text
        x={center}
        y={center + 5}
        textAnchor="middle"
        fontSize={size / 4}
        fill="#222"
        fontWeight="bold"
      >
        {value}%
      </text>
    </svg>
  );
}
