import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config  = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = firebase.initializeApp(config)

export const auth = app.auth()
export const firestore = app.firestore()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt:'select_account'})

export const addLessonToLessonsCollection = async (uid,url,name) => {
    const id = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc().id
    const lessonRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(id)
    const snapShot = await lessonRef.get()
    if(!snapShot.exists){
        const createdAt = timestamp()
         try {
            await lessonRef.set({
            id,
            name,
            createdAt,
            url
            })
         } catch (error) {
          console.log('error while adding', error)        
        }
    }
}
export const deleteLessonFromLessonsCollection = async (uid,id) => {
    const lessonRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(id)
    const snapShot = await lessonRef.get()
    if(snapShot.exists){
        lessonRef.delete()
    }
}
export const addingTopic = async (uid,id,lang,code,lesson,type) => {

    const TopicRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(lesson).collection('topics').doc(`${id}`)
    const snapShot = await TopicRef.get()
    if(!snapShot.exists){
        const createdAt = timestamp()
        try{
            await TopicRef.set({
              id,
              type,
              lang,
              code,
              createdAt,
            })
        }catch(e){
            console.log('error while adding', e)
        }
    }
}
export const addingSolutionToExercise = async (uid,id,lesson,sol) => {

    const stepRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(lesson).collection('topics').doc(`${id}`)
    const snapShot = await stepRef.get()
    if(snapShot.exists){
        const {solutions} = snapShot.data()
        solutions.push({sol,id:(solutions.length + 1)})
        try{
            await stepRef.set({
              ...snapShot.data(),
              solutions  
            })
        }catch(e){
            console.log(e)
        } 
    }

}
export const addResultTestToSolution =async (uid,lesson,id,solId,status,msg,code) => {
    const stepRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(lesson).collection('topics').doc(`${id}`)
    const snapShot = await stepRef.get()
    if(snapShot.exists){
        const {solutions} = snapShot.data()
        const reqdSol = solutions[solId]
        solutions[solId] = {...reqdSol,status,msg,code}
        try{
            await stepRef.set({
              ...snapShot.data(),
              solutions  
            })
        }catch(e){
            console.log(e)
        }

    }
}
export const addExercise = async (uid,type,lang,statement,lesson,id) => {
    const ExerciseRef = firestore.collection('teacher').doc(`${uid}`).collection('lessons').doc(lesson).collection('topics').doc(`${id}`)
    const snapShot = await ExerciseRef.get()
    if(!snapShot.exists){
        const solutions = []
        const createdAt = timestamp()
        try{
            await ExerciseRef.set({
              id,
              type,
              lang,
              statement,
              solutions,
              createdAt,
            })
        }catch(e){
            console.log('error while adding', e)
        }
    }
}
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()