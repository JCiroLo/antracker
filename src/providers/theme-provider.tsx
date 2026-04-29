import { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, type PaletteMode } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import createTheme from "@/themes/create-theme";
import useSettingsStore from "@/stores/use-settings-store";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: PaletteMode;
  storageKey?: string;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = "dark", storageKey = "ui-theme" }) => {
  const accentColor = useSettingsStore((state) => state.accentColor);

  const theme = useMemo(() => createTheme({ accentColor }), [accentColor]);

  return (
    <MuiThemeProvider modeStorageKey={storageKey} defaultMode={defaultTheme} theme={theme} noSsr>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
