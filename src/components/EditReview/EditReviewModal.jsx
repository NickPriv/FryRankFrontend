import style from "./style.module.css"

export default function EditReviewModal({review, restaurant, onSave, onClose}){

    return (
    <>
        <div className={style['modal-backdrop']} onClick={onClose}></div>
        <dialog className={style['modal-content']} open>
            <h2>Let's edit your review</h2>
            <h3>{review.title }</h3> 
            <h3>{review.score }</h3> 
            <h3>{review.author }</h3>
            <h3> {restaurant.displayName.text}</h3> 
        <form method="dialog">
            <button onClick={onClose}>Close</button>
        </form>
        </dialog>
   </>
)
}