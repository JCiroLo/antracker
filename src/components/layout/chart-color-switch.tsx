import { useTheme } from "@mui/material";
import { useDrawingArea, useYScale } from "@mui/x-charts";
import type { ScaleLinear } from "d3-scale";

type ChartColorSwitchProps = {
  color1: string;
  color2: string;
  id: string;
  threshold: number;
};

const ChartColorSwitch: React.FC<ChartColorSwitchProps> = ({ color1, color2, id, threshold }) => {
  const theme = useTheme();

  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  const scale = useYScale() as ScaleLinear<number, number>;
  const y0 = scale(threshold);
  const off = y0 !== undefined ? y0 / svgHeight : 0;

  return (
    <>
      <line x1="0" y1={y0} x2="100%" y2={y0} stroke={theme.palette.divider} strokeWidth={2} />
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2={`${svgHeight}px`} gradientUnits="userSpaceOnUse">
          <stop offset={off} stopColor={color1} stopOpacity={1} />
          <stop offset={off} stopColor={color2} stopOpacity={1} />
        </linearGradient>
      </defs>
    </>
  );
};

export default ChartColorSwitch;
