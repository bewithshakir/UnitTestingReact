
export const combinePaths = (parent: string, child: string): string =>
  `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;


export const buildPaths = (routes: any, parentPath: string = ""): any =>
  routes.map((route: { path: string; routes: any; }) => {
    const path = combinePaths(parentPath, route.path);

    return {
      ...route,
      path,
      ...(route.routes && { routes: buildPaths(route.routes, path) })
    };
  });


export const setupParents = (routes: any, parentRoute: any = null): any =>
  routes.map((route: any) => {
    const withParent = {
      ...route,
      ...(parentRoute && { parent: parentRoute })
    };

    return {
      ...withParent,
      ...(withParent.routes && {
        routes: setupParents(withParent.routes, withParent)
      })
    };
  });

export const flattenRoutes = (routes: []): any =>
  routes
    .map((route: { routes: any; }) => [route.routes ? flattenRoutes(route.routes) : [], route])
    .flat(Infinity);

/**
* Combine all the above functions together
*
* @param routes
* @returns {any[]}
*/
export const generateAppRoutes = (routes: any) => {
  return flattenRoutes(setupParents(buildPaths(routes)));
};

/**
* Provides path from root to the element
*
* @param route
* @returns {any[]}
*/
export const pathTo = (route: { parent: any; }): any => {
  if (!route.parent) {
    return [route];
  }

  return [...pathTo(route.parent), route];
};


export const getCountryCode = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    console.log("🚀 ~ file: utils.ts ~ line 68 ~ getCountryCode ~ JSON.parse(savedTheme)", JSON.parse(savedTheme))
    switch (JSON.parse(savedTheme)) {
      case "USA":
        return "us";
      case "UK":
        return "uk";
      default:
        return "us";
    }
  }
}