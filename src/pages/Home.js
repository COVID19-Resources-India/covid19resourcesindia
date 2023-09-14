import { useContext, useRef } from "react"
import { Router, Route, NavLink } from "react-router-dom"
// antd
// import { Input, Tag, Button } from "antd"
import { Tag } from "antd"
// components
import Category from "components/Category"
import EmergencyInfo from "components/EmergencyInfo"
import RealTimeResources from "components/RealTimeResources"
import Sources from "pages/Sources"
// constants
import { CATEGORIES } from "constant/static"
// helper
import { toKebabCase } from "utils/caseHelper"
// context
import { StateContext } from "context/StateContext"
// styles
import "./Home.scss"

export default function Home() {
  const { selectedState } = useContext(StateContext)
  const state = toKebabCase(selectedState)

  const sectionRef = useRef(null)
  const scrollToRef = () => {
    setTimeout(() => {
      if (sectionRef?.current) {
        window.scrollTo({
          top: sectionRef.current.offsetTop - 100,
          behavior: "smooth",
        })
      }
    }, 500)
  }

  return (
    <section className="home">
      <div className="wrapper">
        <section className="omnibox-wrapper">
          <h2 className="label">What are you looking for?</h2>
          {/* <Input
            className="omnibox"
            size="large"
            placeholder="Search here..."
            suffix={<SearchIcon />}
          /> */}
          <div className="tags">
            <NavLink
              exact
              className="tag-item"
              activeClassName="is-active"
              to={`/`}
            >
              <Tag>General Infomation</Tag>
            </NavLink>
            {CATEGORIES.map((i) => (
              <NavLink
                className="tag-item"
                key={i}
                activeClassName="is-active"
                to={`/search/${state ? state : "all"}/${toKebabCase(i)}`}
                onClick={scrollToRef}
              >
                <Tag>{i}</Tag>
              </NavLink>
            ))}
            <NavLink
              className="tag-item"
              activeClassName="is-active"
              to={`/sources`}
              onClick={scrollToRef}
            >
              <Tag>Sources</Tag>
            </NavLink>
          </div>
        </section>
        <div className="divider"></div>
        <RealTimeResources />
        <div className="divider"></div>
        <Router>
          <Route path="/sources" component={Sources} />
          <Route path="/search/:state/:category">
            <Category sectionRef={sectionRef} scrollToRef={scrollToRef} />
          </Route>
          <Route path="/" component={EmergencyInfo} />
        </Router>
        <div className="divider"></div>
      </div>
    </section>
  )
}
