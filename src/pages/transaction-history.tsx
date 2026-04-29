import React from "react";
import { Box, List, Typography } from "@mui/material";
import useTransactions from "@/hooks/use-transactions";
import TransactionList from "@/components/layout/transaction-list";

const TransactionHistory = () => {
  const transactions = useTransactions();

  const isFetching = transactions.isLoading;
  const hasRecords = transactions.records.length > 0;

  React.useEffect(() => {
    transactions.queries.records.refetch();
  }, []);

  return isFetching ? (
    <Box height="100%" />
  ) : (
    <List sx={{ flexGrow: 1, overflowY: "auto", marginTop: 1 }} disablePadding>
      {!hasRecords ? (
        <Typography
          component="li"
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        >
          No tienes movimientos registrados.
        </Typography>
      ) : null}
      <TransactionList />
    </List>
  );
};

export default TransactionHistory;
