import React from "react";
import { Navigate } from "react-router";
import PageSkeleton from "@/components/layout/page-skeleton";
import useSessionStore from "@/stores/use-session-store";
import Logger from "@/lib/logger";
import type { RouteScope } from "@/types/global";

type PrivateRouteProps<Props> = {
  component: React.ComponentType<Props>;
  componentProps?: Props;
  scopes?: RouteScope[];
};

const PrivateRoute = <P extends React.JSX.IntrinsicAttributes>({
  component: Component,
  scopes = [],
  componentProps: componentProps,
}: PrivateRouteProps<P>) => {
  const { user, isLoading } = useSessionStore();
  const isAuthenticated = Boolean(user);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (scopes.includes("REQUIRES_AUTH") && !isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (scopes.includes("HIDE_FOR_AUTH") && isAuthenticated) {
    return <Navigate to="/" />;
  }

  Logger.log("rendering");

  return <Component {...(componentProps as P)} />;
};

export default PrivateRoute;
