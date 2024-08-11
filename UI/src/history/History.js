import React from 'react'
import TopBar from '../component/TopBar'
import ViewsCollection from './ViewsCollections'
import Bookmark from './BookmarkCollections'
import LikesCollection from './LikesCollection'
import Foot from '../FrontPage/foot';
const history = () => {
    return (
        <>
            <TopBar />
            <div className='text-[3vw] mx-5 my-4 font-bold'>
                History
            </div>
            <Bookmark />
            <ViewsCollection />
            <LikesCollection />
            <div>
                <Foot />
            </div>
        </>
    )
}

export default history