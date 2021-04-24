import styled from "styled-components";

export const EditorStyles = styled.div`
    width:100%;
    height: 100%;
    margin-right:1rem;
    flex:1;
    &:last-child{
        margin-right:0;
    }
    &::-webkit-scrollbar{
        width:10px;
        border:1px solid black;
    }
    &::-webkit-scrollbar-track{
        border-radius:5px;
        box-sizing:inset 0 0 10px rgba(0,0,0,0.25);
    }
    &::-webkit-scrollbar-thumb{
        border-radius:5px;
        background-color:#1d1322;
    }
`
export const Header = styled.div`
    background-color:#1D1E22;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.5rem;

    .left{
        display:flex;
        align-items:center;
        h2{
            margin-left:0.5rem;
        }
    }
    .icons{
        background-color:#333642;
        padding:0.2rem;
        font-size:1.5rem;
    }
    .right{
        display:flex;
        align-items:center;
        button{
            margin-right:1rem;
            background-color:#333642;
            color:#fff;
            padding:0.3rem 0.5rem;
            cursor: pointer;
            border:none;
            border-radius:3px;
        }
    }
`