
const Page = ({ route }: any) => {
  const PageBody = route.component;
  return (
    <>
      {/* <NestedMenu route={route} />
      {route.parent && <Breadcrumbs route={route} />} */}
      <PageBody {...route} />
    </>
  );
};

export default Page;