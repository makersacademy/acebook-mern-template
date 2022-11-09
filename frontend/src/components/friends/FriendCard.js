export default function FriendCard (props) {
  const friend = props.friend;

  return (
    <div className='friend-card'>
      <p>{friend.firstName + ' ' + friend.lastName}</p>
    </div>
  )
}