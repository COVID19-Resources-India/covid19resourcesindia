import { useHistory, useParams } from "react-router-dom"
// pages
// import WarRooms from "pages/WarRooms"
// components
import Table from "components/Table"
// antd
import { Result, Button } from "antd"
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
  const dbRef = db.ref(`${SPREADSHEET_KEY}/${page}`)

  // Displays a table by default
  return (
    <div className="page-content">
      {heading && <h3 className="title">{heading}</h3>}
      <Table
        dbRef={dbRef}
        columns={columns}
        customComponent={customComponent}
        heading={heading}
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
