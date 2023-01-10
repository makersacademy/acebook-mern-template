export default function FriendCard (props) {
  const friend = props.friend;

  return (
    <div className='friend-card'>
      <div className="friend-picture">
        <img src='https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png' alt="" height='100' width='100' />
      </div>
      <div className="friend-name-container">
        <p className='friend-name'>{friend.firstName + ' ' + friend.lastName}</p>
      </div>
      
    </div>
  )
}