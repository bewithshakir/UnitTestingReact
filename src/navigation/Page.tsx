import NestedMenu from "./NestedMenu";
import Breadcrumbs from "./BreadCrumbs";

const Page = ({ route }:any) => {
  const PageBody = route.component;
  return (
    <>
      <NestedMenu route={route} />
      {route.parent && <Breadcrumbs route={route} />}
      <PageBody />
    </>
  );
};

export default Page;