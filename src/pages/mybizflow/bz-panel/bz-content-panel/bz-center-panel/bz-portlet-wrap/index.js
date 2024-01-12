import React, { useMemo, lazy, Suspense } from 'react';

const BzPortletWrap = ({ item, portletList, portlet, bzSource }) => {
  console.debug('portletList', portletList);

  const DynamicComponent = useMemo(() => {
    if (portlet) {
      return lazy(() => import(`@/pages/mybizflow/${portlet.configInfo.portletPath}`));
    }
    return null;
  }, [portlet]);
  return (
    <>
      {DynamicComponent && (
        <Suspense fallback={<div visible={true} />}>
          <DynamicComponent key={portlet.i} id={portlet.i} configInfo={portlet?.configInfo} />
        </Suspense>
      )}
    </>
  );
};

const areIsEquals = (prev, next) => {
  const isEqual = JSON.stringify(prev.portletList) === JSON.stringify(next.portletList);
  return isEqual;
};
export default React.memo(BzPortletWrap, areIsEquals);
