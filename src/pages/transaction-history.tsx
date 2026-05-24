import { List, Stack, Typography } from "@mui/material";
import TransactionList from "@/components/layout/transaction-list";
import useTransactions from "@/hooks/use-transactions";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import Logger from "@/lib/logger";

const TransactionHistory = () => {
  const transactions = useTransactions();

  const isFetching = transactions.isLoading;
  const hasRecords = transactions.records.length > 0;

  const { observer } = useInfiniteScroll({
    async onIntersection(page) {
      Logger.log("fetching next page", page);
      await transactions.queries.records.fetch({ page });
    },
  });

  return (
    <List sx={{ flexGrow: 1, overflowY: "auto", marginTop: 1 }} disablePadding>
      {!isFetching && !hasRecords ? (
        <Typography
          component="li"
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100% - 16px)",
          }}
        >
          No tienes movimientos registrados.
        </Typography>
      ) : null}
      <TransactionList />
      <Stack
        ref={observer.ref}
        component="li"
        sx={{
          alignItems: "center",
          marginTop: 2,
          height: "1px",
        }}
      />
    </List>
  );
};

export default TransactionHistory;
