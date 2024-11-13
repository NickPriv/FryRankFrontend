
import {useState, useEffect} from 'react';
import {fetchTopReviews} from './proxy';
import { FrySpinner, ReviewCardList } from '../Common';

export default function RecentReviews(){

    const [recentReviews, setRecentReviews]=useState(null);
    
    useEffect(()=>{
        const fetchReviews= async() =>{
        const reviews = await fetchTopReviews();
        setRecentReviews(reviews)
        }

        fetchReviews();
    },[])

    if (!recentReviews) {
        return <p><FrySpinner/></p>;
    }
    else if (recentReviews.length === 0) {
        return <p>Sorry, no reviews published yet.</p>
    }
    return (
        <div>
            <h1>Most Recent Reviews</h1>
            <ReviewCardList
                reviews={recentReviews}
                currentRestaurants={null}
            />         
       </div>
    )
}