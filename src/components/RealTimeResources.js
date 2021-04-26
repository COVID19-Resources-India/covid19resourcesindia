import React from "react"
import { Tooltip, Button } from "antd"
import { ReactComponent as WhatsAppIcon } from "assets/icons/whatsapp.svg"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"

import "./RealTimeResources.scss"
import TwitterSearch from "./TwitterSearch"

export default function RealTimeResources() {
  return (
    <section className="real-time-resources">
      <div className="alert-block">
        It is possible that some of the sources on this website may have run out
        of stock due to increased demands. <br />
        You can try one of these options for real-time updates and assistance
        with your COVID-19 needs —
      </div>
      <div className="resources-block">
        <div className="twitter-filters resource">
          <div className="title">Search on Twitter</div>
          <div className="description">
            Search for COVID-19 resources on Twitter’s real-time feed using our
            filters
          </div>
          <div className="call-to-action">
            <TwitterSearch />
          </div>
        </div>
        <div className="volunteer-helpline resource">
          <div className="title">Volunteer-run Helpline</div>
          <div className="description">
            Reach out to one of our volunteers and we'll do our best to help you
            find resources
          </div>
          <div className="call-to-action">
            <Tooltip
              className="real-time-resources-tooltip"
              placement="bottomLeft"
              title="We are currently unavailable. Please feel free to leave us a message and we'll get back to you as soon as we can."
            >
              <Button
                className="real-time-resources-button"
                icon={<WhatsAppIcon />}
              >
                WhatsApp
              </Button>
            </Tooltip>
            <Tooltip
              className="real-time-resources-tooltip"
              placement="bottomLeft"
              title="We are currently unavailable. Please feel free to leave us a message and we'll get back to you as soon as we can."
            >
              <Button
                className="real-time-resources-button"
                icon={<TelegramIcon />}
              >
                Telegram
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  )
}
