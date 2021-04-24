import { useState } from "react"
import { Button, Input } from "antd"
import Modal from "antd/lib/modal/Modal"
import {
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
} from "constant/static"
import "./TwitterSearch.scss"
import { toTitleCase } from "utils/caseHelper"

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
      <Button
        className="search-twitter-button"
        type="primary"
        onClick={showModal}
      >
        Search verified resources on Twitter
      </Button>
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
