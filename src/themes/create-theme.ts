import { createTheme as createMuiTheme, type Shadows } from "@mui/material";
import Colors from "@/themes/colors";
import type { AccentColor } from "@/types/global";

const createTheme = ({ accentColor }: { accentColor: AccentColor }) =>
  createMuiTheme({
    colorSchemes: {
      dark: {
        palette: {
          mode: "dark",
          primary: {
            main: Colors.dark[accentColor],
          },
          success: {
            main: "#9ece6a",
          },
          warning: {
            main: "#e0af68",
          },
          error: {
            main: "#f7768e",
          },
          info: {
            main: "#7dcfff",
          },
          background: {
            paper: "#2f344dc3",
            default: "#1a1b26",
          },
          text: {
            primary: "#c0caf5",
            secondary: "#8288a6",
            disabled: "#565f89",
          },
        },
      },
      light: {
        palette: {
          mode: "light",
          primary: {
            main: Colors.light[accentColor],
          },
          success: {
            main: "#587539",
          },
          warning: {
            main: "#c9af3a",
          },
          error: {
            main: "#f52a65",
          },
          info: {
            main: "#4abaaf",
          },
          background: {
            paper: "#d2d4def5",
            default: "#e6e7ed",
          },
          text: {
            primary: "#343b58",
            secondary: "#6c6e75",
            disabled: "#848cb5",
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: ["none", ...Array.from({ length: 24 }, (_, i) => `0px 4px ${i}px 0px #5959593d`)] as Shadows,
    typography: {
      fontFamily: "'Lato', sans-serif",
      button: {
        textTransform: "initial",
        fontWeight: 700,
      },
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "1rem",
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          "::-webkit-scrollbar-track": {
            borderRadius: 16,
            background: theme.palette.mode === "dark" ? "#1E1E1E" : "#f6f6f6",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: 16,
            background: theme.palette.mode === "dark" ? "#454545" : "#d8d8d8",
          },
          "::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "@keyframes scale_LDJPO": {
            "0%, 20%, 80%, 100%": {
              transform: "scale(1)",
            },
            "50%": {
              transform: "scale(1.5)",
            },
          },
          "@keyframes fade_LDJPO": {
            "0%, 20%, 80%, 100%": {
              opacity: "0.8",
            },
            "50%": {
              opacity: 1,
            },
          },
        }),
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
      MuiDialog: {
        defaultProps: {
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                borderRadius: 2,
              },
            },
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(4px) saturate(150%)",
              },
            },
          },
        },
      },
      MuiDialogActions: {
        defaultProps: {
          sx: {
            padding: 2,
          },
        },
      },
      MuiDialogTitle: {
        defaultProps: {
          sx: {
            fontWeight: 700,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(16px) saturate(200%)",
          },
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: "unset",
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
    },
  });

export default createTheme;
