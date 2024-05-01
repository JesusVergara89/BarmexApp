import React, { useEffect, useState } from 'react'
import '../styles/Listcomments.css'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../FirebaseConfig'

const Listcomments = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, "Articles")
        onSnapshot(collectionRef, (snapshot) => {
            const commentsData = []
            snapshot.forEach((doc) => {
                commentsData.push(doc.data())
            })
            setComments(commentsData)
        })
    }, [])

    return (
       <div className="List_comments">
        {comments && 
            comments.map((comment, i)=> (
                <div key={i} className='Card_list'>

                    <h2>{comment.name}</h2>

                    <h3>{comment.Email}</h3>

                    <p>{comment.description}</p>

                    <div>{comment.createdAt.toDate().toDateString()}</div>

                </div>
            ))
        }
       </div>
    )
}

export default Listcomments
