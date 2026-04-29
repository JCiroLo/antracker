import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Paper, Stack, List, ListItem, Breadcrumbs, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="sm">
      <Stack component={Paper} spacing={4} p={4} my={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Antracker
          </Link>
          <Typography>Política de Privacidad</Typography>
        </Breadcrumbs>
        <Stack>
          <Typography component="h1" variant="h4">
            Política de Privacidad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Última actualización: 17/10/2025
          </Typography>
        </Stack>
        <Stack>
          <Typography component="h2" variant="h6">
            1. Información General
          </Typography>
          <Typography mb={2}>
            Antracker ("nosotros", "nuestro" o "la aplicación") se compromete a proteger la privacidad y los datos personales de nuestros
            usuarios de acuerdo con la Ley 1581 de 2012 (Ley de Habeas Data) y el Decreto 1377 de 2013 de la República de Colombia.
          </Typography>
          <Typography gutterBottom>
            Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información personal cuando utiliza
            nuestra aplicación de seguimiento financiero personal.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            2. Datos Personales que Recopilamos
          </Typography>
          <Typography>Recopilamos los siguientes tipos de información personal:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>
                • <strong>Información de identificación:</strong> Dirección de correo electrónico
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Datos financieros:</strong> Ingresos, gastos, categorías de gastos, montos y fechas
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Datos de uso:</strong> Información sobre cómo utiliza la aplicación
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Datos técnicos:</strong> Dirección IP, tipo de dispositivo, sistema operativo
              </Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            3. Finalidades del Tratamiento
          </Typography>
          <Typography>Utilizamos sus datos personales para las siguientes finalidades:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Proporcionar y mantener el servicio de seguimiento financiero</Typography>
            </ListItem>

            <ListItem>
              <Typography>• Crear y gestionar su cuenta de usuario</Typography>
            </ListItem>

            <ListItem>
              <Typography>• Generar reportes y análisis financieros personalizados</Typography>
            </ListItem>

            <ListItem>
              <Typography>• Mejorar la funcionalidad y experiencia del usuario</Typography>
            </ListItem>

            <ListItem>
              <Typography>• Cumplir con obligaciones legales y regulatorias</Typography>
            </ListItem>

            <ListItem>
              <Typography>• Comunicarnos con usted sobre actualizaciones del servicio</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            4. Base Legal del Tratamiento
          </Typography>
          <Typography>El tratamiento de sus datos personales se basa en:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>
                • <strong>Consentimiento:</strong> Su consentimiento libre, previo, expreso e informado
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Ejecución contractual:</strong> Para cumplir con las obligaciones del contrato de servicio
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraudes
              </Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            5. Compartir Información
          </Typography>
          <Typography>
            No vendemos, alquilamos ni compartimos sus datos personales con terceros, excepto en los siguientes casos:
          </Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Con su consentimiento explícito</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Para cumplir con obligaciones legales</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • Con proveedores de servicios que nos ayudan a operar la aplicación (bajo acuerdos de confidencialidad)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>• En caso de fusión, adquisición o venta de activos</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            6. Seguridad de los Datos
          </Typography>
          <Typography>Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Encriptación de datos en tránsito y en reposo</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Acceso restringido a datos personales</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Monitoreo regular de seguridad</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Capacitación del personal en protección de datos</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            7. Sus Derechos
          </Typography>
          <Typography>De acuerdo con la Ley de Habeas Data, usted tiene los siguientes derechos:</Typography>
          <List disablePadding>
            <ListItem>
              <Typography>
                • <strong>Conocimiento:</strong> Conocer qué datos tenemos sobre usted
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Acceso:</strong> Acceder a sus datos personales
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Rectificación:</strong> Corregir datos inexactos o incompletos
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Solicitud de supresión:</strong> Solicitar la eliminación de sus datos
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Revocación:</strong> Revocar su consentimiento en cualquier momento
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                • <strong>Reclamo:</strong> Presentar reclamos ante la Superintendencia de Industria y Comercio
              </Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            8. Retención de Datos
          </Typography>
          <Typography>
            Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política, o
            según lo requiera la ley. Los datos se eliminarán cuando:
          </Typography>
          <List disablePadding>
            <ListItem>
              <Typography>• Usted solicite la eliminación de su cuenta</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Su cuenta permanezca inactiva por más de 2 años</Typography>
            </ListItem>
            <ListItem>
              <Typography>• Se cumplan los plazos legales de retención</Typography>
            </ListItem>
          </List>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            9. Transferencias Internacionales
          </Typography>
          <Typography>
            Sus datos pueden ser transferidos y procesados en países fuera de Colombia. Cuando esto ocurra, nos aseguraremos de que existan
            garantías adecuadas para proteger sus datos personales, incluyendo cláusulas contractuales estándar aprobadas por la autoridad
            competente.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            10. Menores de Edad
          </Typography>
          <Typography>
            Nuestro servicio no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de menores de edad.
            Si descubrimos que hemos recopilado datos de un menor, los eliminaremos inmediatamente.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            11. Cambios a esta Política
          </Typography>
          <Typography>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios significativos a través de la
            aplicación o por correo electrónico. La fecha de la última actualización se muestra al inicio de este documento.
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h2" variant="h6">
            12. Contacto
          </Typography>
          <Typography mb={2}>
            Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, puede contactarnos en:
          </Typography>
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

        <Stack>
          <Typography component="h2" variant="h6">
            13. Autoridad de Control
          </Typography>
          <Typography mb={2}>
            Si considera que el tratamiento de sus datos personales no cumple con la normativa vigente, puede presentar una queja ante la
            Superintendencia de Industria y Comercio (SIC) de Colombia:
          </Typography>
          <List disablePadding>
            <ListItem disableGutters>
              <Typography>
                <strong>Sitio web:</strong> www.sic.gov.co
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography>
                <strong>Dirección:</strong> Carrera 13 No. 27-00, Bogotá D.C.
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography>
                <strong>Teléfono:</strong> (601) 587 0000
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;
