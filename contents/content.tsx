import { useEffect } from "react"

import { INIT_STATE, MAX_SCALE, MIN_SCALE } from "~common/state"
import { DOM_KEY, IS_OPEN, SCALE_FACTOR } from "~common/storage"
import { useStorage } from "~node_modules/@plasmohq/storage/dist/hook"

// test
// https://u.pmdaniu.com/xn98z

export default function Content() {
  const [isOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  const [domKey] = useStorage<string>(DOM_KEY, INIT_STATE.domKey)
  const [scaleFactor] = useStorage(SCALE_FACTOR, INIT_STATE.scaleFactor)
  // const scrollDom = useRef(null)
  // const scaleV = useRef(1)

  useEffect(() => {
    if (!isOpen) return
    let onMousewheel: (e: WheelEvent) => void
    let wheelTimer: NodeJS.Timeout | null = null
    let scaleV = 1;

    let iframeDocument: Document
    let scrollDom: HTMLElement

    const loopOnIframe = (c: number) => {
      if (scrollDom || c++ > 10) return
      setTimeout(() => {
        onIframeWheel()
        loopOnIframe(c)
      }, 500);
    }

    // 点击左侧导航栏，重新加载获取 iframe 中的元素实现监听。
    const navLi = document.querySelectorAll('.sitemapNode')
    navLi.forEach((li) => {
      li.addEventListener('click', () => {
        scrollDom = null
        scaleV = 1;
        loopOnIframe(0)
      })
    })

    const onIframeWheel = () => {
      if(onMousewheel) {
        iframeDocument.removeEventListener("mousewheel", onMousewheel)
      }

      const iframe = document.querySelector(domKey) as HTMLIFrameElement
      iframeDocument = iframe?.contentDocument
      scrollDom = iframeDocument?.querySelector('body')
      console.log('=======scrollDom: ', scrollDom);
      if(!scrollDom) return

      // 左上角为缩放中心 防止出现丢失情况。
      scrollDom.style.transformOrigin = 'left top'
  
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
          const _scaleFactor = isNaN(Number(scaleFactor)) ? 0 : Number(scaleFactor)
          scaleV = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scaleV + sv * _scaleFactor))
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
  }, [isOpen, domKey, scaleFactor])

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
