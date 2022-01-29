import * as React from 'react'
import { useState } from 'react'

export function Transition({
  children,
  className,
  activeScreen,
}: {
  children: React.ReactNode
  className: string
  activeScreen: string
}) {
  /**
   * * Implement `getDerivedStateFromProps`. It consists of...
   * * 1. "prop" which is a source of a derived state, i.e. `activeScreen`
   * * 2. "state" to track previous value of "prop in 1.", i.e. `prevActiveScreen`
   * * 3. "derived state" that will be calculated from "prop in 1." and "state in 2.", i.e. `exitingScreen`
   */
  const [prevActiveScreen, setPrevActiveScreen] = useState('')
  const [exitingScreen, setExitingScreen] = useState('')
  if (prevActiveScreen !== activeScreen) {
    setExitingScreen(prevActiveScreen)
    setPrevActiveScreen(activeScreen)
  }
  // * End of `getDerivedStateFromProps` implementation

  function resetExitingScreen() {
    setExitingScreen('')
  }

  return (
    <div className={className} onTransitionEnd={resetExitingScreen}>
      {React.Children.map(children, (child) => {
        // Type check
        if (React.isValidElement(child)) {
          // Find the state of each specific screen
          let screenState: 'active' | 'exiting' | 'inactive' = 'inactive'
          if (child.key === activeScreen) {
            screenState = 'active'
          } else if (child.key === exitingScreen) {
            screenState = 'exiting'
          } else {
            screenState = 'inactive'
          }

          // Display logic
          switch (screenState) {
            case 'active':
              return <div key={child.key}>{child}</div>
            case 'exiting':
              return (
                <div key={child.key} className="exit">
                  {child}
                </div>
              )
            case 'inactive':
              return null
          }
        }
        // Wrong type. Not a ReactElement
        return null
      })}
    </div>
  )
}
