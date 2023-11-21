import React from "react";

const LikeButton = (props) => {
    const handleLike = () => {
    
    props.count     // update the original array - push(userID) 
    props.setCount  // update the count number

    
    console.log(props.post.likes)
  }
    return (
        <img src='thumb-icon.png' className='like-btn' alt='thumb' onClick={handleLike}/>
    )
}
 


// const CountDisplay = (props) => {
//     return <h1>{props.count}</h1>;
// };

// const CountButton = (props) => {
// const incrementCounter = () => {
//     props.setCount(props.count + 1);
// };

// return <button onClick={incrementCounter}>Increment the counter</button>;
// };

// const Counter = () => {     
// const [count, setCount] = useState(0);

// return (
//     <div>
//     <CountDisplay count={count} />
//     <CountButton setCount={setCount} count={count} />
//     </div>
// );
// };