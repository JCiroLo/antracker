import { List, Stack, Typography } from "@mui/material";
import TransactionList from "@/components/layout/transaction-list";
import useTransactions from "@/hooks/use-transactions";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import Logger from "@/lib/logger";

const TransactionHistory = () => {
  const transactions = useTransactions();

  const isFetching = transactions.isLoading;
  const hasRecords = transactions.records.length > 0;

  const infiniteScroll = useInfiniteScroll({
    async onIntersection(page) {
      Logger.log("fetching next page", page);
      await transactions.queries.records.fetch({ page });
    },
  });

  return (
    <List sx={{ flexGrow: 1, overflowY: "auto", marginTop: 1 }} disablePadding>
      {!isFetching && !hasRecords ? (
        <Stack
          component="li"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center", height: "calc(100% - 32px)" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            No tienes movimientos registrados.
          </Typography>
        </Stack>
      ) : null}
      <TransactionList />
      <Stack
        ref={infiniteScroll.observer.ref}
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
