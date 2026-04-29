import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Button, Stack, DialogActions } from "@mui/material";
import features from "@/assets/features.json";

const STORAGE_KEY = "last-seen-features-version";

const FeaturesModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_KEY);

    if (savedVersion !== features.version) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, features.version);
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="md" slotProps={{ paper: { sx: { overflow: "hidden" } } }} fullWidth onClose={handleClose}>
      <DialogTitle>🚀 Novedades</DialogTitle>
      <DialogContent>
        <List>
          {features.features.map((feature, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={feature.title} secondary={feature.description} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" fullWidth onClick={handleClose}>
          ¡Entendido!
        </Button>
      </DialogActions>
      <Stack
        position="absolute"
        right={0}
        width={{ xs: "100%", md: "25%" }}
        height="100%"
        sx={{
          opacity: { xs: 0.2, md: 0.75 },
          pointerEvents: "none",
          "@keyframes image-spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      >
        <img
          src={features.image}
          alt="Novedades"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(80px) saturate(2)",
            animation: "image-spin 20s linear infinite",
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default FeaturesModal;
