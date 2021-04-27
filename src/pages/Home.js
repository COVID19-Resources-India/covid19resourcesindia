import { useContext } from "react"
import { Switch, Route, NavLink } from "react-router-dom"
// antd
// import { Input, Tag, Button } from "antd"
import { Tag } from "antd"
// components
import Category from "components/Category"
import EmergencyInfo from "components/EmergencyInfo"
import RealTimeResources from "components/RealTimeResources"
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
                to={`/search/${state ?? "all"}/${toKebabCase(i)}`}
              >
                <Tag>{i}</Tag>
              </NavLink>
            ))}
          </div>
        </section>
        <div className="divider"></div>
          <RealTimeResources />
        <div className="divider"></div>
        <Switch>
          <Route path="/search/:state/:category" component={Category} />
          <Route path="/">
            <EmergencyInfo />
          </Route>
        </Switch>
        <div className="divider"></div>
      </div>
    </section>
  )
}
