import xior from "@/lib/xior";
import type { Transaction, NewTransactionRecord, UpdateTransactionRecord } from "@/types/transaction";

type GetAllOptions = {
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
};

type GetByTemplateOptions = GetAllOptions & {
  templateId: string | string[];
};

const $TransactionRecord = {
  async get(id: string) {
    const { data } = await xior.get<Transaction>(`/transaction-records/${id}`);

    return data;
  },
  async getAll(options: GetAllOptions) {
    const { data } = await xior.get<Transaction[]>("/transaction-records", { params: options });

    return data;
  },
  async getByTemplate({ templateId, startDate, endDate, limit, offset }: GetByTemplateOptions) {
    const { data } = await xior.get<Transaction[]>(`/transaction-templates/${templateId}/transaction-records`, {
      params: { startDate, endDate, limit, offset },
    });

    return data;
  },
  async create(record: NewTransactionRecord) {
    const { data } = await xior.post<Transaction>("/transaction-records", record);

    return data;
  },
  async update(id: string, record: UpdateTransactionRecord) {
    const { data } = await xior.put<Transaction>(`/transaction-records/${id}`, record);

    return data;
  },
  async delete(id: string) {
    await xior.delete(`/transaction-records/${id}`);

    return { id };
  },
};

export default $TransactionRecord;
