import { Outlet } from "react-router";
import PageContainer from "@/components/layout/page-container";

const AuthWrapper = () => {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default AuthWrapper;
