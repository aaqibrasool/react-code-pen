import styled from "styled-components";

export const NavStyles = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom:0.5rem;
    padding:0 1rem;
    .left{
        display:flex;
        align-items:center;
        .topics-pagination{
            margin-left:1rem;
            display:flex;
            align-items:center;
        }
    }
    .right{
        display:flex;
        align-items:center;
        .sol-pagination{
            display:flex;
            align-items:center;
            margin-right:1rem;
        }
    }
    .current-step{
        background-color:#b2b2b2;
    }
    svg{
                font-size:1.4rem;
                cursor: pointer;
    }
`
export const ButtonStyles = styled.button`
    padding:0.5rem 1rem;
    background-color: inherit;
    color: #f0f0ff;
    border: 2px solid #f0f0ff;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
        transform:scaleX(1.1);
    }
`
export const PaginationButton = styled.button`
    padding:0.2rem 0.4rem;
    background-color:#f0f0ff;
    color:#333642;
    margin:0 5px;
    transition:0.3s ease-in-out;
    &:hover,&:focus{
        cursor:pointer;
        background-color:#332a38;
        color:#f0f0ff;
        outline:none;
    }

`