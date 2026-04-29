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
      display={{ xs: "none", sm: "flex" }}
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      flexDirection="column"
      justifyContent="space-between"
      padding={1}
    >
      <Stack component="nav">
        {/* <Zoom in>
          <Fab aria-label={mode === "dark" ? "light mode" : "dark mode"} size="small" sx={{ boxShadow: 0 }} onClick={handleSwitchTheme}>
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Fab>
        </Zoom> */}
      </Stack>
      <Stack alignItems="flex-start" spacing={0.5} sx={{ opacity: 0.5 }}>
        <Typography lineHeight={1} sx={{ writingMode: "vertical-lr", textOrientation: "mixed" }}>
          antracker
        </Typography>
        <Box component="img" src="/logo.png" width={16} />
      </Stack>
    </Stack>
  );
});

export default Sidebar;
