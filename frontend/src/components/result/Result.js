import React, {useContext} from 'react';
import { FindContext } from '../findContext/FindContext.js';


const Result = () => {
    const { searchResults } = useContext(FindContext);
    console.log(searchResults);
    return (
        <div className="result-container">
            {searchResults.map(result => (
                <div>
                    <h2>{result.message}</h2>
                    <p>{result.author} - {new Date(result.date).toLocaleString()}</p>
                    <p>Likes: {result.likes}</p>
                    <p>Comments:</p>
                    <ul className="comment-list">
                        {result.comments.map(comment => (
                            <li key={comment._id}>{comment.comment_message}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        //{JSON.stringify(searchResults)}

    );
}

export default Result;