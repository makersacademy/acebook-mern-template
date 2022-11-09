export default function FriendCard (props) {
  return (
    <div className='friend-card'>
      <h1>{props.friend.firstName}</h1>
    </div>
  )
}