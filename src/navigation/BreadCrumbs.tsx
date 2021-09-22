import { NavLink } from "react-router-dom";
import { pathTo } from "./utils";

const Breadcrumbs = ({ route }:any) => (
  <nav className="breadcrumbs">
    {pathTo(route).map((crumb:any, index:number, breadcrumbs:any) => (
      <div key={index} className="item">
        {index < breadcrumbs.length - 1 && (
          <NavLink to={crumb.path}>{crumb.label}</NavLink>
        )}
        {index === breadcrumbs.length - 1 && crumb.label}
      </div>
    ))}
  </nav>
);

export default Breadcrumbs;