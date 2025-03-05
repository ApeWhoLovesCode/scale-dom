import { useEffect } from "~node_modules/@types/react"

export default function Content() {

  useEffect(() => {
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
  }, [])

  return (
    <></>
  )
}