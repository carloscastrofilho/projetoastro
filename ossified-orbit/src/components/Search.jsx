import Fuse from "fuse.js";
import { useState } from 'react';

const option = {
    keys: ['data.title', 'data.description', 'slug'],
    includeMatches: true,
    minMatchCharLenght: 2 ,
}

export default function Search({searchList}){
    const [query,setQuery] = useState('')

    const fuse =  new Fuse(searchList, option )

    const posts = fuse
    .search(query)
    .map(result => result.item )
    .slice(0,5)

    function handleOnSearch({ target ={}}) {
        const {value} = target
        setQuery(()=> value)
    }

    return (
        <>
            <label htmlfor="search">Search Posts</label>
            <input type="text" id="search" 
            value={query}
            onChange={handleOnSearch}
            placeholder="Search Posts" />

            {query.length > 1 && (
                <p>
                    Found {posts.length} {posts.length == 1 ? 'result' : 'results'} for '{query}'

                </p>
            )}
            <ul>
                {posts && posts.map( post => (
                    <li>
                        {post.data.title }
                    </li>
                ))}
            </ul>
        </>
    )

}