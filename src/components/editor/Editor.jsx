import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor} from 'react-codemirror2'
import { EditorStyles, Header } from './editor.styles'
import {MdSettings,MdArrowDropDown} from 'react-icons/md'

const Editor = ({editorName,language,value,onChange,testSol}) => {

    const handleChange = (editor,data,val) => {
        onChange(val)
    }
    return (
        <EditorStyles>
            <Header>
                <div className="left">
                  <MdSettings className='icons'/>
                  <h2>{editorName}</h2>
                </div>
                <div className="right">
                    {editorName === 'Algo' && <div className="algo-buttons">
                        <button onClick={testSol}>Test</button>
                        <button>Save</button>
                    </div>}
                    <MdArrowDropDown className='icons' />
                </div>
            </Header>
            <ControlledEditor
                onBeforeChange={onChange ? handleChange : ''}
                value={value}
                className="code-mirror-wrapper"
                options={{
                lineWrapping: true,
                lint: true,
                mode: language,
                theme: 'dracula',
                lineNumbers: true
                }}
            />
            
        </EditorStyles>
    )
}

export default Editor
