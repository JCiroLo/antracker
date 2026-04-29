import { Alert, Link, Stack, Typography } from "@mui/material";
import useTransactions from "@/hooks/use-transactions";
import useHighlighter from "@/hooks/use-highlighter";
import type { TransactionSummary } from "@/types/transaction";

const ExpirationAlerts = () => {
  const { templates } = useTransactions();
  const highlighter = useHighlighter();

  const expired: TransactionSummary[] = [];
  const closeToExpire = templates.filter((template) => template.is_expiring_soon);

  return (
    <>
      {expired.length > 0 && (
        <Alert severity="error" variant="filled">
          Tienes pagos vencidos:{" "}
          {
            <Stack
              display="inline"
              direction="row"
              flexWrap="wrap"
              divider={
                <Typography component="span" lineHeight={1}>
                  ,&nbsp;
                </Typography>
              }
            >
              {expired.map(({ template }) => (
                <Link
                  key={template.id}
                  component="button"
                  color="warning.contrastText"
                  sx={{ lineHeight: 1, verticalAlign: "baseline" }}
                  onClick={() => highlighter.setId(template.id)}
                >
                  {template.title}
                </Link>
              ))}
            </Stack>
          }
          .
        </Alert>
      )}
      {closeToExpire.length > 0 && (
        <Alert severity="warning" variant="filled" sx={{ mt: 2 }}>
          Tienes pagos que están por vencer:{" "}
          {
            <Stack
              display="inline"
              direction="row"
              flexWrap="wrap"
              divider={
                <Typography component="span" lineHeight={1}>
                  ,&nbsp;
                </Typography>
              }
            >
              {closeToExpire.map(({ template }) => (
                <Link
                  key={template.id}
                  component="button"
                  color="warning.contrastText"
                  sx={{ lineHeight: 1, verticalAlign: "baseline" }}
                  onClick={() => highlighter.setId(template.id)}
                >
                  {template.title}
                </Link>
              ))}
            </Stack>
          }
          .
        </Alert>
      )}
    </>
  );
};

export default ExpirationAlerts;
