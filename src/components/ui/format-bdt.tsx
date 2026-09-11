import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { formatBdtValue } from "@/lib/format";

export const TakaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <FaBangladeshiTakaSign 
    className={`inline-block translate-y-[-0.1em] scale-[0.9] ${className || ""}`}
    style={style}
  />
);

export const FormatBdt: React.FC<{ value: number; exact?: boolean; className?: string }> = ({
  value,
  exact,
  className,
}) => (
  <span className={`inline-flex items-center gap-0.5 ${className || ""}`}>
    <TakaIcon />
    {formatBdtValue(value, { exact })}
  </span>
);

export default FormatBdt;
