import React, {useContext} from 'react';
import { FindContext } from '../findContext/FindContext.js';


const Result = () => {
    const { searchResults } = useContext(FindContext);
    console.log(searchResults);
    return (
        <>
        {JSON.stringify(searchResults)}
        </>

    );
}

export default Result;