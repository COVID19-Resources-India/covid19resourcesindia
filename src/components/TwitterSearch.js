import { useState } from "react"
// import { useParams } from "react-router"
// antd
import { Button, Input, Select } from "antd"
import Modal from "antd/lib/modal/Modal"
// constant
import {
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
} from "constant/static"
// icons
import { ReactComponent as TwitterIcon } from "assets/icons/twitter.svg"
// styles
import "./TwitterSearch.scss"

const { Option } = Select

// const mapCategoryToTwitterCategory = (category) =>
//   TWITTER_SEARCH_KEYS.find((element) => element.key === category)

const categoryOptions = []
for (let i = 0; i < TWITTER_SEARCH_KEYS.length; i++) {
  categoryOptions.push(
    <Option
      key={TWITTER_SEARCH_KEYS[i].key}
      value={TWITTER_SEARCH_KEYS[i].value}
    >
      {TWITTER_SEARCH_KEYS[i].label}
    </Option>
  )
}

const TwitterSearch = () => {
  // const { category } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  // TODO: Figure out a way to remember the existing categories and url category
  // Cases
  // 1. If user lands on a category page and seaches
  // 2. If user lands on a category page and moves on different category and searches
  // 3. If user lands on a non category page and searches
  // 4. If user langs on a category page, adds another category, goes on a different category and searches
  // 5. If a user lands on a non category page, adds a category and goes to a category page and searches
  // So as of now not selecting any category by default.

  // const mappedCategory = mapCategoryToTwitterCategory(category)
  const [categoryValue, setCategoryValue] = useState(
    []
    // mappedCategory && mappedCategory.value
    //   ? [mappedCategory.value]
    //   : TWITTER_DEFAULT_SEARCH_KEY
  )

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    let searchString = TWITTER_VERIFIED_SEARCH

    if (selectedCity) {
      searchString += ` ${selectedCity}`
    }

    searchString += ` ${
      categoryValue && categoryValue.length
        ? categoryValue.join(" OR ")
        : TWITTER_DEFAULT_SEARCH_KEY
    }`
    searchString += TWITTER_SUBTRACT_SEARCH

    const twitterSearchUrl =
      "https://twitter.com/search?q=" + encodeURIComponent(searchString)

    window.open(twitterSearchUrl, "_blank").focus()

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleChange = (value) => {
    setCategoryValue(value)
  }

  const onInputChange = (event) => setSelectedCity(event.target.value)

  return (
    <>
      <Button
        className="real-time-resources-button"
        icon={<TwitterIcon />}
        onClick={showModal}
      >
        Filter Twitter Results
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
          <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={handleChange}
            value={categoryValue}
          >
            {categoryOptions}
          </Select>
        </div>
      </Modal>
    </>
  )
}

export default TwitterSearch
