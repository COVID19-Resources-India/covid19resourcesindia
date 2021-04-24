import { useState } from "react"
// antd
import { Button, Input } from "antd"
import Modal from "antd/lib/modal/Modal"
// constant
import {
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
} from "constant/static"
// helper
import { toTitleCase } from "utils/caseHelper"
// icons
import { ReactComponent as TwitterIcon } from "assets/icons/twitter.svg"
// styles
import "./TwitterSearch.scss"

const mapCategoryToTwitterCategory = (category) =>
  TWITTER_SEARCH_KEYS[category] || TWITTER_DEFAULT_SEARCH_KEY

const TwitterSearch = ({ category }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const mappedCategory = mapCategoryToTwitterCategory(category)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    let searchString = TWITTER_VERIFIED_SEARCH

    if (selectedCity) {
      searchString += ` ${selectedCity}`
    }

    searchString += ` ${mappedCategory}`
    searchString += TWITTER_SUBTRACT_SEARCH

    const twitterSearchUrl =
      "https://twitter.com/search?q=" + encodeURIComponent(searchString)

    window.open(twitterSearchUrl, "_blank").focus()

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onInputChange = (event) => setSelectedCity(event.target.value)

  return (
    <>
      <div className="search-twitter-button-container">
        <Button
          className="search-twitter-button"
          type="primary"
          icon={<TwitterIcon />}
          onClick={showModal}
        >
          Search verified resources on Twitter
        </Button>
      </div>
      <Modal
        title="Search on Twitter"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText="Search"
      >
        <div className="info-container">
          <label className="info-label">City</label>
          <Input
            className="info-input"
            required
            value={selectedCity}
            onChange={onInputChange}
          />
        </div>
        <div className="info-container">
          <label className="info-label">Category</label>
          <Input
            className="info-input"
            value={toTitleCase(category)}
            disabled
          />
        </div>
      </Modal>
    </>
  )
}

export default TwitterSearch
