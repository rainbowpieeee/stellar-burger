import { Redirect, Route } from "react-router-dom";
import { FC } from "react";
import { RouteProps } from "react-router";

export const ProtectedRoute: FC<
  RouteProps & { user: { email: string; name: string } | null } & {
    isUserLoaded: boolean;
  }
> = ({ children, user, isUserLoaded, ...rest }) => {
  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
