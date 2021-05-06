const SPREADSHEET_KEY = "11cAlFOEgfIyE0jmV_8X8_DqImCfxHyk7zo8wETFX9x4"
const CATEGORIES = [
  "Ambulance",
  "Beds",
  "External Resources",
  "Oxygen Cylinders",
  "Plasma",
  "Remdesivir",
  "Tocilizumab",
]

const CATEGORIES_WITHOUT_VERIFICATION_COLUMN = ["external-resources", "plasma"]
const CATEGORIES_WITH_NATIONAL = ["external-resources", "plasma"]

const TWITTER_ADDITIONAL_CATEGORIES = []
const TWITTER_DEFAULT_SEARCH_KEY = "(bed OR beds OR oxygen)"
const TWITTER_SEARCH_KEYS = {
  ambulance: "ambulance",
  beds: "(bed OR beds)",
  "oxygen-cylinders": "oxygen",
  remdesivir: "remdesivir",
  tocilizumab: "tocilizumab",
  plasma: "plasma",
}

const TWITTER_SUBTRACT_SEARCH = ` -"not verified" -"unverified" -"needed" -"required" -"requirement" -"not available" -"unavailable" -"not working"`

const TWITTER_VERIFIED_SEARCH = "(verified OR available OR working)"

export {
  CATEGORIES,
  SPREADSHEET_KEY,
  TWITTER_ADDITIONAL_CATEGORIES,
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
  CATEGORIES_WITHOUT_VERIFICATION_COLUMN,
  CATEGORIES_WITH_NATIONAL,
}
