import type { TransactionTemplate, FrequencyUnit } from "@/types/transaction";
import type { KeysToCamelCase } from "@/types/utils";

export type TransactionTemplateFormObject = KeysToCamelCase<Omit<TransactionTemplate, "created_at" | "id" | "user_id" | "times">>;

const TransactionTemplateForm = {
  formKeys: {
    amount: "template-amount",
    categoryId: "template-category-id",
    isSinglePayment: "template-is-single",
    frequencyValue: "template-frequency-value",
    frequencyUnit: "template-frequency-unit",
    startDate: "template-start-date",
    title: "template-title",
    type: "template-type",
  },
  toObject(formData: FormData): TransactionTemplateFormObject {
    const rawAmount = formData.get(this.formKeys.amount) as string;
    const isSinglePayment = formData.get(this.formKeys.isSinglePayment) === "on" || formData.get(this.formKeys.isSinglePayment) === "true";
    const isIncome = formData.get(this.formKeys.type) === "on";

    return {
      isSinglePayment,
      amount: Number(rawAmount.replaceAll(",", "")),
      categoryId: formData.get(this.formKeys.categoryId) as string,
      title: formData.get(this.formKeys.title) as string,
      startDate: (formData.get(this.formKeys.startDate) as string) || null,
      frequencyValue: isSinglePayment ? null : Number(formData.get(this.formKeys.frequencyValue)),
      frequencyUnit: isSinglePayment ? null : (formData.get(this.formKeys.frequencyUnit) as FrequencyUnit),
      type: isIncome ? "income" : "expense",
    };
  },
};

export default TransactionTemplateForm;
