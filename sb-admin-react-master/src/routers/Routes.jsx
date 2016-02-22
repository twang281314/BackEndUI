import React from "react";
import { Router, Route, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardHomePage from "../components/pages/dashboard/Home";
import DashboardTablesPage from "../components/pages/dashboard/Tables";
import DashboardFormsPage from "../components/pages/dashboard/Forms";
import DashboardPanelsWellsPage from "../components/pages/dashboard/PanelsWells";
import DashboardButtonsPage from "../components/pages/dashboard/Buttons";
import DashboardNotificationsPage from "../components/pages/dashboard/Notifications";
import DashboardTypographyPage from "../components/pages/dashboard/Typography";
import DashboardIconsPage from "../components/pages/dashboard/Icons";
import DashboardGridPage from "../components/pages/dashboard/Grid";
import DashboardBlankPage from "../components/pages/dashboard/Blank";
import DashboardFlotChartsPage from "../components/pages/dashboard/FlotCharts";
import DashboardMorrisjsChartsPage from "../components/pages/dashboard/MorrisjsCharts";
import LoginPage from "../components/pages/Login";
import LogoutPage from "../components/pages/Logout";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route    path="/" component={BaseLayout}>
            <Route  path="/dashboard" component={DashboardLayout}>
              <Route  path="/home" component={DashboardHomePage} />
              <Route  path="/flot-charts" component={DashboardFlotChartsPage} />
              <Route  path="/morrisjs-charts" component={DashboardMorrisjsChartsPage} />
              <Route  path="/tables" component={DashboardTablesPage} />
              <Route  path="/forms" component={DashboardFormsPage} />
              <Route  path="/panels-wells" component={DashboardPanelsWellsPage} />
              <Route  path="/buttons" component={DashboardButtonsPage} />
              <Route  path="/notifications" component={DashboardNotificationsPage} />
              <Route  path="/typography" component={DashboardTypographyPage} />
              <Route  path="/icons" component={DashboardIconsPage} />
              <Route  path="/grid" component={DashboardGridPage} />
              <Route  path="/blank" component={DashboardBlankPage} />
              <IndexRoute componet={DashboardHomePage}  />
            </Route>
            <Route  path="/login" component={LoginPage} />
            <Route  path="/logout" component={LogoutPage} />
            <Redirect from="/" to="/dashboard/home" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;