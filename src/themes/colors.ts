import type { PaletteMode } from "@mui/material";
import type { AccentColor } from "@/types/global";

const Colors: Record<PaletteMode, Record<AccentColor, string>> = {
  dark: {
    ant: "#ff9e64", // orange
    lime: "#9ece6a", // green
    dragonfruit: "#f7768e", // red
    lavender: "#9d7cd8", // purple
    mintice: "#7dcfff", // cyan
  },
  light: {
    ant: "#b15c00", // orange
    lime: "#587539", // green
    dragonfruit: "#f52a65", // red
    lavender: "#9854f1", // purple
    mintice: "#4abaaf", // cyan
  },
};

export default Colors;
