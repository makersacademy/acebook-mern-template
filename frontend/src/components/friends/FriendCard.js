export default function FriendCard (props) {
  const friend = props.friend;

  return (
    <div className='friend-card'>
      <div className="friend-picture">
        <img src='' alt="" height='100' width='100' />
      </div>
      <div className="friend-name">
        <p>{friend.firstName + ' ' + friend.lastName}</p>
      </div>
      
    </div>
  )
}