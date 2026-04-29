import React from "react";
import { TransactionContext } from "@/providers/transaction-provider";

const useTransactions = () => {
  return React.useContext(TransactionContext);
};

export default useTransactions;
