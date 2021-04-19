import { useHistory, useParams } from "react-router-dom"
import { useList } from "react-firebase-hooks/database"
// pages
// import WarRooms from "pages/WarRooms"
// components
import Loader from "components/Loader"
// antd
import { Result, Button, Table } from "antd"
// constants
import { db } from "constant/firebase"
// styles
import "./InfoPage.scss"
import { SPREADSHEET_KEY } from "constant/static"

const PAGE_LIST = {
  "mumbai-war-rooms": {
    heading: "Mumbai War Rooms",
    // customComponent: (p) => <WarRooms {...p} />,
    columns: [
      {
        title: "Ward",
        dataIndex: "Ward",
        key: "Ward",
      },
      {
        title: "War Room Number",
        dataIndex: "War Room Number",
        key: "War Room Number",
      },
      {
        title: "Areas",
        dataIndex: "Areas",
        key: "Areas",
      },
    ],
  },
  "veer-foundation-mumbai": {
    heading: "Veer Foundation (Mumbai)",
    // customComponent: (p) => <WarRooms {...p} />,
    columns: [
      {
        title: "Area",
        dataIndex: "Area",
        key: "Area",
      },
      {
        title: "Volunteer Contact",
        dataIndex: "Volunteer Contact",
        key: "Volunteer Contact",
      },
      {
        title: "Address",
        dataIndex: "Address",
        key: "Address",
      },
      {
        title: "Sangh Contact",
        dataIndex: "Sangh Contact",
        key: "Sangh Contact",
      },
    ],
  },
}

// Automatically fetches page param from spreadsheet
// And renders information
// -- can use custom components
const InfoPageComponent = (props) => {
  const { columns, customComponent, heading, page } = props
  const [snapshots, loading, error] = useList(
    db.ref(`${SPREADSHEET_KEY}/${page}`)
  )
  const dataSource = snapshots.map((i) => i.val())

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>An error occurred</p>
  }

  if (!dataSource) return <p>No records returned.</p>

  // We can also use a custom component if required for something
  if (customComponent) {
    return customComponent({ data: dataSource, heading })
  }

  // Displays a table by default
  return (
    <div className="page-content">
      {heading && <h3 className="title">{heading}</h3>}
      <Table
        columns={columns}
        dataSource={dataSource}
        className="query-results"
      />
    </div>
  )
}

// Returns 404 if page param is not in PAGE_LIST
const InfoPage = () => {
  const history = useHistory()
  const { page } = useParams()
  if (!PAGE_LIST[page]) {
    return (
      <section className="info-page">
        <Result
          status="404"
          title="404"
          subTitle={`Requested page ${page} not found`}
          extra={
            <Button onClick={() => history.push("/")} type="primary">
              Back Home
            </Button>
          }
        />
      </section>
    )
  }

  const info = PAGE_LIST[page]
  return (
    <section className="info-page">
      <InfoPageComponent {...info} page={page} />
    </section>
  )
}

export default InfoPage
