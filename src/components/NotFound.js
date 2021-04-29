import { useHistory } from "react-router-dom"
// antd
import { Result, Button } from "antd"
import "./NotFound.scss"

const NotFound = ({ subTitle }) => {
  const history = useHistory()

  return (
    <div className="not-found">
      <Result
        status="404"
        title="404"
        subTitle={subTitle}
        extra={
          <Button onClick={() => history.push("/")} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
