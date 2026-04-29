import xior from "@/lib/xior";
import ArrayTools from "@/tools/array-tools";
import type { TransactionSummary, NewTransactionTemplate, UpdateTransactionTemplate } from "@/types/transaction";

const $TransactionTemplate = {
  async get(id: string) {
    const { data } = await xior.get<TransactionSummary[]>(`/transaction-templates/${id}`);

    return data[0];
  },
  async getAll() {
    const { data } = await xior.get<TransactionSummary[]>("/transaction-templates");

    return data;
  },
  async getAllIndexed() {
    const data = await this.getAll();

    return ArrayTools.indexBy(data, ({ template }) => template.id);
  },
  async create(template: NewTransactionTemplate) {
    const { data } = await xior.post<TransactionSummary[]>("/transaction-templates", template);

    return data[0];
  },
  async update(id: string, template: UpdateTransactionTemplate) {
    const { data } = await xior.put<TransactionSummary[]>(`/transaction-templates/${id}`, template);

    return data[0];
  },
  async delete(id: string) {
    await xior.delete(`/transaction-templates/${id}`);

    return { id };
  },
};

export default $TransactionTemplate;
