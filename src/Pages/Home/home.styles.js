import styled from "styled-components";

export const HomeStyles = styled.div`
    color:#fff;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
export const Container = styled.div`
    width:600px;
    min-height:400px;
    .title{
        display:flex;
        justify-content:space-between;
        margin-bottom:1rem;
        margin-right:2rem;
    }    
`
export const InputContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:2rem;
    input{
        background-color:inherit;
        border:none;
        border-bottom:2px solid #fff;
        color:#fff;
        padding:5px 10px;
        font-size:1.5rem;
        :focus,:hover{
            outline:none;
        }
    }
    button{
        background-color:#fff;
        color:#333642;
        padding:10px 15px;
        cursor: pointer;
        font-size:1.2rem;
        font-weight:bold;
        border:none;
        border-radius:5px;
        &:hover,&:focus{
            background-color:#cccccc;
            outline:none;
        }
    }
`
export const LessonsContainer = styled.div`
    width:100%;
`
export const LessonContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-bottom:1rem; 
    h2{
        flex:70;
    }
`
export const LessonButtons = styled.div`
        flex:30;
        display:flex;
        justify-content:${({justify})=>justify};
        button{
            background-color:inherit;
            color:#fff;
            padding:5px 10px;
            border:1px solid #fff;
            border-radius:5px;
            cursor: pointer;
            transition:0.2s ease-in-out;
            &:hover{
                transform:scaleX(1.1)
            }
        }

`