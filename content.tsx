import ContentCom from "./content/index";

// test
// https://u.pmdaniu.com/xn98z

export default function Content() {
  if(!window.location.origin.includes('pmdaniu')) {
    return <></>
  }
  return <ContentCom />
}
