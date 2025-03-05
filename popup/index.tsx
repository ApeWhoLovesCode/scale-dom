import { useStorage } from "@plasmohq/storage/hook";
import { IS_OPEN } from "~common/storage";
import Radio from "./components/Radio";
import "./style.css";

function IndexPopup() {
  const [isOpen, setIsOpen] = useStorage<boolean>(IS_OPEN, false);

  return (
    <div className="bg-black text-white p-4">
      启用插件：<Radio checked={isOpen} onChange={setIsOpen} />
    </div>
  )
}

export default IndexPopup
