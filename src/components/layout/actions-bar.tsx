import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { Fab, Paper, Stack, Tab } from "@mui/material";
import CalendarSearchIcon from "@/components/icons/calendar-search-icon";
import ChartPieIcon from "@/components/icons/chart-pie";
import ChartPieFilledIcon from "@/components/icons/chart-pie-filled-icon";
import CogIcon from "@/components/icons/cog-icon";
import HomeIcon from "@/components/icons/home-icon";
import HomeFilledIcon from "@/components/icons/home-filled-icon";
import PlusIcon from "@/components/icons/plus-icon";
import useDialog from "@/hooks/use-dialog";

const ActionsBar = forwardRef<HTMLDivElement>((_, ref) => {
  const dialog = useDialog();

  // TODO: change div tag to nav
  return (
    <Stack ref={ref} component={Paper} elevation={0} direction="row" alignItems="center" justifyContent="space-evenly" marginBottom={1}>
      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        {({ isActive }) => <Tab component="span" icon={isActive ? <HomeFilledIcon color="primary" /> : <HomeIcon />} />}
      </NavLink>
      <NavLink to="/history" style={{ textDecoration: "none", color: "inherit" }}>
        {({ isActive }) => <Tab component="span" icon={<CalendarSearchIcon color={isActive ? "primary" : "inherit"} />} />}
      </NavLink>
      <Fab aria-label="Add" size="medium" color="primary" onClick={() => dialog.open("manage-transaction-template")}>
        <PlusIcon />
      </Fab>
      <NavLink to="/analytics" style={{ textDecoration: "none", color: "inherit" }} onClick={(event) => event.preventDefault()}>
        {({ isActive }) => <Tab component="span" icon={isActive ? <ChartPieFilledIcon color="primary" /> : <ChartPieIcon />} disabled />}
      </NavLink>
      <Tab icon={<CogIcon />} onClick={() => dialog.open("global-settings")} />
      {/* <Tab icon={<Avatar sx={{ width: 24, height: 24 }}></Avatar>} disabled /> */}
    </Stack>
  );
});

ActionsBar.displayName = "ActionsBar";

export default ActionsBar;
