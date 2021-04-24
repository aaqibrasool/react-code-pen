import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { LessonStyles } from './lesson.styles'
import {firestore} from '../../firebase'
import TopPane from '../../components/top-pane/TopPane'
import BottomPane from '../../components/bottom-pane/BottomPane'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'

const Lesson = () => {
    const {lesson} = useParams()
    const {setSteps} = useData()
    const {currentUser} = useAuth()
    const {uid} = currentUser
    useEffect(()=>{
        const unsub = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(lesson).collection('topics')
        .orderBy('createdAt')
        .onSnapshot(snap=>{
            let documents = [];
            snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
             });
             setSteps(documents)
        })
    return () => unsub();
    },[lesson,setSteps])
    return (
        <LessonStyles>
            <TopPane />
            <BottomPane />
        </LessonStyles>
    )
}

export default Lesson
