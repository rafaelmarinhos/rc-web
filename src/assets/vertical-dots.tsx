interface IconProps {
  color?: string
  size?: number
}

export const VerticalDots = ({ color = '#292D32', size = 15 }: IconProps) => (
  <svg
    width="3"
    height={size}
    viewBox="0 0 3 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 12C0.671573 12 -2.03558e-07 12.6716 -1.31134e-07 13.5C-5.87108e-08 14.3284 0.671573 15 1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12Z"
      fill={color}
    />
    <path
      d="M1.5 6C0.671573 6 -2.03558e-07 6.67157 -1.31134e-07 7.5C-5.87108e-08 8.32843 0.671573 9 1.5 9C2.32843 9 3 8.32843 3 7.5C3 6.67157 2.32843 6 1.5 6Z"
      fill={color}
    />
    <path
      d="M1.5 1.31134e-07C0.671573 2.03558e-07 -2.03558e-07 0.671573 -1.31134e-07 1.5C-5.87108e-08 2.32843 0.671573 3 1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 5.87108e-08 1.5 1.31134e-07Z"
      fill={color}
    />
  </svg>
)
