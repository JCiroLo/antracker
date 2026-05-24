import { Typography, Container, Stack } from "@mui/material";

type MaintenanceBarProps = {
  position?: "top" | "bottom";
};

const MaintenanceBar: React.FC<MaintenanceBarProps> = ({ position }) => {
  return (
    <Stack
      sx={{
        position: "fixed",
        bottom: position === "bottom" ? 0 : undefined,
        top: position === "top" ? 0 : undefined,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 40,
        opacity: 0.25,
        background: "repeating-linear-gradient(45deg, yellow 0, yellow 20px, black 20px, black 40px)",
        backgroundPosition: "center",
        backgroundRepeat: "repeat-x",
      }}
    ></Stack>
  );
};

const Maintenance = () => {
  return (
    <Stack
      sx={{
        position: "relative",
        minHeight: "100dvh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            marginBottom: 2,
          }}
        >
          En mantenimiento
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            marginBottom: 4,
            lineHeight: 1.6,
            textWrap: "balance",
          }}
        >
          Estamos realizando algunas mejoras en Antracker para ofrecerte una mejor experiencia. Estaremos de vuelta muy pronto.
        </Typography>
      </Container>
      <MaintenanceBar position="top" />
      <MaintenanceBar position="bottom" />
    </Stack>
  );
};

export default Maintenance;
