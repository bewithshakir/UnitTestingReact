import Breadcrumbs from "./BreadCrumbs";
import NestedMenu from "./NestedMenu";

const Page = ({ route }: any) => {
  const PageBody = route.component;
  console.log(PageBody,"body")
  return (
    <>
      <NestedMenu route={route} />
      {route.parent && <Breadcrumbs route={route} />}
      <PageBody {...route} />
    </>
  );
};

export default Page;