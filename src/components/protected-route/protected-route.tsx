import { Route, Redirect } from "react-router-dom";
import React, { FunctionComponent } from "react";
import { IResetPageProps } from "../../utils/interfaces";


export const ProtectedRoute: FunctionComponent<IResetPageProps> = ({ path, children, redirectPath, check }) => {


  return (
    <Route path={path} exact={true} render={({ location }) => check ? (children) : (<Redirect to={{
      pathname: redirectPath, state: { from: location }
    }
    } />)} />


  )



}
