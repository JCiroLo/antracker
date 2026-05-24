import React from "react";
import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import TemplateTypeIcon from "@/components/layout/template-type-icon";
import CurrencyTools from "@/tools/currency-tools";
import DateTools from "@/tools/date-tools";
import type { Transaction } from "@/types/transaction";

type TransactionListItemProps = {
  record: Transaction;
};

const TransactionListItem: React.FC<TransactionListItemProps> = ({ record }) => {
  const isSameYear = DateTools.year === dayjs(record.paid_date).year();
  const amount = React.useMemo(() => CurrencyTools.format(record.amount), [record]);
  const paidDate = React.useMemo(() => DateTools.format(record.paid_date, isSameYear ? "D [de] MMMM" : "D [de] MMMM [de] YYYY"), [record]);

  return (
    <ListItem
      secondaryAction={
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <Typography component="p" variant="h2" color={record.template.type === "expense" ? "error" : "success"}>
            {amount}
          </Typography>
          <TemplateTypeIcon type={record.template.type} size={16} />
        </Stack>
      }
    >
      <ListItemText primary={paidDate} secondary={record.title} />
    </ListItem>
  );
};

export default TransactionListItem;
