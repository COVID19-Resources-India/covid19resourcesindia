import { createContext, useState } from "react"

export const StateContext = createContext()

// Permission Provider
export default function StateContextWrapper({ children }) {
  const [selectedState, setSelectedState] = useState(undefined)
  // TODO: Add location based on the browser location as the default state - if possible
  return (
    <StateContext.Provider value={{ selectedState, setSelectedState }}>
      {children}
    </StateContext.Provider>
  )
}
