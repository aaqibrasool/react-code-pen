import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { auth, googleProvider } from '../../firebase'
import { LoginStyles } from './login.styles'

const Login = () => {
    const history = useHistory()
    const {setUserType} = useAuth()
    const LoginasTeacher = async () => {
        const {user} = await auth.signInWithPopup(googleProvider)
        setUserType('teacher')
        history.push('/')
    }
    const LoginasStudent = async () => {
        const {user} = await auth.signInWithPopup(googleProvider)
        setUserType('student')
        history.push('/')
    }
    return (
        <LoginStyles>
                <button onClick={LoginasTeacher}>Login as Teacher</button>
                <button onClick={LoginasStudent}>Login as Student</button>
        </LoginStyles>
    )
}

export default Login

