import { createContext, useEffect, useState } from "react"
import { geolocated } from "react-geolocated"
import { states } from "constant/states"

export const StateContext = createContext()

// Fetch latitude and longitude from browser api
// Fetch current state from bigdatacloud free lookup api
// Set selectedState in context
const GeoLocation = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})((props) => {
  const { coords, setSelectedState } = props

  useEffect(() => {
    if (coords && coords.longitude && coords.latitude) {
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      ).then((response) => {
        console.log("response")
        if (response) {
          response.json().then((location) => {
            if (
              location &&
              location.principalSubdivision &&
              states.includes(location.principalSubdivision)
            ) {
              setSelectedState(location.principalSubdivision)
            }
          })
        }
      })
    }
  }, [coords, setSelectedState])

  return null
})

// Permission Provider
export default function StateContextWrapper({ children }) {
  const [selectedState, setSelectedState] = useState(undefined)
  // TODO: Add location based on the browser location as the default state - if possible
  return (
    <StateContext.Provider value={{ selectedState, setSelectedState }}>
      <GeoLocation setSelectedState={setSelectedState} />
      {children}
    </StateContext.Provider>
  )
}
