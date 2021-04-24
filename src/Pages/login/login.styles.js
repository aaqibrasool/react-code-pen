import styled from "styled-components";

export const LoginStyles = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    button{
        font-size:1.5rem;
        margin-right:1rem;
        color:#f0f0f0;
        background-color:inherit;
        border:1px solid #f0f0f0;
        padding:10px 15px;
        border-radius:8px;
        transition:0.3s ease-in-out;
        &:hover,&:focus{
            cursor: pointer;
            transform:scaleX(1.03);
        }
    }
`