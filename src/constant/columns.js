import { isValidNumber } from "utils/validation"

const buildColumns = (c) =>
  c.map((i) => ({
    title: i,
    dataIndex: i,
    key: i,
    render: (item) => {
      const trimmedItem = item ? item.toString().trim() : ""
      switch (i) {
        case "Link":
          return trimmedItem ? (
            <a href={trimmedItem} target="_blank" rel="noreferrer">
              {trimmedItem}
            </a>
          ) : (
            trimmedItem
          )
        case "Telephone": {
          const numbers = trimmedItem ? trimmedItem.split("/") : ""
          if (numbers.length) {
            return numbers.map((number, index) => {
              const trimmedNumber = number.trim()
              let valueToBeReturned = isValidNumber(trimmedNumber) ? (
                <a key={index} href={`tel:${trimmedNumber}`}>
                  {trimmedNumber}
                </a>
              ) : (
                <span key={index}>{trimmedNumber}</span>
              )
              if (index !== 0 && valueToBeReturned)
                valueToBeReturned = <span> / {valueToBeReturned}</span>
              return <span key={index}>{valueToBeReturned}</span>
            })
          }
          return numbers
        }
        case "E-Mail Address":
          return trimmedItem ? (
            <a key={trimmedItem} href={`mailto:${trimmedItem}`}>
              {trimmedItem}
            </a>
          ) : (
            trimmedItem
          )
        default:
          return trimmedItem
      }
    },
  }))

const DEFAULT_COLUMNS = ["State", "Distributor Name", "Telephone", "Address"]
// not able to maintain the order of the spreadsheet - so need these here
const COLUMNS_PER_CATEGORY = {
  ambulance: ["State", "City", "Telephone", "Name", "Notes"],
  beds: ["State", "City", "Link", "Notes"],
  remdesivir: [...DEFAULT_COLUMNS, "E-Mail Address"],
  tocilizumab: [...DEFAULT_COLUMNS, "E-Mail Address"],
  "external-resources": ["State", "Region", "Name", "Link", "Notes"],
  plasma: ["State", "City", "Title", "Link", "Telephone", "Notes"],
}

export { COLUMNS_PER_CATEGORY, DEFAULT_COLUMNS, buildColumns }
