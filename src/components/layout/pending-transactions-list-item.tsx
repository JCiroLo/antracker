import React, { useMemo } from "react";
import { Checkbox, CircularProgress, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material";
import TemplateTypeIcon from "@/components/layout/template-type-icon";
import EllipsisIcon from "@/components/icons/ellipsis-icon";
import useHighlighter from "@/hooks/use-highlighter";
import CurrencyTools from "@/tools/currency-tools";
import DateTools from "@/tools/date-tools";
import type { TransactionSummary, TransactionTemplate } from "@/types/transaction";

type PendingTransactionsListItemProps = {
  transaction: TransactionSummary;
  loading: boolean;
  onCheck: (template: TransactionTemplate) => void;
  onMenu: (event: React.MouseEvent<HTMLElement>, transaction: TransactionSummary) => void;
};

const PendingTransactionsListItem: React.FC<PendingTransactionsListItemProps> = ({ transaction, loading, onCheck, onMenu }) => {
  const template = transaction.template;

  const highlighter = useHighlighter();

  const helperText = useMemo(() => {
    if (transaction.template.type === "expense") {
      if (transaction.is_paid) return "Pagado";

      if (template.is_single_payment || !template.frequency_unit) {
        return `Pago único pendiente`;
      }

      if (template.frequency_unit === "years") {
        return `Vence en ${DateTools.format(transaction.current_period_end, "MMMM [de] YYYY")}`;
      }

      return `Vence el ${DateTools.format(transaction.current_period_end, "D [de] MMMM")}`;
    } else if (transaction.template.type === "income") {
      if (transaction.is_paid) return "Pago recibido";

      if (template.is_single_payment || !template.frequency_unit) {
        return `Ingreso único pendiente`;
      }

      if (template.frequency_unit === "years") {
        return `Ingreso esperado en ${DateTools.format(transaction.current_period_end, "MMMM [de] YYYY")}`;
      }

      return `Ingreso esperado el ${DateTools.format(transaction.current_period_end, "D [de] MMMM")}`;
    }
    return "";
  }, [transaction, template]);

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" color="inherit" onClick={(event) => onMenu(event, transaction)}>
          <EllipsisIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        selected={highlighter.id === template.id}
        disabled={transaction.is_paid || loading}
        sx={{ borderRadius: 1 }}
        dense
        disableGutters
        onClick={() => onCheck(template)}
      >
        {loading ? (
          <CircularProgress size={42} sx={{ padding: "9px" }} />
        ) : (
          <Checkbox checked={transaction.is_paid} tabIndex={-1} disableRipple />
        )}
        <TemplateTypeIcon type={template.type} />
        <ListItemText primary={`${template.title} - ${CurrencyTools.format(template.amount)}`} secondary={helperText} />
      </ListItemButton>
    </ListItem>
  );
};

export default PendingTransactionsListItem;
