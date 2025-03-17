import ContentCom from "./content";

// test
// https://u.pmdaniu.com/xn98z

export default function Content() {
  if(!window.location.origin.includes('pmdaniu')) {
    return <></>
  }
  return <ContentCom />
}
