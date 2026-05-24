import { Outlet } from "react-router";
import { Slide } from "@mui/material";
import TransactionFormDialog from "@/components/dialogs/transaction-form-dialog";
import RemoveTransactionDialog from "@/components/dialogs/remove-transaction-dialog";
import SettingsDialog from "@/components/dialogs/settings-dialog";
import ActionsBar from "@/components/layout/actions-bar";
import Loader from "@/components/layout/loader";
import PageContainer from "@/components/layout/page-container";
import Sidebar from "@/components/layout/sidebar";
import useBoolean from "@/hooks/use-boolean";
import useDialog from "@/hooks/use-dialog";
import useTransactions from "@/hooks/use-transactions";
import useSharedAnalytics from "@/hooks/use-shared-analytics";

const AppWrapper = () => {
  const dialog = useDialog();
  const showActionsBar = useBoolean({ autoload: true, autoloadDelay: 300 });

  const transactions = useTransactions();
  const analytics = useSharedAnalytics();

  return (
    <PageContainer>
      <Outlet />
      <Slide in={showActionsBar} direction="up" mountOnEnter>
        <ActionsBar />
      </Slide>
      <Slide in={showActionsBar} direction="right" mountOnEnter>
        <Sidebar />
      </Slide>
      <TransactionFormDialog
        open={dialog.isOpen("manage-transaction-template")}
        template={dialog.getData("manage-transaction-template")}
        onClose={() => dialog.close("manage-transaction-template")}
      />
      <RemoveTransactionDialog
        open={dialog.isOpen("remove-transaction-template")}
        template={dialog.getData("remove-transaction-template")}
        onClose={() => dialog.close("remove-transaction-template")}
      />
      <SettingsDialog open={dialog.isOpen("global-settings")} onClose={() => dialog.close("global-settings")} />
      <Loader show={transactions.isLoading || analytics.query.isLoading} />
    </PageContainer>
  );
};

export default AppWrapper;
