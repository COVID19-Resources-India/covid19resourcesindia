import React from "react"
import { Drawer, Button } from "antd"
import { Link } from "react-router-dom"
// icons
import { ReactComponent as HamburgerIcon } from "assets/icons/hamburger.svg"
import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
// styles
import "./MobileMenu.scss"
// components
import { HEADER_SITE_TEXT, MenuLinks, SocialIconsMenu } from "./Header"

class MobileMenu extends React.Component {
  state = { visible: false }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    })
  }

  render() {
    const { visible } = this.state
    return (
      <>
        <Button onClick={this.showDrawer} className="mobile-menu-button">
          Menu <HamburgerIcon />
        </Button>
        <Drawer
          placement="top"
          closable={true}
          onClose={this.onClose}
          visible={visible}
          key="mobile-menu"
          height="auto"
          closeIcon={<CloseIcon />}
          className="mobile-menu-drawer"
        >
          <div className="mobile-menu-content">
            <Link to="/" className="logo">
              {HEADER_SITE_TEXT}
            </Link>
            <div className="navigation">
              <MenuLinks />
            </div>
            <div className="navigation-icons">
              <SocialIconsMenu />
            </div>
          </div>
        </Drawer>
      </>
    )
  }
}

export default MobileMenu
