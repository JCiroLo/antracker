import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import $TransactionRecord from "@/services/transaction-record";
import $TransactionTemplate from "@/services/transaction-template";
import useSessionStore from "@/stores/use-session-store";
import queryClient from "@/lib/query-client";
import Logger from "@/lib/logger";
import type {
  NewTransactionRecord,
  NewTransactionTemplate,
  Transaction,
  TransactionSummary,
  TransactionTemplate,
  UpdateTransactionRecord,
  UpdateTransactionTemplate,
} from "@/types/transaction";

type TransactionContextType = {
  actions: {
    createRecord: (record: NewTransactionRecord) => Promise<void>;
    createTemplate: (template: NewTransactionTemplate) => Promise<void>;
    deleteRecord: (id: string, template: TransactionTemplate) => Promise<void>;
    deleteTemplate: (id: string) => Promise<void>;
    refreshRecords: () => Promise<void>;
    refreshTemplates: () => Promise<void>;
    updateRecord: (id: string, record: UpdateTransactionRecord) => Promise<void>;
    updateTemplate: (id: string, template: UpdateTransactionTemplate) => Promise<void>;
  };
  isLoading: boolean;
  queries: {
    templates: ReturnType<typeof useQuery>;
    records: ReturnType<typeof useQuery>;
  };
  templates: TransactionSummary[];
  records: Transaction[];
};

type TransactionProviderProps = {
  children: React.ReactNode;
};

const defaultTemplates = [] as TransactionSummary[];

const TransactionContext = React.createContext<TransactionContextType>(null!);

const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const user = useSessionStore((state) => state.user);

  const templates = useQuery({
    queryKey: ["fetch-transaction-templates", user?.uid],
    queryFn: async () => {
      if (!user) {
        return defaultTemplates;
      }

      const data = await $TransactionTemplate.getAll();

      Logger.log("fetched transactions", data);

      return data;
    },
  });

  const records = useQuery({
    enabled: false,
    queryKey: ["fetch-transaction-records", user?.uid],
    queryFn: async () => {
      if (!user) {
        return [] as Transaction[];
      }

      const data = await $TransactionRecord.getAll({
        limit: 20,
        offset: 0,
      });

      Logger.log("fetched transactions", data);

      return data;
    },
  });

  const filteredTemplates = useMemo(() => {
    if (!templates.data) return defaultTemplates;

    return templates.data;
  }, [templates.data]);

  async function refreshTemplate(template: TransactionTemplate) {
    const updatedTransactionSummary = await $TransactionTemplate.get(template.id);

    Logger.log("updated template", updatedTransactionSummary);

    queryClient.setQueryData(["fetch-transaction-templates", user?.uid], (oldData: TransactionSummary[]) => {
      if (!oldData) return oldData;

      return oldData.map((transactionSummary) =>
        transactionSummary.template.id === template.id ? updatedTransactionSummary : transactionSummary,
      ) as TransactionSummary[];
    });
  }

  async function refreshTemplates() {
    await queryClient.invalidateQueries({ queryKey: ["fetch-transaction-templates", user?.uid] });
  }

  async function createTemplate(template: NewTransactionTemplate) {
    const newTransactionSummary = await $TransactionTemplate.create(template);

    Logger.log("created template", newTransactionSummary);

    queryClient.setQueryData(["fetch-transaction-templates", user?.uid], (oldData: TransactionSummary[]) => {
      if (!oldData) return oldData;

      return [...oldData, newTransactionSummary] as TransactionSummary[];
    });
  }

  async function updateTemplate(id: string, template: UpdateTransactionTemplate) {
    const newTransactionSummary = await $TransactionTemplate.update(id, template);

    Logger.log("updated template", newTransactionSummary);

    queryClient.setQueryData(["fetch-transaction-templates", user?.uid], (oldData: TransactionSummary[]) => {
      if (!oldData) return oldData;

      return oldData.map((transactionSummary) =>
        transactionSummary.template.id === id ? newTransactionSummary : transactionSummary,
      ) as TransactionSummary[];
    });
  }

  async function deleteTemplate(id: string) {
    await $TransactionTemplate.delete(id);

    Logger.log("deleted template", id);

    queryClient.setQueryData(["fetch-transaction-templates", user?.uid], (oldData: TransactionSummary[]) => {
      if (!oldData) return oldData;

      return oldData.filter((transactionSummary) => transactionSummary.template.id !== id) as TransactionSummary[];
    });
  }

  async function refreshRecords() {
    await queryClient.invalidateQueries({ queryKey: ["fetch-transaction-records", user?.uid] });
  }

  async function createRecord(record: NewTransactionRecord) {
    const { template } = await $TransactionRecord.create(record);

    Logger.log("created record", record);

    await refreshTemplate(template);
  }

  async function updateRecord(id: string, record: UpdateTransactionRecord) {
    const newRecord = await $TransactionRecord.update(id, record);

    Logger.log("updated record", newRecord);

    queryClient.setQueryData(["fetch-transaction-records", user?.uid], (oldData: Transaction[]) => {
      if (!oldData) return oldData;

      return oldData.map((transaction) => (transaction.id === id ? newRecord : transaction)) as Transaction[];
    });
  }

  async function deleteRecord(id: string, template: TransactionTemplate) {
    await $TransactionRecord.delete(id);

    Logger.log("deleted record", id);

    queryClient.setQueryData(["fetch-transaction-records", user?.uid], (oldData: Transaction[]) => {
      if (!oldData) return oldData;

      return oldData.filter((transaction) => transaction.id !== id) as Transaction[];
    });

    await refreshTemplate(template);
  }

  return (
    <TransactionContext.Provider
      value={{
        isLoading: templates.isLoading || records.isLoading,
        queries: { templates, records },
        templates: filteredTemplates,
        records: records.data || [],
        actions: {
          refreshTemplates,
          createTemplate,
          updateTemplate,
          deleteTemplate,
          refreshRecords,
          createRecord,
          updateRecord,
          deleteRecord,
        },
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext };
export default TransactionProvider;
