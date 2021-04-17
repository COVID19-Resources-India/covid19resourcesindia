import { ReactComponent as PDFIcon } from "assets/icons/pdf.svg"

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

export default EmergencyInfo
