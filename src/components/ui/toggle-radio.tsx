import React, { useState, useRef, useLayoutEffect } from "react";
import { Box, styled, Typography } from "@mui/material";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const Root = styled("div")(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  justifyContent: "stretch",
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  isolation: "isolate",
}));

const HiddenRadio = styled("input")({
  position: "absolute",
  width: 0,
  height: 0,
  margin: 0,
  opacity: 0,
});

const StyledLabel = styled("label")<{ isActive: boolean }>(({ theme, isActive }) => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  width: 0,
  padding: theme.spacing(1.5, 3),
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: isActive ? 600 : 500,
  cursor: "pointer",
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const Slider = styled(Box)<{ width: number; left: number }>(({ width, left, theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: 4,
  bottom: 4,
  left: 0,
  width: `${width}px`,
  transform: `translateX(${left}px)`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 0.5,
  transition: theme.transitions.create(["all"]),
}));

const ToggleRadio: React.FC<Props> = ({ options, name, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0].value);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLLabelElement | null)[]>([]);

  useLayoutEffect(() => {
    const activeIndex = options.findIndex((option) => option.value === selectedValue);
    const activeLabel = labelsRef.current[activeIndex];

    if (activeLabel && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const labelRect = activeLabel.getBoundingClientRect();

      setSliderStyle({
        width: labelRect.width,
        left: labelRect.left - containerRect.left,
      });
    }
  }, [selectedValue, options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <Root ref={containerRef} role="radiogroup">
      <Slider width={sliderStyle.width} left={sliderStyle.left} />

      {options.map((option, index) => {
        const isChecked = selectedValue === option.value;

        return (
          <StyledLabel
            key={option.value}
            ref={(el) => {
              labelsRef.current[index] = el;
            }}
            isActive={isChecked}
          >
            <HiddenRadio type="radio" name={name} value={option.value} checked={isChecked} onChange={handleChange} />
            <Typography variant="body2" sx={{ position: "relative", zIndex: 3 }}>
              {option.label}
            </Typography>
          </StyledLabel>
        );
      })}
    </Root>
  );
};

export default ToggleRadio;
