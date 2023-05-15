import "./navbutton.css"

function NavButton(prop) {
  const handleClickButton = () => {
    prop.sendTo({address})
  }
  return (
    <button className="navbutton" onClick={handleClickButton}>{prop.linkLabel}</button>
  )
}