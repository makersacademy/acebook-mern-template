import React, { useState } from 'react';
import FileUploader from '../file-uploader/FileUploader.js';

const EditAccountButton = ({toggleRefresh, valueToChange}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [value, setValue] = useState("")

  const toggleButton = () => {
    setIsPressed(prevStat => !prevStat)
  }

  const onChangeValueInput = (event) => {
    setValue(event.target.value)
  }

  const submitChange = async (event) => {
    event.preventDefault()
    if(token) {
      fetch('/accounts/edit', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"fieldToEdit": valueToChange, "newValue": value})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setValue("")
      })
      .then(() => toggleRefresh())
      .then(() => toggleButton())
  }}

  const handlePhotoChange = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setValue(reader.result);
    }
  }

  return (
    <>
  {valueToChange === "photo" ? (
    isPressed ? (
      <>
        <form onSubmit={submitChange}>
          <FileUploader
            onFileSelectSuccess={(file) => {handlePhotoChange(file)}}
            onFileSelectError={({error}) => alert(error)}
          />
          <button className="edit-button" type="submit">Submit</button>
        </form>
      </>
    ) : (
      <>
        <button onClick={toggleButton}>Edit</button>
      </>
    )
  ) : (
    isPressed ? (
      <form onSubmit={submitChange}>
        <input className="edit-form" onChange={onChangeValueInput} type="text" value={value} />
        <button className="edit-button" type="submit">Submit</button>
      </form>
    ) : (
      <button onClick={toggleButton}>Edit</button>
    )
  )}
</>

  )
}

export default EditAccountButton;
