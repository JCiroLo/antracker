import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  Alert,
  Link,
  Divider,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";

type ConsentDialogProps = {
  email: string;
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

const ConsentDialog: React.FC<ConsentDialogProps> = ({ email, open, onAccept, onDecline }) => {
  const [hasUserAccepted, setHasUserAccepted] = React.useState(false);

  function handleAcceptChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHasUserAccepted(event.target.checked);
  }

  function handleAccept() {
    if (hasUserAccepted) {
      onAccept();
      setHasUserAccepted(false);
    }
  }

  function handleDecline() {
    onDecline();
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <ListItemText
          primary="Consentimiento para el Tratamiento de Datos Personales"
          secondary="Ley 1581 de 2012 (Ley de Habeas Data) - República de Colombia"
        />
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Alert severity="info" variant="filled">
            <Typography>
              <b>Importante:</b> Antes de crear su cuenta, debe leer y aceptar nuestros términos legales. Sus datos personales serán
              tratados de acuerdo con la Ley de Habeas Data de Colombia.
            </Typography>
          </Alert>

          <Stack>
            <Typography component="h3" variant="h6" fontWeight={700}>
              Datos que Recopilaremos
            </Typography>
            <Typography gutterBottom>
              Para proporcionarle el servicio de seguimiento financiero personal, recopilaremos y procesaremos los siguientes datos:
            </Typography>
            <List disablePadding>
              <ListItem>
                <Typography>
                  • <strong>Correo electrónico:</strong> {email}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  • <strong>Datos de perfil:</strong>Nombre y apellido
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  • <strong>Datos financieros:</strong>Ingresos, gastos, categorías y montos
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  • <strong>Datos de uso:</strong>Información sobre cómo utiliza la aplicación
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  • <strong>Datos técnicos:</strong>Dirección IP, tipo de dispositivo
                </Typography>
              </ListItem>
            </List>
          </Stack>

          <Divider />

          <Stack>
            <Typography component="h3" variant="h6" fontWeight={700}>
              Finalidades del Tratamiento
            </Typography>
            <List disablePadding>
              <ListItem>
                <Typography>• Crear y gestionar su cuenta de usuario</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Proporcionar servicios de seguimiento financiero</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Generar reportes y análisis personalizados</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Mejorar la funcionalidad de la aplicación</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Cumplir con obligaciones legales</Typography>
              </ListItem>
            </List>
          </Stack>

          <Divider />

          <Stack>
            <Typography component="h3" variant="h6" fontWeight={700}>
              Sus Derechos
            </Typography>
            <Typography>De acuerdo con la Ley de Habeas Data, usted tiene derecho a:</Typography>

            <List disablePadding>
              <ListItem>
                <Typography>• Conocer, actualizar y rectificar sus datos personales</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Solicitar prueba de la autorización otorgada</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Revocar la autorización y/o solicitar la supresión del dato</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Acceder de forma gratuita a sus datos personales</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Presentar quejas ante la Superintendencia de Industria y Comercio</Typography>
              </ListItem>
            </List>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <FormControlLabel
              control={<Checkbox checked={hasUserAccepted} onChange={handleAcceptChange} />}
              label={
                <Typography>
                  He leído y acepto la{" "}
                  <Link href="/privacy-policy" underline="hover" target="_blank">
                    Política de Privacidad
                  </Link>{" "}
                  y autorizo el tratamiento de mis datos personales según lo establecido en ella. He leído y acepto los{" "}
                  <Link href="/terms-and-conditions" underline="hover" target="_blank">
                    Términos y Condiciones de Uso
                  </Link>
                  . Autorizo expresamente a Antracker para recopilar, almacenar, usar, procesar y transferir mis datos personales para las
                  finalidades descritas, incluyendo el análisis de mis datos financieros para generar reportes personalizados.
                </Typography>
              }
            />
          </Stack>

          <Alert severity="warning" variant="filled">
            <Typography>
              <strong>Nota:</strong> Su consentimiento es libre, previo, expreso e informado. Puede revocarlo en cualquier momento
              contactándonos o eliminando su cuenta.
            </Typography>
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" size="large" onClick={handleDecline}>
          No Acepto
        </Button>
        <Button variant="contained" size="large" disabled={!hasUserAccepted} onClick={handleAccept}>
          Acepto y Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsentDialog;
