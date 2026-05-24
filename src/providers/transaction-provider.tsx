import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import $TransactionRecord from "@/services/transaction-record";
import $TransactionTemplate from "@/services/transaction-template";
import useSimpleQuery from "@/hooks/use-simple-query";
import useSessionStore from "@/stores/use-session-store";
import queryClient from "@/lib/query-client";
import Env from "@/lib/env";
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

type RecordsQueryFetchOptions = {
  page: number;
};

type TransactionContextType = {
  actions: {
    createRecord: (record: NewTransactionRecord) => Promise<void>;
    createTemplate: (template: NewTransactionTemplate) => Promise<void>;
    deleteRecord: (id: string, template: TransactionTemplate) => Promise<void>;
    deleteTemplate: (id: string) => Promise<void>;
    refreshTemplates: () => Promise<void>;
    updateRecord: (id: string, record: UpdateTransactionRecord) => Promise<void>;
    updateTemplate: (id: string, template: UpdateTransactionTemplate) => Promise<void>;
  };
  isLoading: boolean;
  queries: {
    templates: ReturnType<typeof useQuery>;
    records: ReturnType<typeof useSimpleQuery<Transaction[], RecordsQueryFetchOptions>>;
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

  const records = useSimpleQuery<Transaction[], RecordsQueryFetchOptions>({
    enabled: false,
    keepPreviousData: true,
    queryKey: [user?.uid],
    queryFn: async (_, options) => {
      if (!user) {
        return [] as Transaction[];
      }

      const limit = Env.TRANSACTIONS_LIMIT;

      const data = await $TransactionRecord.getAll({
        limit,
        offset: (options?.page ?? 1) * limit,
      });

      Logger.log("fetched transactions records", data);

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

    if (!updatedTransactionSummary) {
      return;
    }

    queryClient.setQueryData(
      ["fetch-transaction-templates", user?.uid],
      (oldData: TransactionSummary[]) => {
        if (!oldData) return oldData;

        return oldData.map((transactionSummary) =>
          transactionSummary.template.id === template.id
            ? updatedTransactionSummary
            : transactionSummary,
        ) as TransactionSummary[];
      },
    );
  }

  async function refreshTemplates() {
    await queryClient.invalidateQueries({ queryKey: ["fetch-transaction-templates", user?.uid] });
  }

  async function createTemplate(template: NewTransactionTemplate) {
    const newTransactionSummary = await $TransactionTemplate.create(template);

    Logger.log("created template", newTransactionSummary);

    if (!newTransactionSummary) {
      return;
    }

    queryClient.setQueryData(
      ["fetch-transaction-templates", user?.uid],
      (oldData: TransactionSummary[]) => {
        if (!oldData) return oldData;

        return [newTransactionSummary, ...oldData] as TransactionSummary[];
      },
    );
  }

  async function updateTemplate(id: string, template: UpdateTransactionTemplate) {
    const newTransactionSummary = await $TransactionTemplate.update(id, template);

    Logger.log("updated template", newTransactionSummary);

    if (!newTransactionSummary) {
      return;
    }

    queryClient.setQueryData(
      ["fetch-transaction-templates", user?.uid],
      (oldData: TransactionSummary[]) => {
        if (!oldData) return oldData;

        return oldData.map((transactionSummary) =>
          transactionSummary.template.id === id ? newTransactionSummary : transactionSummary,
        ) as TransactionSummary[];
      },
    );
  }

  async function deleteTemplate(id: string) {
    await $TransactionTemplate.delete(id);

    Logger.log("deleted template", id);

    queryClient.setQueryData(
      ["fetch-transaction-templates", user?.uid],
      (oldData: TransactionSummary[]) => {
        if (!oldData) return oldData;

        return oldData.filter(
          (transactionSummary) => transactionSummary.template.id !== id,
        ) as TransactionSummary[];
      },
    );
  }

  async function createRecord(record: NewTransactionRecord) {
    const newRecord = await $TransactionRecord.create(record);

    Logger.log("created record", record);

    records.mutateData((oldData) => {
      if (!oldData) return [newRecord];

      return [newRecord, ...oldData];
    });

    await refreshTemplate(newRecord.template);
  }

  async function updateRecord(id: string, record: UpdateTransactionRecord) {
    const newRecord = await $TransactionRecord.update(id, record);

    Logger.log("updated record", newRecord);

    if (!newRecord) {
      return;
    }

    records.mutateData((oldData) => {
      if (!oldData) return oldData;

      return oldData.map((transaction) => (transaction.id === id ? newRecord : transaction));
    });
  }

  async function deleteRecord(id: string, template: TransactionTemplate) {
    await $TransactionRecord.delete(id);

    Logger.log("deleted record", id);

    records.mutateData((oldData) => {
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
