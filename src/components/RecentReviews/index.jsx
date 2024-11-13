
import {useState, useEffect} from 'react';
import {fetchTopReviews} from './proxy';

export default function RecentReviews(){

    const [recentReviews, setRecentReviews]=useState([]);
    
    useEffect(()=>{
        const fetchReviews= async() =>{
        const reviews = await fetchTopReviews();
        setRecentReviews(reviews)
        }

        fetchReviews();
    },[])

    return (
        <div>
         Most Recent Reviews
         {recentReviews?.map(review=>{
            return <li>{review.authorId}</li>
         })
        }
        </div>
    )
}