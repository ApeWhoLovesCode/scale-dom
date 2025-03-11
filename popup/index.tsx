import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import { DOM_KEY, IS_OPEN } from "~common/storage"

import Radio from "./components/Radio"
import Button from "./components/Button"

import "./style.css"
import { INIT_STATE } from "~common/state"

function IndexPopup() {
  const [isOpen, setIsOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  const [domKey, setDomKey] = useStorage<string>(DOM_KEY, INIT_STATE.domKey)
  const [domKeyState, setDomKeyState] = useState(domKey)

  useEffect(() => {
    setDomKeyState(domKey)
  }, [domKey])

  const setDefault = () => {
    setDomKeyState(INIT_STATE.domKey)
    setDomKey(INIT_STATE.domKey)
  }

  return (
    <div className="bg-black text-white p-4 w-64 text-sm select-none">
      <div className="flex items-center mb-2">
        <Radio checked={isOpen} onChange={setIsOpen} />
        <span className="ml-2">启用插件</span>
      </div>
      <div className="mb-1">选择元素</div>
      <input
        value={domKeyState}
        onChange={(e) => setDomKeyState(e.target.value)}
        type="text"
        className="w-full border-b text-sm border-indigo-500 focus:border-indigo-400 focus:outline-none bg-transparent"
        onBlur={(e) => setDomKey(e.target.value)}
      />
      <div className="mt-2">
        <Button className="text-xs" onClick={setDefault}>恢复默认</Button>
      </div>
    </div>
  )
}

export default IndexPopup
