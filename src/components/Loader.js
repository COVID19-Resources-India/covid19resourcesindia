import { Spin } from "antd"
import "./Loader.scss"
// icons
import { ReactComponent as LoadingIcon } from "assets/icons/loader.svg"

const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" indicator={<LoadingIcon />} />
    </div>
  )
}

export default Loader
