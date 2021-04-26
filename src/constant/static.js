const SPREADSHEET_KEY = "11cAlFOEgfIyE0jmV_8X8_DqImCfxHyk7zo8wETFX9x4"
const CATEGORIES = [
  "Beds",
  "Oxygen Cylinders",
  "Remdesivir",
  "Tocilizumab",
  "External Resources",
]

const TWITTER_DEFAULT_SEARCH_KEY = "(bed OR beds OR oxygen)"

const TWITTER_SEARCH_KEYS = [
  {
    key: "beds",
    value: "(bed OR beds)",
    label: "Beds",
  },
  {
    key: "oxygen-cylinders",
    value: "oxygen",
    label: "Oxygen Cylinders",
  },
  {
    key: "remdesivir",
    value: "remdesivir",
    label: "Remdesivir",
  },
  {
    key: "tocilizumab",
    value: "tocilizumab",
    label: "Tocilizumab",
  },
  {
    key: "plasma",
    value: "plasma",
    label: "Plasma",
  },
]

const TWITTER_SUBTRACT_SEARCH = ` -"not verified" -"unverified" -"needed" -"required" -"requirement" -"not available" -"unavailable" -"not working"`

const TWITTER_VERIFIED_SEARCH = "(verified OR available OR working)"

export {
  CATEGORIES,
  SPREADSHEET_KEY,
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
}
