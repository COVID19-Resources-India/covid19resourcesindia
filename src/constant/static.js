const SPREADSHEET_KEY = "11cAlFOEgfIyE0jmV_8X8_DqImCfxHyk7zo8wETFX9x4"
const CATEGORIES = [
  "Beds",
  "Oxygen Cylinders",
  "Remdesivir",
  "Tocilizumab",
  "External Resources",
]

const TWITTER_DEFAULT_SEARCH_KEY = "(bed OR beds OR oxygen)"

const TWITTER_SEARCH_KEYS = {
  beds: "(bed OR beds)",
  "oxygen-cylinders": "oxygen",
  remdesivir: "remdesivir",
  tocilizumab: "tocilizumab",
  "External Resources": TWITTER_DEFAULT_SEARCH_KEY,
}

const TWITTER_SUBTRACT_SEARCH = ` -"not verified" -"unverified" -"needed" -"required" -"requirement"`

const TWITTER_VERIFIED_SEARCH = "(verified OR available OR working)"

export {
  CATEGORIES,
  SPREADSHEET_KEY,
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH
}
