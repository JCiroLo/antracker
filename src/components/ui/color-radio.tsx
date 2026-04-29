import React from "react";
import { Radio as MuiRadio, styled } from "@mui/material";

type ColorRadioProps = {
  bgcolor: string;
};

const Radio = styled(MuiRadio)(() => ({
  padding: 4,
  "& .MuiSvgIcon-root": {
    display: "none",
  },
}));

const ColorCircle = styled("span")<{ bgcolor: string; checked?: boolean }>(({ theme, bgcolor, checked }) => ({
  display: "inline-block",
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: bgcolor,
  outline: checked ? `2px solid ${theme.palette.primary.main}` : "none",
  outlineOffset: 2,
}));

const ColorRadio = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof MuiRadio> & ColorRadioProps>(function ColorRadio(
  props,
  ref
) {
  const { checked, value, bgcolor, ...other } = props;

  return (
    <Radio
      ref={ref}
      icon={<ColorCircle bgcolor={bgcolor} />}
      checkedIcon={<ColorCircle bgcolor={bgcolor} checked={checked} />}
      value={value}
      {...other}
    />
  );
});

export default ColorRadio;
