import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"
import { ReactComponent as GithubIcon } from "assets/icons/github.svg"
import _ from "lodash"

import "./Header.scss"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", _.throttle(handleScroll, 100))
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = () => {
    window.pageYOffset > "64" ? setIsSticky(true) : setIsSticky(false)
  }

  return (
    <header id="header" className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="wrapper">
        <Link to="/" className="logo">
          COVID-19 Health Resources<span>India</span>
        </Link>
        <nav className="navigation">
          <NavLink to="/contribute" className="item">
            Submit Information
          </NavLink>
          <NavLink to="/issue" className="item">
            Report an Issue
          </NavLink>
          <a href="https://t.me/covid19resourcesindia" className="item" target="_blank" rel="noreferrer">
            <TelegramIcon />
          </a>
          <a href="https://github.com/covid19resourcesindia" className="item" target="_blank" rel="noreferrer">
            <GithubIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}
