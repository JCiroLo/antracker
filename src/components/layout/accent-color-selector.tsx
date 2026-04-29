import React from "react";
import { RadioGroup, FormControlLabel, FormControl, useColorScheme } from "@mui/material";
import Colors from "@/themes/colors";
import ColorRadio from "@/components/ui/color-radio";
import type { AccentColor } from "@/types/global";

interface AccentColorSelectorProps {
  value: AccentColor;
  onChange: (value: AccentColor) => void;
}

const AccentColorSelector: React.FC<AccentColorSelectorProps> = ({ value, onChange }) => {
  const { mode } = useColorScheme();

  const themeMode = !mode || mode === "system" ? "dark" : mode;

  const themedColors = Colors[themeMode];

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} row sx={{ gap: 0.5 }} onChange={(e) => onChange(e.target.value as AccentColor)}>
        {Object.entries(themedColors).map(([colorKey, hex]) => (
          <FormControlLabel
            key={colorKey}
            label=""
            value={colorKey}
            control={<ColorRadio checked={value === colorKey} bgcolor={hex} />}
            sx={{ margin: 0 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default AccentColorSelector;
