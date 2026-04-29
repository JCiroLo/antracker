import React from "react";
import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import TemplateTypeIcon from "@/components/layout/template-type-icon";
import CurrencyTools from "@/tools/currency-tools";
import DateTools from "@/tools/date-tools";
import type { Transaction } from "@/types/transaction";

type TransactionListItemProps = {
  record: Transaction;
};

const TransactionListItem: React.FC<TransactionListItemProps> = ({ record }) => {
  const amount = React.useMemo(() => CurrencyTools.format(record.amount), [record]);
  const paidDate = React.useMemo(() => DateTools.format(record.paid_date, "D [de] MMMM"), [record]);

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" alignItems="center">
          <TemplateTypeIcon type={record.template.type} size={16} />
          <Typography component="p" variant="h2" color={record.template.type === "expense" ? "error" : "success"}>
            {amount}
          </Typography>
        </Stack>
      }
    >
      <ListItemText primary={paidDate} secondary={record.title} />
    </ListItem>
  );
};

export default TransactionListItem;
