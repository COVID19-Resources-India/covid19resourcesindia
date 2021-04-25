import { createContext, useState } from "react"

export const StateContext = createContext()

// Permission Provider
export default function StateContextWrapper({ children }) {
  const persistedState = localStorage.getItem("state")
  const [selectedState, setSelectedState] = useState(persistedState)

  const contextValues = {
    selectedState,
    setSelectedState: (v) => {
      localStorage.setItem("state", v)
      setSelectedState(v)
    },
  }

  return (
    <StateContext.Provider value={contextValues}>
      {children}
    </StateContext.Provider>
  )
}
