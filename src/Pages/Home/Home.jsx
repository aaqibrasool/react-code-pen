import React, {  useEffect, useState } from 'react'
import { useHistory} from 'react-router';
import { addLessonToLessonsCollection, deleteLessonFromLessonsCollection } from '../../firebase'
import { firestore } from '../../firebase';
import { HomeStyles, Container, InputContainer, LessonsContainer, LessonContainer, LessonButtons } from './home.styles'
import {useAuth} from '../../context/AuthContext'

const Home = () => {
    const [lessonName,setLessonName] = useState('')
    const [lessons, setLessons] = useState([]);
    const history = useHistory()
    const {currentUser,userType} = useAuth()
    const {uid} = currentUser
    const [teacherIds,setTeacherIds] = useState([])

    const handleAddLessonClick = () => {
        const url = lessonName.replace(/\s+/g, '')
        addLessonToLessonsCollection(uid,url,lessonName)
        setLessonName('')
    }
    const deleteLesson = (e) => {
        const id = e.target.parentElement.parentElement.children[0].textContent.replace(/\s+/g, '')
        deleteLessonFromLessonsCollection(uid,id)
    }
    const editLesson = (e) => {
        const id = e.target.parentElement.parentElement.children[0].textContent.replace(/\s+/g, '')
        history.push(`/${id}`)
    }
    const openLesson = (e) => {
        const id = e.target.parentElement.parentElement.children[0].textContent.replace(/\s+/g, '')
        history.push(`/${id}`) 
    }

    useEffect(() => {
        if(userType === 'student') return
        const unsub = firestore.collection('teacher').doc(`${uid}`).collection('lessons')
            .orderBy('createdAt')
            .onSnapshot(snap=>{
            let docs = []
            snap.forEach(doc=>{
                docs.push({...doc.data()})
            })
            setLessons(docs)
        })
        return () => unsub();
    }, [userType]);

  useEffect(() => {
        if(userType === 'teacher') return
        const unsub = firestore.collection('teacher')
            .orderBy('createdAt')
            .onSnapshot(snap=>{
            let docs = []
            snap.forEach(doc=>{
                const {id} = doc
                docs.push(id)
            })
            setTeacherIds(docs)
        })
        
        return () => unsub();
  }, [userType]);

  useEffect(()=>{
      if(teacherIds.length === 0) return
      let docs = []
       teacherIds.map((el) => {
           firestore.collection('teacher').doc(`${el}`).collection('lessons')
            .orderBy('createdAt')
            .onSnapshot(snap=>{
            snap.forEach(doc=>{
                docs.push({...doc.data()})
            })
        })
       })
       setTimeout(()=>{setLessons(docs)},2000)
  },[teacherIds])

    return (
        <HomeStyles>
            <Container>
                {userType === 'teacher' && 
                    <InputContainer>
                        <input type="text" name="" value={lessonName} onChange={e=>setLessonName(e.target.value)}/>
                        <button onClick={handleAddLessonClick}>Add Lesson</button>
                    </InputContainer>
                }
                <div className="title">
                    <h1>Lessons: </h1>
                    <h2>Operations</h2>
                </div>
               {lessons.length > 0 && <LessonsContainer>
                    {lessons.map(lesson=> 
                                    <LessonContainer key={lesson.id}>
                                            <h2>{lesson.name}</h2>
                                            <LessonButtons justify={userType === 'teacher' ? 'space-evenly' : 'center'}>
                                                {userType === 'student' && <button onClick={openLesson}>open</button>}
                                                {userType === 'teacher' && 
                                                    <>
                                                    <button onClick={editLesson}>edit</button>
                                                    <button onClick={deleteLesson}>delete</button>
                                                    </>
                                                }
                                            </LessonButtons>
                                    </LessonContainer>
                    )}
                </LessonsContainer>}
            </Container>
        </HomeStyles>
    )
}

export default Home
