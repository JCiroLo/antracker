import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  useColorScheme,
  useMediaQuery,
  Typography,
  Avatar,
  Link,
  IconButton,
} from "@mui/material";
import AccentColorSelector from "@/components/layout/accent-color-selector";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";
import EyeIcon from "@/components/icons/eye-icon";
import InfoIcon from "@/components/icons/info-icon";
import ShapesIcon from "@/components/icons/shapes-icon";
import TrashIcon from "@/components/icons/trash-icon";
import UserIcon from "@/components/icons/user-icon";
import useCategories from "@/hooks/use-categories";
import useSettingsStore from "@/stores/use-settings-store";
import DateTools from "@/tools/date-tools";
import type { AccentColor } from "@/types/global";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

type SectionValue = "appearance" | "account" | "about" | "categories";

type Section = {
  label: string;
  icon: React.ReactNode;
  value: SectionValue | null;
  disabled: boolean;
};

const SECTIONS: Record<SectionValue, Section> = {
  appearance: {
    label: "Apariencia",
    icon: <EyeIcon />,
    value: "appearance",
    disabled: false,
  },
  categories: {
    label: "Categorías",
    icon: <ShapesIcon />,
    value: "categories",
    disabled: false,
  },
  account: {
    label: "Cuenta",
    icon: <UserIcon />,
    value: "account",
    disabled: true,
  },
  about: {
    label: "Acerca del sitio",
    icon: <InfoIcon />,
    value: "about",
    disabled: false,
  },
};

const SettingsAppearance = () => {
  const { mode, setMode } = useColorScheme();
  const { accentColor, setAccentColor } = useSettingsStore();

  const handleThemeModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value as "light" | "dark" | "system");
  };

  const handleAccentColorChange = (color: AccentColor) => {
    setAccentColor(color);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <TextField value={mode} size="small" select onChange={handleThemeModeChange}>
            <MenuItem value="light">Claro</MenuItem>
            <MenuItem value="dark">Oscuro</MenuItem>
            <MenuItem value="system">Sistema</MenuItem>
          </TextField>
        }
        sx={{ paddingRight: 16 }}
      >
        <ListItemText primary="Tema" secondary="Personaliza el tema del sitio web" />
      </ListItem>
      <ListItem secondaryAction={<AccentColorSelector value={accentColor} onChange={handleAccentColorChange} />} sx={{ paddingRight: 20 }}>
        <ListItemText primary="Color" secondary={`Elije tu color favorito (${accentColor})`} />
      </ListItem>
    </>
  );
};

const SettingsCategories = () => {
  const categories = useCategories();

  if (categories.values.length === 0) {
    return (
      <ListItem>
        <ListItemText primary="No tienes categorías disponibles" secondary="¡Empieza creando una para organizar tus gastos!" />
      </ListItem>
    );
  }

  return (
    <>
      {categories.values.map((category) => (
        <ListItem
          key={category.id}
          sx={{ "&:hover": { backgroundColor: "action.hover" } }}
          secondaryAction={
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton color="inherit" disabled>
                <TrashIcon />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText primary={category.name} />
        </ListItem>
      ))}
    </>
  );
};

const SettingsAbout = () => {
  return (
    <Stack component="li" spacing={4} padding={2}>
      <Stack>
        <img src="/logo.png" alt="Antracker" width={32} height={32} />
        <Typography variant="body2">
          <Typography component="span" variant="body2">
            Antracker
          </Typography>{" "}
          fue creado con el propósito de simplificar la gestión de gastos y pagos, ofreciendo una herramienta intuitiva y eficiente para el
          seguimiento financiero personal.
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar src="/juanciro.jpg" alt="Juan Ciro" />
        <Stack spacing={0.5}>
          <Typography variant="body1" fontWeight="bold" lineHeight={1}>
            Juan Ciro
          </Typography>
          <Link lineHeight={1} href="mailto:juanciro35@gmail.com">
            juanciro35@gmail.com
          </Link>
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Link component={RouterLink} to="/privacy-policy" variant="body2" color="text.secondary" underline="hover">
          Política de Privacidad
        </Link>
        <Link component={RouterLink} to="/terms-and-conditions" variant="body2" color="text.secondary" underline="hover">
          Términos y Condiciones
        </Link>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        © {DateTools.year} Antracker v{APP_VERSION}. Todos los derechos reservados.
      </Typography>
    </Stack>
  );
};

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [section, setSection] = React.useState<SectionValue | null>(() => (isMobile ? null : "appearance"));

  const sections = useMemo(() => Object.values(SECTIONS), []);

  const title = section ? SECTIONS[section].label : "Ajustes";

  const handleSectionChange = (_: React.SyntheticEvent, newValue: SectionValue) => {
    setSection(newValue);
  };

  return (
    <Dialog maxWidth="sm" open={open} fullWidth onClose={onClose}>
      <DialogTitle display={{ xs: "none", sm: "block" }}>Ajustes</DialogTitle>
      <DialogTitle display={{ xs: "block", sm: "none" }}>{title}</DialogTitle>
      <DialogContent sx={{ paddingX: 0, paddingY: { xs: 1, sm: 2 } }}>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Tabs
            value={section}
            orientation="vertical"
            sx={{ display: { xs: "none", sm: "initial" }, flexShrink: 0, borderRight: 1, borderColor: "divider" }}
            centered
            onChange={handleSectionChange}
          >
            {sections.map((section) => (
              <Tab key={section.value} label={section.label} value={section.value} disabled={section.disabled} />
            ))}
          </Tabs>
          <List sx={{ display: !section ? { xs: "initial", sm: "none" } : "none" }} disablePadding>
            {sections.map((section) => (
              <ListItem key={section.value} disablePadding>
                <ListItemButton disabled={section.disabled} onClick={() => setSection(section.value as SectionValue)}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{section.icon}</ListItemIcon>
                  <ListItemText primary={section.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {section && (
            <List sx={{ flexGrow: 1 }} disablePadding>
              <ListItem sx={{ display: { xs: "flex", sm: "none" } }}>
                <Button variant="text" startIcon={<ChevronLeftIcon />} sx={{ padding: 0 }} onClick={() => setSection(null)}>
                  Ajustes
                </Button>
              </ListItem>
              {section === "appearance" && <SettingsAppearance />}
              {section === "categories" && <SettingsCategories />}
              {section === "about" && <SettingsAbout />}
            </List>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
