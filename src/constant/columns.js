const buildColumns = (c) =>
  c.map((i) => (i !== "Link" ? {
    title: i,
    dataIndex: i,
    key: i,
  }: {
    title: i,
    dataIndex: i,
    key: i,
    render: (link) => <a href={link} target="_blank" rel="noreferrer">{link}</a>
  }))

const DEFAULT_COLUMNS = ["State", "Distributor Name", "Telephone", "Address"]
// not able to maintain the order of the spreadsheet - so need these here
const COLUMNS_PER_CATEGORY = {
  beds: ["State", "City", "Link", "Notes"],
  remdesivir: [...DEFAULT_COLUMNS, "E-Mail Address"],
  tocilizumab: [...DEFAULT_COLUMNS, "E-Mail Address"],
  "external-resources": ["State", "Region", "Name", "Link", "Notes"],
}

export { COLUMNS_PER_CATEGORY, DEFAULT_COLUMNS, buildColumns }
