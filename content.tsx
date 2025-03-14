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

    let iframe: HTMLIFrameElement
    let iframeDocument: Document
    const getIframe = () => {
      iframe = document.querySelector(domKey) as HTMLIFrameElement
      iframeDocument = iframe?.contentDocument
    }
    getIframe()
    if(!iframe || !iframeDocument) return

    const iframeBody = iframeDocument?.querySelector('body')
    if (iframeBody) {
      scrollDom.current = iframeBody
    }
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
      // e.stopPropagation()
      e.preventDefault();
      if (wheelTimer) {
        clearTimeout(wheelTimer)
      }
      wheelTimer = setTimeout(() => {
        const sv = e.deltaY > 0 ? -1 : 1
        scaleV.current += sv * 0.1
        scrollDom.current.style.transform = `scale(${scaleV.current})`
      }, 10)
    }

    // window.addEventListener("keydown", onKeyDown);
    // window.addEventListener("keyup", onkeyUp);
    // nav 点击时要重新监听 iframe
    iframeDocument.addEventListener("mousewheel", onMousewheel, { passive: false })
    return () => {
      // window.removeEventListener("keydown", onKeyDown);
      // window.removeEventListener("keyup", onkeyUp);
      iframeDocument.removeEventListener("mousewheel", onMousewheel)
    }
  }, [isOpen, domKey])

  useEffect(() => {
    // 阻止 window 的元素缩放，即侧边栏
    const onMousewheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault();
    }
    window.addEventListener("mousewheel", onMousewheel, { passive: false })
    return () => {
      window.removeEventListener("mousewheel", onMousewheel)
    }
  }, [isOpen])

  // useEffect(() => {
  //   // https://u.pmdaniu.com/xn98z
  //   setTimeout(() => {
  //     const iframe = document.querySelector(domKey) as HTMLIFrameElement
  //     const iframeDocument = iframe?.contentDocument
  //     const dom = iframeDocument?.querySelector('body')
  //     console.log("====scrollDom: ", dom)
  //     if (dom) {
  //       scrollDom.current = dom
  //     }
  //   }, 100);
  // }, [domKey])

  return <></>
}
