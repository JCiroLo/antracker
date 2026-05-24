import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { ButtonBase, Fab, Grid, Paper } from "@mui/material";
import CalendarSearchIcon from "@/components/icons/calendar-search-icon";
import ChartPieIcon from "@/components/icons/chart-pie";
import ChartPieFilledIcon from "@/components/icons/chart-pie-filled-icon";
import CogIcon from "@/components/icons/cog-icon";
import HomeIcon from "@/components/icons/home-icon";
import HomeFilledIcon from "@/components/icons/home-filled-icon";
import PlusIcon from "@/components/icons/plus-icon";
import useDialog from "@/hooks/use-dialog";
import useRouteMatch from "@/hooks/use-route-match";

const routes = {
  home: {
    path: "/",
  },
  history: {
    path: "/history",
  },
  analytics: {
    path: "/analytics",
  },
};

const ActionsBar = forwardRef<HTMLDivElement>((_, ref) => {
  const dialog = useDialog();

  const routeMatch = useRouteMatch([routes.home.path, routes.analytics.path, routes.history.path]);
  const currentTab = routeMatch?.pattern?.path;

  // TODO: change div tag to nav
  return (
    <Grid
      ref={ref}
      component={Paper}
      elevation={0}
      role="navigation"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        marginBottom: 1,
      }}
    >
      <ButtonBase component={NavLink} to={routes.home.path} role="tab">
        {currentTab === routes.home.path ? <HomeFilledIcon color="primary" /> : <HomeIcon />}
      </ButtonBase>
      <ButtonBase component={NavLink} to={routes.history.path} role="tab">
        {<CalendarSearchIcon color={currentTab === routes.history.path ? "primary" : "inherit"} />}
      </ButtonBase>

      <Fab
        aria-label="Add"
        role="tab"
        size="medium"
        color="primary"
        sx={{ justifySelf: "center" }}
        onClick={() => dialog.open("manage-transaction-template")}
      >
        <PlusIcon />
      </Fab>

      <ButtonBase component={NavLink} to={routes.analytics.path} role="tab">
        {currentTab === routes.analytics.path ? (
          <ChartPieFilledIcon color="primary" />
        ) : (
          <ChartPieIcon />
        )}
      </ButtonBase>
      <ButtonBase onClick={() => dialog.open("global-settings")} role="tab">
        <CogIcon />
      </ButtonBase>
      {/* <Tab icon={<Avatar sx={{ width: 24, height: 24 }}></Avatar>} disabled /> */}
    </Grid>
  );
});

ActionsBar.displayName = "ActionsBar";

export default ActionsBar;
