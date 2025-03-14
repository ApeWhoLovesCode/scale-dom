import { useEffect, useRef } from "react"

import { INIT_STATE } from "~common/state"
import { DOM_KEY, IS_OPEN } from "~common/storage"
import { useStorage } from "~node_modules/@plasmohq/storage/dist/hook"

// test
// https://u.pmdaniu.com/xn98z

export default function Content() {
  const [isOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  const [domKey] = useStorage<string>(DOM_KEY, INIT_STATE.domKey)
  // const scrollDom = useRef(null)
  // const scaleV = useRef(1)

  useEffect(() => {
    if (!isOpen) return
    let onMousewheel: (e: WheelEvent) => void
    let wheelTimer: NodeJS.Timeout | null = null
    let scaleV = 1;

    let iframe: HTMLIFrameElement
    let iframeDocument: Document
    let scrollDom: HTMLElement

    const loopOnIframe = (c: number) => {
      onIframeWheel()
      if (scrollDom || c++ > 10) return
      setTimeout(() => {
        loopOnIframe(c)
      }, 500);
    }

    // 点击左侧导航栏，重新加载获取 iframe 中的元素实现监听。
    const navLi = document.querySelectorAll('.sitemapNode')
    navLi.forEach((li) => {
      li.addEventListener('click', () => {
        iframe = null
        loopOnIframe(0)
      })
    })

    const onIframeWheel = () => {
      if(onMousewheel) {
        iframeDocument.removeEventListener("mousewheel", onMousewheel)
      }

      iframe = document.querySelector(domKey) as HTMLIFrameElement
      iframeDocument = iframe?.contentDocument
      scrollDom = iframeDocument?.querySelector('body')
      if(!scrollDom) return
  
      onMousewheel = (e: WheelEvent) => {
        const isCtrl = e.ctrlKey
        if (!scrollDom || !isCtrl) return
        // e.stopPropagation()
        e.preventDefault();
        if (wheelTimer) {
          clearTimeout(wheelTimer)
        }
        wheelTimer = setTimeout(() => {
          const sv = e.deltaY > 0 ? -1 : 1
          scaleV += sv * 0.1
          scrollDom.style.transform = `scale(${scaleV})`
        }, 10)
      }

      // nav 点击时要重新监听 iframe
      iframeDocument.addEventListener("mousewheel", onMousewheel, { passive: false })
    }
    onIframeWheel()


    // iframeDocument.addEventListener("mousewheel", onMousewheel, { passive: false })
    return () => {
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

  return <></>
}
