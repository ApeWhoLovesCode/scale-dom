import { useEffect, useRef } from "react"

import { INIT_STATE } from "~common/state"
import { DOM_KEY, IS_OPEN } from "~common/storage"
import { useStorage } from "~node_modules/@plasmohq/storage/dist/hook"

export default function Content() {
  const [isOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  const [domKey] = useStorage<string>(DOM_KEY, INIT_STATE.domKey)
  const scrollDom = useRef(null)
  const scaleV = useRef(1)

  useEffect(() => {
    if (!isOpen) return
    let wheelTimer: NodeJS.Timeout | null = null
    // let isCtrl = false;
    // const onKeyDown = (e: KeyboardEvent) => {
    //   if(e.ctrlKey) {
    //     e.stopPropagation()
    //     e.preventDefault()
    //     isCtrl = true
    //   }
    // }

    // const onkeyUp = (e: KeyboardEvent) => {
    //   if(!e.ctrlKey) {
    //     isCtrl = false
    //   }
    // }

    const onMousewheel = (e: WheelEvent) => {
      const isCtrl = e.ctrlKey
      if (!scrollDom.current || !isCtrl) return
      e.stopPropagation()
      if(isCtrl) {
        e.preventDefault();
      }
      if (wheelTimer) {
        clearTimeout(wheelTimer)
      }
      wheelTimer = setTimeout(() => {
        const sv = e.deltaY > 0 ? 1 : -1
        if (isCtrl) {
          scaleV.current += sv * 0.1
          scrollDom.current.style.transform = `scale(${scaleV.current})`
        }
      }, 200)
    }

    // window.addEventListener("keydown", onKeyDown);
    // window.addEventListener("keyup", onkeyUp);
    window.addEventListener("mousewheel", onMousewheel, { passive: false })
    return () => {
      // window.removeEventListener("keydown", onKeyDown);
      // window.removeEventListener("keyup", onkeyUp);
      window.removeEventListener("mousewheel", onMousewheel)
    }
  }, [isOpen])

  useEffect(() => {
    const dom = document.querySelector(domKey)
    console.log("====scrollDom: ", dom)
    if (dom) {
      scrollDom.current = dom
    }
  }, [domKey])

  return <></>
}
