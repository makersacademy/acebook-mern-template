export const NewPost = () => {
  return (
    <form onSubmit={handleSubmit} id='new-post-form'>
      <label for='input-message' >Write your message</label>
      <input type='text' />
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