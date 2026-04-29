import { alpha, Chip } from "@mui/material";
import Env from "@/lib/env";

const EnvChip = () => {
  const message = Env.APP_ENV === "development" ? "Dev mode" : null;

  return message ? (
    <Chip
      label={message}
      color="error"
      size="small"
      sx={{
        position: "fixed",
        zIndex: (theme) => theme.zIndex.snackbar,
        top: 8,
        right: 8,
        opacity: 0.5,
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.25),
      }}
    />
  ) : null;
};

export default EnvChip;
