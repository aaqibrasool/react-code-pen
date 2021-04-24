import React from 'react'
import { EditorsContainerStyles } from './editorsContainer.styles'
import Editor from '../editor/Editor'
import { useData } from '../../context/DataContext'

const EditorsContainer = () => {
    const {html,css,js,setHtml,setCss,setJs,steps,pagination} = useData()
    let stepType = ''
    if(steps.length > 0){
        stepType = steps[pagination - 1].type
    }
    console.log(stepType)
    //let StepType = steps[pagination -1].type
    return (
        <EditorsContainerStyles>
            <Editor editorName='HTML' language='xml' value={html} onChange={setHtml} />
            <Editor editorName='CSS' language='css' value={css}  onChange={setCss}/>
            <Editor editorName='JS' language='javascript' value={js} onChange={setJs} />
        </EditorsContainerStyles>
    )
}

export default EditorsContainer
