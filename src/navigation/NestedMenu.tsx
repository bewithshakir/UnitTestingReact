
import { NavLink } from "react-router-dom";
import { pathTo } from "./utils";

const Menu = ({ routes, level }:any) => (
  <nav className={`menu menu-level-${level}`}>
    {routes.map((route:any, index:any) => (
      <NavLink key={index} to={route.path}>
        {route.label}
      </NavLink>
    ))}
  </nav>
);

const NestedMenu = ({ route }:any) => (
  <>
    {pathTo(route)
      .filter((r: { routes: any; }) => r.routes)
      .map((r: { routes: any; }, index: any) => (
        <Menu key={index} routes={r.routes} level={index} />
      ))}
  </>
);

export default NestedMenu;
