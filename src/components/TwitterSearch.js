import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
// antd
import { Button, Input, Select } from "antd"
import Modal from "antd/lib/modal/Modal"
// constant
import {
  TWITTER_ADDITIONAL_CATEGORIES,
  TWITTER_DEFAULT_SEARCH_KEY,
  TWITTER_SEARCH_KEYS,
  TWITTER_SUBTRACT_SEARCH,
  TWITTER_VERIFIED_SEARCH,
  CATEGORIES,
} from "constant/static"
import { toKebabCase } from "utils/caseHelper"
import { usePrevious } from "utils/hooksHelper"
// icons
import { ReactComponent as TwitterIcon } from "assets/icons/twitter.svg"
// styles
import "./TwitterSearch.scss"

const { Option } = Select
const categoryOptions = []
const categoriesToUse = [...CATEGORIES, ...TWITTER_ADDITIONAL_CATEGORIES]
for (let i = 0; i < categoriesToUse.length; i++) {
  if (categoriesToUse[i] !== "External Resources") {
    const value = toKebabCase(categoriesToUse[i])
    categoryOptions.push(
      <Option key={value} value={value}>
        {categoriesToUse[i]}
      </Option>
    )
  }
}

const TwitterSearch = () => {
  // Fetching category from location
  // useParams not available here because this component is outside of the switch
  let categoryFromLocation = undefined
  const location = useLocation()
  const splitLocation = location.pathname.split("/")
  if (
    splitLocation[1] === "search" &&
    splitLocation[3] &&
    splitLocation[3] !== "external-resources"
  ) {
    categoryFromLocation = splitLocation[3]
  }
  const prevCategory = usePrevious(categoryFromLocation)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  const [categoryValue, setCategoryValue] = useState(
    categoryFromLocation ? [categoryFromLocation] : []
  )

  // TODO:
  // 4. If user lands on a category page, adds another category, goes on a different category and searches
  // 5. If a user lands on a non category page, adds a category and goes to a category page and searches
  // (Right now the category is reset every time the route changes)

  // set the category from location on route change
  useEffect(() => {
    if (prevCategory !== categoryFromLocation) {
      setCategoryValue((p) =>
        categoryFromLocation ? [categoryFromLocation] : []
      )
    }
  }, [prevCategory, categoryFromLocation, setCategoryValue])

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)
  const handleChange = (value) => setCategoryValue(value)
  const onInputChange = (event) => setSelectedCity(event.target.value)
  const handleOk = () => {
    let searchString = TWITTER_VERIFIED_SEARCH

    if (selectedCity) {
      searchString += ` ${selectedCity}`
    }

    searchString += ` ${
      categoryValue && categoryValue.length
        ? categoryValue.map((i) => TWITTER_SEARCH_KEYS[i]).join(" OR ")
        : TWITTER_DEFAULT_SEARCH_KEY
    }`
    searchString += TWITTER_SUBTRACT_SEARCH

    const twitterSearchUrl =
      "https://twitter.com/search?q=" + encodeURIComponent(searchString)

    window.open(twitterSearchUrl, "_blank").focus()

    setIsModalVisible(false)
  }

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
