import { Link } from "react-router-dom"
// hooks
import { useContext } from "react"
import { useList } from "react-firebase-hooks/database"
// icons
import { ReactComponent as PDFIcon } from "assets/icons/pdf.svg"
// constant
import { db } from "constant/firebase"
import { SPREADSHEET_KEY } from "constant/static"
// components
import Loader from "components/Loader"
// context
import { StateContext } from "context/StateContext"

const titles = [
  "24/7 Helpline",
  "Facebook Helpdesk (Messenger Chat)",
  "WhatsApp Helpdesk (Live Chat)",
  "Local Help",
  "Local Helplines",
]

const ResourceBlock = ({ title, resource }) => {
  return (
    <div className="resources-block">
      <div className="label">{title}:</div>
      <div className="content">
        {resource &&
          resource.length > 0 &&
          resource.map((res, idx) => {
            if (!res.Value) return null
            if (res.InternalLink) {
              return (
                <Link key={idx} to={`info/${res.InternalLink}`}>
                  {res.Value}
                </Link>
              )
            }
            if (res.Link)
              return (
                <a key={idx} href={res.Link} rel="noreferrer" target="_blank">
                  {res.Value}
                </a>
              )
            return <span key={idx}>{res.Value}</span>
          })}
      </div>
    </div>
  )
}

const LatestUpdates = () => {
  return (
    <div className="latest-updates resource">
      <h3>Latest Updates</h3>
      <div className="content">
        <a
          className="item"
          href="https://static.mygov.in/rest/s3fs-public/mygov_161848046251307401.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <PDFIcon />
          <span>Decision on CBSE Board Exams</span>
        </a>
        <a
          className="item"
          href="https://drive.google.com/file/d/1BtHPekCyfwONH1dMKjNpCYkqGJFtQjSW/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <PDFIcon />
          <span>Maharashtra: Break the Chain (21 Apr) - Official Order</span>
        </a>
      </div>
    </div>
  )
}

const Documents = () => (
  <div className="documents resource">
    <h3>Helpful Guidelines &amp; Official Documents</h3>
    <div className="content">
      <a
        className="item"
        href="https://www.mohfw.gov.in/pdf/Algorithmforinternationalarrivals.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <PDFIcon />
        <span>
          Algorithm: Standard Operating Procedure for International Arrivals
        </span>
      </a>
      <a
        className="item"
        href="https://www.mohfw.gov.in/pdf/Guidelinesforinternationalarrivals17022021.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <PDFIcon />
        <span>Guidelines for International Arrivals</span>
      </a>
      <a
        className="item"
        href="https://www.mohfw.gov.in/pdf/FAQCoWINforcitizens.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <PDFIcon />
        <span>Frequently Asked Questions on Co-WIN (COVID-19 Vaccination)</span>
      </a>
    </div>
  </div>
)

// Fetches from resources filters on state which it accepts as a prop
const EmergencyResources = ({ heading, filterBy }) => {
  const [snapshots, loading, error] = useList(
    db
      .ref(`${SPREADSHEET_KEY}/resources`)
      .orderByChild("State")
      .equalTo(filterBy)
  )
  const dataSource = snapshots.map((i) => i.val())

  // Create object of arrays from titles
  // {"24/7 Helpline": [Resource, Resource],
  //  "Local Helpline": [Resource]
  // }
  const titleObj = {}
  if (dataSource) {
    for (const i of dataSource) {
      if (titleObj[i.Title]) {
        titleObj[i.Title] = [...titleObj[i.Title], i]
      } else {
        titleObj[i.Title] = [i]
      }
    }
  }

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>An error occurred...</p>
  }

  if (dataSource.length > 0) {
    return (
      <div className="emergency-resources resource">
        <h3>{heading}</h3>
        {/* Looping through static titles so the order is maintained */}
        {titles.map((title) => {
          if (titleObj[title]) {
            const resource = titleObj[title]
            return (
              <ResourceBlock key={title} title={title} resource={resource} />
            )
          }
          return null
        })}
      </div>
    )
  }
  return null
}

const EmergencyInfo = () => {
  const { selectedState } = useContext(StateContext)
  return (
    <section className="page-content">
      <div className="resources-wrapper">
        {selectedState && (
          <EmergencyResources
            heading={`Resources in ${selectedState}`}
            filterBy={selectedState}
          />
        )}
        <EmergencyResources heading="National Resources" filterBy="National" />
        <Documents />
        <LatestUpdates />
      </div>
    </section>
  )
}

export default EmergencyInfo
