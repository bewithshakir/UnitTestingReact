import { Route } from "react-router-dom"


export const RouteConfig = (route: {path:string,routes:[],component:any}) => {
   console.log(route)
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}