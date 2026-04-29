import { Box, List, Typography } from "@mui/material";
import ExpirationAlerts from "@/components/layout/expiration-alerts";
import FeaturesModal from "@/components/dialogs/features-modal";
import PendingTransactionsList from "@/components/layout/pending-transactions-list";
import useTransactions from "@/hooks/use-transactions";

const Home = () => {
  const transations = useTransactions();

  const isFetching = transations.isLoading;
  const hasExpenses = transations.templates.length > 0;

  return (
    <>
      <ExpirationAlerts />
      {isFetching ? (
        <Box height="100%" />
      ) : (
        <List sx={{ flexGrow: 1, overflowY: "auto", marginTop: 1 }} disablePadding>
          {!hasExpenses ? (
            <Typography
              component="li"
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
            >
              No tienes pagos ni ingresos pendientes.
            </Typography>
          ) : null}
          <PendingTransactionsList />
        </List>
      )}
      <FeaturesModal />
    </>
  );
};

export default Home;
