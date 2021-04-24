import {
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
} from "constant/static"

const mapCategoryToTwitterCategory = (category) =>
  TWITTER_SEARCH_KEYS[category] || TWITTER_DEFAULT_SEARCH_KEY

const TwitterSearch = ({ stateContext, category }) => {
  const { selectedState, selectedCity } = stateContext

  let searchString = TWITTER_VERIFIED_SEARCH

  if (selectedCity) {
    searchString += ` ${selectedCity}`
  } else if (selectedState) {
    searchString += ` ${selectedState}`
  }

  searchString += ` ${mapCategoryToTwitterCategory(category)}`
  searchString += TWITTER_SUBTRACT_SEARCH

  const twitterSearchUrl =
    "https://twitter.com/search?q=" + encodeURIComponent(searchString)

  return (
    <div className="twitter-search-url">
      <a href={twitterSearchUrl} target="_blank" rel="noreferrer">
        Search verified resources on Twitter
      </a>
    </div>
  )
}

export default TwitterSearch
