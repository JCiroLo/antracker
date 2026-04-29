import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";
import ChevronRightIcon from "@/components/icons/chevron-right-icon";

type ListSelectorValue = string | number;

type ListSelectorOption = {
  name: string;
  value: ListSelectorValue;
};

type ListSelectorProps<T extends ListSelectorOption> = {
  options: T[];
  value: ListSelectorValue;
  highlightValue?: ListSelectorValue;
  onChange: (value: ListSelectorValue) => void;
};

const ListSelector = <T extends ListSelectorOption>({ options, value, highlightValue, onChange }: ListSelectorProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [changeSource, setChangeSource] = useState<"button" | "menu">("button");

  const label = options.find((option) => option.value === value)?.name || "";
  const isValueHighlighted = value === highlightValue;

  const handlePrev = () => {
    setDirection("left");
    setChangeSource("button");
    const index = options.findIndex((option) => option.value === value);
    const newValue = options[(index - 1 + options.length) % options.length];
    onChange(newValue.value);
  };

  const handleNext = () => {
    setDirection("right");
    setChangeSource("button");
    const index = options.findIndex((option) => option.value === value);
    const newValue = options[(index + 1) % options.length];
    onChange(newValue.value);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (value: T) => {
    setChangeSource("menu");
    onChange(value.value);
    setAnchorEl(null);
  };

  const variants = {
    enterButton: (dir: "left" | "right") => ({
      x: dir === "right" ? 40 : -40,
      opacity: 0,
    }),
    centerButton: { x: 0, opacity: 1 },
    exitButton: (dir: "left" | "right") => ({
      x: dir === "right" ? -40 : 40,
      opacity: 0,
    }),

    enterMenu: { y: -10, opacity: 0 },
    centerMenu: { y: 0, opacity: 1 },
    exitMenu: { y: 10, opacity: 0 },
  };

  const animationVariant =
    changeSource === "button"
      ? {
          enter: variants.enterButton,
          center: variants.centerButton,
          exit: variants.exitButton,
        }
      : {
          enter: variants.enterMenu,
          center: variants.centerMenu,
          exit: variants.exitMenu,
        };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
      <IconButton color="inherit" onClick={handlePrev}>
        <ChevronLeftIcon />
      </IconButton>

      <Box
        onClick={handleOpenMenu}
        sx={{
          minWidth: 120,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={value}
            custom={direction}
            variants={animationVariant}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize", color: isValueHighlighted ? "primary.main" : "text.primary" }}
            >
              {label}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>

      <IconButton color="inherit" onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            sx={{ textTransform: "capitalize", color: option.value === highlightValue ? "primary.main" : "text.primary" }}
            onClick={() => handleSelect(option)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ListSelector;
