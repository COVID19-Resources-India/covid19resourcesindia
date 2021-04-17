import React from "react"
import { useParams, Switch, Route, NavLink } from "react-router-dom"
import { useList } from "react-firebase-hooks/database"
// antd
import { Input, Table, Tag } from "antd"
// icons
import { ReactComponent as SearchIcon } from "assets/icons/search.svg"
import { ReactComponent as PDFIcon } from "assets/icons/pdf.svg"
// constants
import { db } from "constant/firebase"
import { SPREADSHEET_KEY, TAGS } from "constant/static"
// helper
import { toKebabCase } from "utils/caseHelper"
// styles
import "./Home.scss"

const EmergencyInfo = () => (
  <section className="content">
    <div className="resources-wrapper">
      <div className="emergency-resources resource">
        <h3>Emergency Resources</h3>
        <div className="resources-block">
          <div className="label">24/7 Helpline:</div>
          <div className="content">
            <a href="tel:+911123978046">+91-11-23978046</a>
            <a href="tel:1075">1075 (Toll Free)</a>
          </div>
        </div>
        <div className="resources-block">
          <div className="label">WhatsApp Helpdesk (Live Chat)</div>
          <div className="content">
            <a href="https://wa.me/919013151515">https://wa.me/919013151515</a>
          </div>
        </div>
        <div className="resources-block">
          <div className="label">Facebook Helpdesk: (Messenger Chat)</div>
          <div className="content">
            <a
              href="https://www.messenger.com/t/MyGovIndia"
              target="_blank"
              rel="noreferrer"
            >
              https://www.messenger.com/t/MyGovIndia
            </a>
          </div>
        </div>
        <div className="resources-block">
          <div className="label">Local Helplines:</div>
          <div className="content">
            <a
              href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
              target="_blank"
              rel="noreferrer"
            >
              States &amp; Union Territories Local Helplines
            </a>
          </div>
        </div>
      </div>
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
            href="https://im.rediff.com/news/2021/apr/13break-the-chain.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <PDFIcon />
            <span>Maharashtra: Break the Chain (14 Apr) - Official Order</span>
          </a>
        </div>
      </div>
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
            <span>
              Frequently Asked Questions on Co-WIN (COVID-19 Vaccination)
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
)

const columns = [
  {
    title: "State",
    dataIndex: "State",
    key: "State",
  },
  {
    title: "Distributor Name",
    dataIndex: "Distributor Name",
    key: "Distributor Name",
  },
  {
    title: "E-Mail Address",
    dataIndex: "E-Mail Address",
    key: "E-Mail Address",
  },
  {
    title: "Telephone",
    dataIndex: "Telephone",
    key: "Telephone",
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
]

const Category = () => {
  let { category } = useParams()
  const [snapshots, loading, error] = useList(
    db.ref(`${SPREADSHEET_KEY}/${category}`)
  )
  const dataSource = snapshots.map((i) => i.val())

  // TOOD: Show a loading spinner
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>An error occurred</p>
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default function Home() {
  return (
    <section className="home">
      <div className="wrapper">
        <section className="omnibox-wrapper">
          <h2 className="label">What are you looking for?</h2>
          <Input
            className="omnibox"
            size="large"
            placeholder="Search here..."
            suffix={<SearchIcon />}
          />
          <div className="tags">
            {TAGS.map((i) => (
              <NavLink
                activeClassName="is-active"
                to={`/search/${toKebabCase(i)}`}
              >
                <Tag>{i}</Tag>
              </NavLink>
            ))}
          </div>
        </section>
        <div className="divider"></div>
        <Switch>
          <Route path="/search/:category" component={Category} />
          <Route path="/">
            <EmergencyInfo />
          </Route>
        </Switch>
        <div className="divider"></div>
      </div>
    </section>
  )
}
