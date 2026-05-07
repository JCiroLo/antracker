import { useMemo, useState } from "react";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { sileo } from "sileo";
import dayjs from "dayjs";
import CheckIcon from "@/components/icons/check-icon";
import EditIcon from "@/components/icons/edit-icon";
import TimesIcon from "@/components/icons/times-icon";
import TrashIcon from "@/components/icons/trash-icon";
import PendingTransactionsListItem from "@/components/layout/pending-transactions-list-item";
import useDialog from "@/hooks/use-dialog";
import useTransactions from "@/hooks/use-transactions";
import Contents from "@/lib/contents";
import type { TransactionSummary, TransactionTemplate } from "@/types/transaction";

const PendingTransactionsList = () => {
  const dialog = useDialog();
  const { actions, templates } = useTransactions();

  const [menuAnchor, setMenuAnchor] = useState({
    transaction: null as TransactionSummary | null,
    element: null as HTMLElement | null,
  });
  const [isLoading, setIsLoading] = useState({
    template: null as TransactionTemplate | null,
  });

  const isSelectedTemplateIncome = useMemo(() => menuAnchor.transaction?.template.type === "income", [menuAnchor.transaction]);

  function handleMenuOpen(event: React.MouseEvent<HTMLElement>, transaction: TransactionSummary) {
    setMenuAnchor({
      transaction: transaction,
      element: event.currentTarget,
    });
  }

  function handleMenuClose() {
    setMenuAnchor((prev) => ({
      ...prev,
      element: null,
    }));
  }

  async function handleMarkAsPaid(template: TransactionTemplate) {
    setIsLoading((prev) => ({ ...prev, template }));

    if (!template) {
      sileo.error({ title: Contents.toast.error.expense.checked });
      return;
    }

    try {
      await actions.createRecord({
        amount: template.amount,
        title: template.title,
        category_id: template.category_id,
        paid_date: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
        template_id: template.id,
        user_id: template.user_id,
        times: 1,
      });

      sileo.success({ title: Contents.toast.success[template.type].checked, duration: 1000 });
    } catch (e) {
      console.log(e);

      sileo.error({ title: Contents.toast.error[template.type].checked });
    }

    setIsLoading((prev) => ({ ...prev, template: null }));
  }

  async function handleMarkAsUnpaid(transaction: TransactionSummary) {
    const template = transaction.template;
    const record = transaction.record;

    if (!record || !template) {
      sileo.error({ title: Contents.toast.error[template.type].unchecked });
      return;
    }

    setIsLoading((prev) => ({ ...prev, template }));

    try {
      await actions.deleteRecord(record.id, template);

      sileo.success({ title: Contents.toast.success[template.type].unchecked, duration: 1000 });
    } catch {
      sileo.error({ title: Contents.toast.error[template.type].unchecked });
    }

    setIsLoading((prev) => ({ ...prev, template: null }));
  }

  return (
    <>
      {templates.map((transaction) => (
        <PendingTransactionsListItem
          key={transaction.template.id}
          transaction={transaction}
          loading={isLoading.template?.id === transaction.template.id}
          onCheck={handleMarkAsPaid}
          onMenu={handleMenuOpen}
        />
      ))}
      <Menu open={Boolean(menuAnchor.element)} anchorEl={menuAnchor.element} onClose={handleMenuClose}>
        {menuAnchor.transaction?.is_paid ? (
          <MenuItem
            disabled={menuAnchor.transaction?.template?.is_single_payment}
            onClick={() => {
              if (!menuAnchor.transaction) return;
              handleMarkAsUnpaid(menuAnchor.transaction);
              handleMenuClose();
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <TimesIcon fontSize="small" />
            </ListItemIcon>
            Marcar como no pagado
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              if (!menuAnchor.transaction?.template) return;
              handleMarkAsPaid(menuAnchor.transaction.template);
              handleMenuClose();
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            Marcar como pagado
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            if (!menuAnchor.transaction?.template) return;
            dialog.open("manage-transaction-template", menuAnchor.transaction.template);
            handleMenuClose();
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar {isSelectedTemplateIncome ? "ingreso" : "gasto"}
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (!menuAnchor.transaction?.template) return;
            dialog.open("remove-transaction-template", menuAnchor.transaction.template);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <TrashIcon fontSize="small" color="error" />
          </ListItemIcon>
          Eliminar {isSelectedTemplateIncome ? "ingreso" : "gasto"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default PendingTransactionsList;
