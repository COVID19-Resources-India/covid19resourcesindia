import React from "react"
import { Drawer, Button } from "antd"
import { Link, NavLink } from "react-router-dom"
import "./MobileMenu.scss"
// icons
import { ReactComponent as HamburgerIcon } from "assets/icons/hamburger.svg"
import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"
import { ReactComponent as GithubIcon } from "assets/icons/github.svg"

class MobileMenu extends React.Component {

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
    console.log('Drawer updated')
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { visible } = this.state;
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
              COVID-19 Resources<span>India</span>
            </Link>
            <div className="navigation">
            <NavLink to="/contribute" className="item">
                Contribute
            </NavLink>
            <NavLink to="/issue" className="item">
              Report an Issue
            </NavLink>
            </div>
            <div className="navigation-icons">
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
            </div>
          </div>
        </Drawer>
      </>
    )
  }
}

export default MobileMenu
