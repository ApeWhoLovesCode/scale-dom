import { useEffect } from "react";
import { useStorage } from "~node_modules/@plasmohq/storage/dist/hook";
import { DOM_KEY, IS_OPEN } from "~common/storage"
import { INIT_STATE } from "~common/state";

export default function Content() {
  const [isOpen] = useStorage<boolean>(IS_OPEN, INIT_STATE.isOpen)
  const [domKey] = useStorage<string>(DOM_KEY, INIT_STATE.domKey)
  
  useEffect(() => {
    if(!isOpen) return
    let isCtrl = false;
    const onKeyDown = (e: KeyboardEvent) => {
      if(e.ctrlKey) {
        isCtrl = true
      }
    }

    const onkeyUp = (e: KeyboardEvent) => {
      if(!e.ctrlKey) {
        isCtrl = false
      }
    }

    const onMousewheel = (e: KeyboardEvent) => {
      console.log('e: ', e);
    }
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onkeyUp);
    window.addEventListener("mousewheel", onMousewheel);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onkeyUp);
      window.removeEventListener("mousewheel", onMousewheel);
    };
  }, [isOpen])

  useEffect(() => {
    const scrollDom = document.querySelector(domKey)
    console.log('====scrollDom: ', scrollDom);
    if(scrollDom) {
      
    }
  }, [domKey])

  console.log('---content');

  return (
    <></>
  )
}