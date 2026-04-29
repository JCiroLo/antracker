import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Paper, Stack, List, ListItem, Breadcrumbs, Link } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="sm">
      <Stack component={Paper} spacing={4} p={4} my={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Antracker
          </Link>
          <Typography>Términos y Condiciones de Uso</Typography>
        </Breadcrumbs>

        <Stack>
          <Typography component="h1" variant="h4">
            Términos y Condiciones de Uso
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Última actualización: 17/10/2025
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            1. Aceptación de los Términos
          </Typography>
          <Typography>
            Al acceder y utilizar Antracker ("la aplicación", "el servicio"), usted acepta estar sujeto a estos Términos y Condiciones de
            Uso y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar esta
            aplicación.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            2. Descripción del Servicio
          </Typography>
          <Typography>Antracker es una aplicación de seguimiento financiero personal que permite a los usuarios:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Registrar ingresos y gastos personales</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Crear categorías personalizadas de gastos</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Generar reportes y análisis financieros</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Visualizar datos a través de gráficos y estadísticas</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Gestionar plantillas de ingresos y gastos recurrentes</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            3. Registro y Cuenta de Usuario
          </Typography>
          <Typography>Para utilizar la aplicación, debe:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Proporcionar información precisa y actualizada</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Mantener la confidencialidad de su cuenta</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Ser responsable de todas las actividades en su cuenta</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Notificarnos inmediatamente sobre cualquier uso no autorizado</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Tener al menos 18 años de edad</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            4. Uso Aceptable
          </Typography>
          <Typography>
            Usted se compromete a utilizar la aplicación únicamente para fines legítimos y de acuerdo con estos términos. Está prohibido:
          </Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Utilizar la aplicación para actividades ilegales o no autorizadas</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Intentar acceder a sistemas o datos de otros usuarios</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Interferir con el funcionamiento de la aplicación</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Transmitir virus, malware o código malicioso</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Realizar ingeniería inversa o descompilar la aplicación</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Utilizar la aplicación para comercializar servicios competitivos</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            5. Propiedad Intelectual
          </Typography>
          <Typography mb={2}>
            La aplicación y todo su contenido, incluyendo pero no limitado a texto, gráficos, logos, iconos, imágenes, clips de audio,
            compilaciones de datos y software, son propiedad de Antracker y están protegidos por las leyes de derechos de autor y marcas
            registradas.
          </Typography>
          <Typography>
            Usted conserva la propiedad de los datos que ingresa en la aplicación, pero nos otorga una licencia limitada para procesar,
            almacenar y mostrar estos datos para proporcionar el servicio.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            6. Privacidad y Protección de Datos
          </Typography>
          <Typography>
            El tratamiento de sus datos personales se rige por nuestra Política de Privacidad, que forma parte integral de estos términos.
            Al utilizar la aplicación, usted consiente el tratamiento de sus datos de acuerdo con dicha política y la Ley 1581 de 2012 (Ley
            de Habeas Data) de Colombia.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            7. Disponibilidad del Servicio
          </Typography>
          <Typography>
            Nos esforzamos por mantener la aplicación disponible las 24 horas del día, los 7 días de la semana. Sin embargo, no garantizamos
            la disponibilidad continua y podemos:
          </Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Realizar mantenimiento programado</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Experimentar interrupciones técnicas</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Modificar o discontinuar el servicio con notificación previa</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            8. Limitación de Responsabilidad
          </Typography>
          <Typography>En la máxima medida permitida por la ley, Antracker no será responsable por:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Pérdidas financieras derivadas del uso de la aplicación</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Interrupciones del servicio o pérdida de datos</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Decisiones tomadas basándose en los reportes generados</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Daños indirectos, incidentales o consecuenciales</Typography>
            </ListItem>
          </List>
          <Typography mt={2}>La aplicación se proporciona "tal como está" sin garantías de ningún tipo.</Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            9. Indemnización
          </Typography>
          <Typography>
            Usted acepta indemnizar y eximir de responsabilidad a Antracker, sus directores, empleados y agentes de cualquier reclamo, daño,
            pérdida, responsabilidad y gasto (incluyendo honorarios de abogados) que surja de su uso de la aplicación o violación de estos
            términos.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            10. Terminación
          </Typography>
          <Typography>
            Podemos suspender o terminar su acceso a la aplicación inmediatamente, sin previo aviso, por cualquier motivo, incluyendo:
          </Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Violación de estos términos</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Uso fraudulento o abusivo</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Actividades ilegales</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Solicitud del usuario</Typography>
            </ListItem>
          </List>
          <Typography mt={2}>
            Usted puede terminar su cuenta en cualquier momento eliminando su cuenta desde la configuración de la aplicación.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            11. Modificaciones
          </Typography>
          <Typography>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente
            después de su publicación en la aplicación. Su uso continuado de la aplicación constituye aceptación de los términos
            modificados.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            12. Ley Aplicable y Jurisdicción
          </Typography>
          <Typography>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta por los tribunales
            competentes de Colombia.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            13. Disposiciones Generales
          </Typography>
          <Typography>
            Si alguna disposición de estos términos es considerada inválida o inaplicable, las disposiciones restantes permanecerán en pleno
            vigor y efecto. Estos términos constituyen el acuerdo completo entre usted y Antracker.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            14. Contacto
          </Typography>
          <Typography>Para preguntas sobre estos Términos y Condiciones, puede contactarnos en:</Typography>
          <List disablePadding>
            <ListItem disableGutters>
              <Typography>
                <strong>Correo electrónico:</strong> juanciro35@gmail.com
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography>
                <strong>Teléfono:</strong> +57 310 531 75 45
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Container>
  );
};

export default TermsAndConditions;
