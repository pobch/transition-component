import { useState } from 'react'
import { Transition } from './Transition'
import './App.css'

export function App() {
  const [activeScreen, setActiveScreen] = useState('0')
  function nextScreen() {
    // There are 3 screens
    const newActiveScreen = String((Number(activeScreen) + 1) % 3)
    setActiveScreen(newActiveScreen)
  }

  return (
    <>
      <h1>Howdy</h1>
      <div>
        <button onClick={nextScreen}>Next</button>
      </div>
      <Transition className="transition" activeScreen={activeScreen}>
        <div key="0" className="screen0">
          Screen 0
        </div>
        <div key="1" className="screen1">
          Screen 1
        </div>
        <div key="2" className="screen2">
          Screen 2
        </div>
      </Transition>
    </>
  )
}
