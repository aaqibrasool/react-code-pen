import React from 'react'
import EditorsContainer from '../editors-container/EditorsContainer'
import Nav from '../nav/Nav'
import { TopPaneStyles } from './topPane.styles'

const TopPane = () => {
    return (
        <TopPaneStyles>
            <Nav />
            <EditorsContainer></EditorsContainer>
        </TopPaneStyles>
    )
}

export default TopPane
