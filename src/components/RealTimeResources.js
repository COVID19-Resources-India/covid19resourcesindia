import { useList } from "react-firebase-hooks/database"
// antd
import { Tooltip, Button } from "antd"
// icons
import { ReactComponent as WhatsAppIcon } from "assets/icons/whatsapp.svg"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"
// static
import { SPREADSHEET_KEY } from "constant/static"
import { db } from "constant/firebase"

import "./RealTimeResources.scss"
import TwitterSearch from "./TwitterSearch"

const WHATSAPP_URL = "https://wa.me/message/QQESCAOCFEXMK1"
const TELEGRAM_URL = "https://t.me/COVID19ResourcesIndia_Support"

export default function RealTimeResources() {
  const [snapshots] = useList(db.ref(`${SPREADSHEET_KEY}/current-status`))
  const data = snapshots.map((i) => i.val())

  let telegramStatus = "Offline",
    whatsappStatus = "Offline",
    telegramEnabled = false,
    whatsappEnabled = false

  // TODO: Fetch server time and automatically mark offline at night
  for (const details of data) {
    if (details.Platform === "Telegram") {
      telegramStatus = details.Status
      telegramEnabled = details.Enabled
    } else if (details.Platform === "WhatsApp") {
      whatsappStatus = details.Status
      whatsappEnabled = details.Enabled
    }
  }

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
              title={
                telegramStatus === "Offline"
                  ? "We are currently unavailable. Please feel free to leave us a message and we'll get back to you as soon as we can."
                  : ""
              }
            >
              <Button
                onClick={() => window.open(TELEGRAM_URL, "_blank").focus()}
                className="real-time-resources-button"
                icon={<TelegramIcon />}
                disabled={!telegramEnabled}
              >
                Telegram
              </Button>
              {telegramStatus === "Offline" ? (
                <span className="status mobile-status">
                  Currently Unavailable
                </span>
              ) : (
                <span className="status">⚡&nbsp; &nbsp;Faster Response</span>
              )}
            </Tooltip>
            <Tooltip
              className="real-time-resources-tooltip"
              placement="bottomLeft"
              title={
                whatsappStatus === "Offline"
                  ? "We are currently unavailable. Please feel free to leave us a message and we'll get back to you as soon as we can."
                  : ""
              }
            >
              <Button
                onClick={() => window.open(WHATSAPP_URL, "_blank").focus()}
                className="real-time-resources-button"
                icon={<WhatsAppIcon />}
                disabled={!whatsappEnabled}
              >
                WhatsApp
              </Button>
              {whatsappStatus === "Offline" && (
                <span className="status mobile-status">
                  Currently Unavailable
                </span>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  )
}
