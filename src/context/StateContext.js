import { createContext, useEffect, useState } from "react"
import { geolocated } from "react-geolocated"
// constant
import { states } from "constant/states"
// components
import Loader from "components/Loader"

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
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    setLoadingState,
    setSelectedState,
  } = props
  // Stops loading if geo location not supported in browser
  useEffect(() => {
    if (!isGeolocationAvailable) {
      setLoadingState(false)
    }
  }, [isGeolocationAvailable, setLoadingState])

  // Stops loading if geo location permission rejected by user
  useEffect(() => {
    if (!isGeolocationEnabled) {
      setLoadingState(false)
    }
  }, [isGeolocationEnabled, setLoadingState])

  useEffect(() => {
    if (
      isGeolocationAvailable &&
      coords &&
      coords.longitude &&
      coords.latitude
    ) {
      setLoadingState(true)
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      )
        .then((response) => {
          if (response) {
            response.json().then((location) => {
              const currentState = location?.principalSubdivision
              if (currentState && states.includes(currentState)) {
                setSelectedState(currentState)
                setLoadingState(false)
              }
            })
          }
        })
        .catch((response) => {
          setLoadingState(false)
        })
    }
  }, [coords, isGeolocationAvailable, setLoadingState, setSelectedState])

  return null
})

// Permission Provider
export default function StateContextWrapper({ children }) {
  const persistedState = localStorage.getItem("state")
  const [selectedState, setSelectedState] = useState(persistedState)
  const [loadingState, setLoadingState] = useState(
    persistedState ? false : true
  )
  const contextValues = {
    loadingState,
    selectedState,
    setSelectedState: (v) => {
      localStorage.setItem("state", v)
      setSelectedState(v)
    },
  }

  return (
    <StateContext.Provider value={contextValues}>
      {!persistedState && (
        <GeoLocation
          setSelectedState={contextValues.setSelectedState}
          setLoadingState={setLoadingState}
        />
      )}
      {loadingState ? <Loader /> : children}
    </StateContext.Provider>
  )
}
