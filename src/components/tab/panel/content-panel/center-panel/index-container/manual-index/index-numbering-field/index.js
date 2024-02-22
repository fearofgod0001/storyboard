const IndexNumbringField = ({ numberingList, item }) => {
  const indent = item.INDENT > 2 ? item.INDENT - 1 : 1;
  const fontWeight = item.INDENT > 2 ? 100 : 600;
  const marginLeft = 15 * indent;

  return (
    <div style={{ marginLeft, fontWeight, whiteSpace: "nowrap" }}>
      {numberingList &&
        numberingList[item.TOCID] &&
        numberingList[item.TOCID]?.Numbering}
    </div>
  );
};

export default IndexNumbringField;
