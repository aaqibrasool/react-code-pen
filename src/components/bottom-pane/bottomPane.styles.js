import styled from "styled-components";

export const BottomPaneStyles = styled.div`
    width:100%;
    height:50vh;
    color:#fff;
    display:flex;
    padding:1rem;
    justify-content:space-between;
    .editor{
        flex:1;
    }
`
export const IframeContainer = styled.div`
    width:100%;
    height:100%;
    background-color:#282A36;
    margin-right:1rem;
    flex:2;
    iframe{
        
    }
    &:last-child{
        margin-right:0;
    }
    
`