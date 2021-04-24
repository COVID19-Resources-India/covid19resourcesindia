import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"
import { ReactComponent as GithubIcon } from "assets/icons/github.svg"
import MobileMenu from "components/MobileMenu"
import StateSelector from "components/StateSelector"
import _ from "lodash"

import "./Header.scss"

const HEADER_SITE_TEXT = (
  <>
    COVID-19 Resources<span>India</span>
  </>
)

const menuLinks = [
  { link: "https://forms.gle/rrbpk9SzGFmxbFpX9", text: "Submit Information" },
  { link: "https://bit.ly/32vqT5O", text: "Volunteer" },
]

const LinkComponent = ({ isInternal = false, text, link }) => {
  if (isInternal) {
    return (
      <NavLink to={link} className="item">
        {text}
      </NavLink>
    )
  }
  return (
    <a href={link} target="_blank" rel="noreferrer" className="item">
      {text}
    </a>
  )
}

const MenuLinks = () => {
  return menuLinks.map((i) => <LinkComponent key={i.text} {...i} />)
}

const SocialIconsMenu = () => {
  return (
    <>
      <a
        href="https://t.me/covid19resourcesindia"
        className="item"
        target="_blank"
        rel="noreferrer"
      >
        <TelegramIcon />
      </a>
      <a
        href="https://github.com/COVID19-Resources-India/covid19resourcesindia"
        className="item"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </a>
    </>
  )
}

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
  // TODO: Figure out Submit Information, Contribute, Report URLs
  return (
    <header id="header" className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="wrapper">
        <StateSelector />
        <Link to="/" className="logo">
          {HEADER_SITE_TEXT}
        </Link>
        <nav className="navigation">
          <MenuLinks />
          <SocialIconsMenu />
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}

export { MenuLinks, SocialIconsMenu, HEADER_SITE_TEXT }
