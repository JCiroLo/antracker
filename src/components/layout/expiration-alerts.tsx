import { useMemo } from "react";
import { Alert, Collapse, IconButton, Link, Stack, Typography } from "@mui/material";
import TimesIcon from "@/components/icons/times-icon";
import useTransactions from "@/hooks/use-transactions";
import useHighlighter from "@/hooks/use-highlighter";
import useSettingsStore from "@/stores/use-settings-store";
import type { TransactionSummary } from "@/types/transaction";

const ExpirationAlerts = () => {
  const { templates } = useTransactions();
  const highlighter = useHighlighter();
  const settingsStore = useSettingsStore();

  const expired: TransactionSummary[] = [];
  const closeToExpire = templates.filter((template) => template.is_expiring_soon);

  const showAlert = useMemo(
    () => settingsStore.isAlertOpen("expiringSoon"),
    [settingsStore.alerts],
  );

  function handleCloseAlert() {
    settingsStore.closeAlert("expiringSoon");
  }

  return (
    <>
      {expired.length > 0 && (
        <Alert severity="error" variant="filled">
          Tienes pagos vencidos:{" "}
          {
            <Stack
              direction="row"
              divider={
                <Typography
                  component="span"
                  sx={{
                    lineHeight: 1,
                  }}
                >
                  ,&nbsp;
                </Typography>
              }
              sx={{
                display: "inline",
                flexWrap: "wrap",
              }}
            >
              {expired.map(({ template }) => (
                <Link
                  key={template.id}
                  component="button"
                  onClick={() => highlighter.setId(template.id)}
                  sx={{
                    color: "warning.contrastText",
                    lineHeight: 1,
                    verticalAlign: "baseline",
                  }}
                >
                  {template.title}
                </Link>
              ))}
            </Stack>
          }
          .
        </Alert>
      )}
      <Collapse
        in={closeToExpire.length > 0 && showAlert}
        unmountOnExit
        style={{ minHeight: "unset" }}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ marginTop: 1 }}
          slotProps={{ message: { sx: { width: "100%" } } }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}
          >
            <Typography>
              Tienes pagos que están por vencer:{" "}
              <Stack
                component="span"
                direction="row"
                divider={
                  <Typography
                    component="span"
                    sx={{
                      lineHeight: 1,
                    }}
                  >
                    ,&nbsp;
                  </Typography>
                }
                sx={{
                  display: "inline",
                  flexWrap: "wrap",
                }}
              ></Stack>
              {closeToExpire.map(({ template }) => (
                <Link
                  key={template.id}
                  component="button"
                  onClick={() => highlighter.setId(template.id)}
                  sx={{
                    color: "warning.contrastText",
                    lineHeight: 1,
                    verticalAlign: "baseline",
                  }}
                >
                  {template.title}
                </Link>
              ))}
              .
            </Typography>
            <IconButton size="small" onClick={handleCloseAlert}>
              <TimesIcon sx={{ color: "background.default" }}></TimesIcon>
            </IconButton>
          </Stack>
        </Alert>
      </Collapse>
    </>
  );
};

export default ExpirationAlerts;
