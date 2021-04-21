const buildColumns = (c) =>
  c.map((i) => ({
    title: i,
    dataIndex: i,
    key: i,
  }))

const DEFAULT_COLUMNS = ["State", "Distributor Name", "Telephone", "Address"]
// not able to maintain the order of the spreadsheet - so need these here
const COLUMNS_PER_CATEGORY = {
  beds: ["State", "City", "Link", "Notes"],
  remdesivir: [...DEFAULT_COLUMNS, "E-Mail Address"],
  tocilizumab: [...DEFAULT_COLUMNS, "E-Mail Address"],
}

export { COLUMNS_PER_CATEGORY, DEFAULT_COLUMNS, buildColumns }
