import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "antd/dist/antd.css"
import Site from "./Site"
// import reportWebVitals from "./reportWebVitals"
// fonts
import "./assets/fonts/Manrope-Regular.ttf"
import "./assets/fonts/Manrope-Medium.ttf"
import "./assets/fonts/Manrope-ExtraBold.ttf"
// firebase
import "constant/firebase.js"
// context
import StateContextWrapper from "context/StateContext"

ReactDOM.render(
  <React.StrictMode>
    <StateContextWrapper>
      <Site />
    </StateContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
