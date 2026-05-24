import { Box, Stack, Typography } from "@mui/material";
import { forwardRef } from "react";

const Sidebar = forwardRef<HTMLDivElement>((_, ref) => {
  // const { mode, setMode } = useColorScheme();

  // const handleSwitchTheme = () => {
  //   setMode(mode === "dark" ? "light" : "dark");
  // };

  return (
    <Stack
      ref={ref}
      component="aside"
      sx={{
        display: { xs: "none", sm: "flex" },
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1,
      }}
    >
      <Stack component="nav">
        {/* <Zoom in>
          <Fab aria-label={mode === "dark" ? "light mode" : "dark mode"} size="small" sx={{ boxShadow: 0 }} onClick={handleSwitchTheme}>
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Fab>
        </Zoom> */}
      </Stack>
      <Stack
        spacing={0.5}
        sx={{
          alignItems: "flex-start",
          opacity: 0.5,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1,
            writingMode: "vertical-lr",
            textOrientation: "mixed",
          }}
        >
          antracker
        </Typography>
        <Box
          component="img"
          src="/logo.png"
          sx={{
            width: 16,
          }}
        />
      </Stack>
    </Stack>
  );
});

export default Sidebar;
