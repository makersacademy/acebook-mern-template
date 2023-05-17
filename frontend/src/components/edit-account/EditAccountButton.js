import React, { useState } from 'react';

const EditAccountButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  const [value, setValue] = useState("")

  const handleButtonPress = () => {
    setIsPressed(prevStat => !prevStat)
  }

  const onChangeValueInput = (event) => {
    setValue(event.target.value)
  }

  const submitChange = () => {
    console.log('well done mate')
  }

  return (
    <>
    {(isPressed ? 
    <form onSubmit={submitChange}>
      <input className="edit-form" onChange={onChangeValueInput} type="text" value={value} />
      <button className="edit-button" type="submit">Submit</button>
    </form> :
    <button onClick={handleButtonPress}>Press me please!</button>
    )}
    </>
  )
}

export default EditAccountButton;