import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  InputAdornment,
  DialogTitle,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { sileo } from "sileo";
import dayjs from "dayjs";
import useCategories from "@/hooks/use-categories";
import useTransactions from "@/hooks/use-transactions";
import CategoryForm from "@/forms/category-form";
import TransactionTemplateForm from "@/forms/transaction-template-form";
import $Category from "@/services/category";
import useSessionStore from "@/stores/use-session-store";
import Contents from "@/lib/contents";
import type { TransactionTemplate, TransactionType } from "@/types/transaction";
import type { Category } from "@/types/category";

type TransactionFormDialogProps = {
  open: boolean;
  onClose: () => void;
  template?: TransactionTemplate;
};

const TransactionFormDialog: React.FC<TransactionFormDialogProps> = ({ open, onClose, template }) => {
  const user = useSessionStore((state) => state.user);
  const categories = useCategories();
  const { actions } = useTransactions();

  const [isSinglePayment, setIsSinglePayment] = useState(template?.is_single_payment || false);
  const [isIncome, setIsIncome] = useState(false);
  const [category, setCategory] = useState<string | "add-category" | "none">(template?.category_id || "none");
  const [isLoading, setIsLoading] = useState(false);

  const title = useMemo(() => {
    if (isIncome && !template) {
      return "Nuevo ingreso";
    } else if (!isIncome && !template) {
      return "Nuevo gasto";
    } else if (isIncome && template) {
      return "Editar ingreso";
    } else if (!isIncome && template) {
      return "Editar gasto";
    }
    return "";
  }, [template, isIncome]);

  useEffect(() => {
    if (template) {
      setIsSinglePayment(template.is_single_payment);
      setIsIncome(template.type === "income");
      setCategory(template.category_id || "none");
    } else {
      setIsSinglePayment(false);
      setIsIncome(false);
      setCategory("none");
    }
  }, [template]);

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const formCategory = CategoryForm.toObject(formData);
    const formTemplate = TransactionTemplateForm.toObject(formData);

    if (Number.isNaN(formTemplate.amount) || !formTemplate.title || !formTemplate.amount) {
      setIsLoading(false);
      return;
    }

    if (!formTemplate.isSinglePayment && (!formTemplate.frequencyValue || !formTemplate.frequencyUnit || !formTemplate.startDate)) {
      setIsLoading(false);
      return;
    }

    let newCategory: Category | null = null;

    if (formTemplate.categoryId === "add-category") {
      if (!formCategory.name) {
        setIsLoading(false);
        return;
      }

      try {
        newCategory = await $Category.create({ name: formCategory.name, color: formCategory.color, user_id: user.uid });
      } catch {
        setIsLoading(false);
        return;
      }
    }

    const categoryId = newCategory ? newCategory.id : formTemplate.categoryId === "none" ? null : formTemplate.categoryId;

    const payload = {
      amount: formTemplate.amount,
      category_id: categoryId,
      frequency_unit: formTemplate.frequencyUnit,
      frequency_value: formTemplate.frequencyValue,
      is_single_payment: formTemplate.isSinglePayment,
      start_date: formTemplate.startDate,
      title: formTemplate.title,
      type: (isIncome ? "income" : "expense") as TransactionType,
    };

    if (template) {
      try {
        await actions.updateTemplate(template.id, payload);

        sileo.success({ title: Contents.toast.success[template.type].updated, duration: 1000 });
      } catch {
        sileo.error({ title: Contents.toast.error[template.type].updated });
      }
    } else {
      try {
        await actions.createTemplate({ ...payload, user_id: user.uid });

        sileo.success({ title: Contents.toast.success[payload.type].created, duration: 1000 });
      } catch {
        sileo.error({ title: Contents.toast.error[payload.type].created });
      }
    }

    setIsLoading(false);
    onClose();
  }

  return (
    <Dialog maxWidth="sm" open={open} fullWidth onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack id="transaction-form" component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <TextField label="Título" name={TransactionTemplateForm.formKeys.title} fullWidth required defaultValue={template?.title} />
            <NumericFormat
              customInput={TextField}
              label="Monto"
              name={TransactionTemplateForm.formKeys.amount}
              sx={{ width: "100%" }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              thousandSeparator
              fullWidth
              required
              defaultValue={template?.amount}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name={TransactionTemplateForm.formKeys.type}
                  checked={isIncome}
                  onChange={(event) => setIsIncome(event.target.checked)}
                />
              }
              label="Es un ingreso"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name={TransactionTemplateForm.formKeys.isSinglePayment}
                  checked={isSinglePayment}
                  onChange={(event) => setIsSinglePayment(event.target.checked)}
                />
              }
              label={isIncome ? "Es un ingreso único" : "Es un gasto unico"}
            />

            {!isSinglePayment && (
              <>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Se repite cada"
                    type="number"
                    name={TransactionTemplateForm.formKeys.frequencyValue}
                    defaultValue={template?.frequency_value || 1}
                    fullWidth
                    required
                  />
                  <TextField
                    select
                    label="Unidad"
                    name={TransactionTemplateForm.formKeys.frequencyUnit}
                    defaultValue={template?.frequency_unit || "months"}
                    fullWidth
                    required
                  >
                    <MenuItem value="days">Días</MenuItem>
                    <MenuItem value="weeks">Semanas</MenuItem>
                    <MenuItem value="months">Meses</MenuItem>
                    <MenuItem value="years">Años</MenuItem>
                  </TextField>
                </Stack>
                <TextField
                  label="Fecha inicial"
                  type="date"
                  name={TransactionTemplateForm.formKeys.startDate}
                  defaultValue={template?.start_date ? dayjs(template.start_date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")}
                  fullWidth
                  required
                />
              </>
            )}

            <TextField
              label="Categoría"
              name={TransactionTemplateForm.formKeys.categoryId}
              value={category}
              select
              fullWidth
              onChange={handleCategoryChange}
            >
              <MenuItem value="none">Sin categoría</MenuItem>
              {categories.values.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem value="add-category">Agregar categoría</MenuItem>
            </TextField>

            {category === "add-category" && (
              <TextField label="Nombre de la categoría" name={CategoryForm.formKeys.name} fullWidth required />
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" form="transaction-form" loading={isLoading} fullWidth>
          {template ? "Editar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionFormDialog;
