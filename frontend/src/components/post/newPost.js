export const NewPost = () => {
  return (
    <form onSubmit={handleSubmit}>
      <label for='input-message' >Write your message</label>
      <textarea name="input-message" id="input-message" cols="30" rows="10" placeholder='Write your post here'></textarea>
      <button type="submit">Send</button>
    </form>
  )
}

const handleSubmit = () => {
  fetch('localhost:3000',{
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: document.getElementById('input-message').value
  })
}