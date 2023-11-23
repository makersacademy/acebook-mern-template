
import React, { useState } from 'react';
import { useContext } from 'react';
import { FindContext } from '../findContext/FindContext.js';

import Post from '../post/Post';
import App from '../app/App';


const Find = ({posts, comments, navigate}) => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  const { searchResults, setSearchResults } = useContext(FindContext);
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearch = () => {
    const foundPosts = posts.filter(post =>
      post.message.includes(searchQuery) 
    );

    // const foundComments = comments.filter(comment =>
    //   comment.comment_message.includes(searchQuery)
    // );

    const combinedResults = [...foundPosts];

    setSearchResults(combinedResults);
    navigate('/search')
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}/>
      <button onClick={handleSearch} >Search</button>
      
        <div>{searchResults}</div>
    </div>

  );
}

export default Find;

// const Find = ({ posts, comments, navigate}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     const foundPosts = posts.filter(post =>
//       post.message.includes(searchQuery) 
//     );

//     const foundComments = comments.filter(comment =>
//       comment.comment_message.includes(searchQuery)
//     );


//     const combinedResults = [...foundPosts, ...foundComments];

//     setSearchResults(combinedResults);
//     navigate('/search')
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <button onClick={handleSearch} >Search</button>
      


//         <div>{searchResults}</div>
//     </div>
//   );
// };

// export default Find;
