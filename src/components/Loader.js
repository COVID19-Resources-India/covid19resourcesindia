import { Spin, Space } from "antd"
import "./Loader.scss"

const Loader = () => {
  return (
    <div className="loader fullScreen">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  )
}

export default Loader
