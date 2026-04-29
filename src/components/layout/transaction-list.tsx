import { Fragment } from "react";
import TransactionListItem from "@/components/layout/transaction-list-item";
import useTransactions from "@/hooks/use-transactions";
import { Divider } from "@mui/material";

const TransactionList = () => {
  const { records } = useTransactions();

  return (
    <>
      {records.map((record) => (
        <Fragment key={record.id}>
          <TransactionListItem record={record} />
          <Divider variant="middle" component="li" />
        </Fragment>
      ))}
    </>
  );
};

export default TransactionList;
