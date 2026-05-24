import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { sileo } from "sileo";
import useTransactions from "@/hooks/use-transactions";
import Contents from "@/lib/contents";
import type { TransactionTemplate } from "@/types/transaction";

type RemoveTransactionDialogProps = {
  open: boolean;
  onClose: () => void;
  template?: TransactionTemplate;
};

const RemoveTransactionDialog: React.FC<RemoveTransactionDialogProps> = ({ open, template, onClose }) => {
  const { actions } = useTransactions();

  const [isLoading, setIsLoading] = React.useState(false);

  const title = React.useMemo(() => {
    if (template?.type === "expense") {
      return "Eliminar gasto";
    }
    if (template?.type === "income") {
      return "Eliminar ingreso";
    }
    return "";
  }, [template]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!template) {
      sileo.error({ title: Contents.toast.error.expense.deleted });
      return;
    }

    setIsLoading(true);

    try {
      await actions.deleteTemplate(template.id);

      sileo.success({
        title: Contents.toast.success[template.type].deleted,
        duration: 1000,
      });
    } catch {
      sileo.error({ title: Contents.toast.error[template.type].deleted });
    }

    setIsLoading(false);

    onClose();
  }

  return (
    <Dialog maxWidth="sm" open={open} fullWidth onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack id="remove-transaction-form" component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography>¿Estás seguro de que deseas eliminar este {template?.type === "expense" ? "gasto" : "ingreso"}? </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            También se eliminarán los movimientos asociados. Esta acción no se puede deshacer.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" form="remove-transaction-form" loading={isLoading} fullWidth>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveTransactionDialog;
