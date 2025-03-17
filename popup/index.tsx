import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import { SCALE_FACTOR, IS_OPEN } from "~common/storage"

import Radio from "./components/Radio"
import Button from "./components/Button"

import "./style.css"
import { INIT_STATE } from "~common/state"

function IndexPopup() {
  const [isOpen, setIsOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  // const [domKey, setDomKey] = useStorage<string>(SCALE_FACTOR, INIT_STATE.domKey)
  const [scaleFactor, setScaleFactor] = useStorage(SCALE_FACTOR, INIT_STATE.scaleFactor)
  const [scaleFactorState, setScaleFactorState] = useState(scaleFactor)

  useEffect(() => {
    setScaleFactorState(scaleFactor)
  }, [scaleFactor])

  const setDefault = () => {
    setScaleFactor(INIT_STATE.scaleFactor)
    // setDomKey(INIT_STATE.domKey)
  }

  const handelScaleFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (!/^\d*\.?\d+$/.test(v)) return v.replace(/[^0-9.]/g, '')
    return v
  }

  return (
    <div className="bg-black text-white p-4 w-64 text-sm select-none">
      <div className="flex items-center mb-2">
        <Radio checked={isOpen} onChange={setIsOpen} />
        <span className="ml-2">启用插件</span>
      </div>
      <div className="mb-1">缩放系数</div>
      <input
        type="text"
        className="w-full border-b text-sm border-indigo-500 focus:border-indigo-400 focus:outline-none bg-transparent"
        value={scaleFactorState}
        onChange={(e) => {
          setScaleFactorState(handelScaleFactor(e))
        }}
        onBlur={(e) => setScaleFactor(v => handelScaleFactor(e))}
      />
      <div className="mt-2">
        <Button className="text-xs" onClick={setDefault}>恢复默认</Button>
      </div>
    </div>
  )
}

export default IndexPopup
