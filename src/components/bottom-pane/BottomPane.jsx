import React,{useState,useEffect} from 'react'
import { useData } from '../../context/DataContext'
import { Header } from '../editor/editor.styles'
import { BottomPaneStyles, IframeContainer } from './bottomPane.styles'
import Editor from '../editor/Editor'
import { addResultTestToSolution } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router'

const BottomPane = () => {
    const {html,css,js,algo,setAlgo,steps,solPagination,pagination} = useData()
    const {currentUser} = useAuth()
    const {uid} = currentUser
    const {lesson} = useParams()
    const [srcDoc, setSrcDoc] = useState('')
    const testSolution = () => {
        let resultText=eval("(function (){"+algo+"})();");
        if(resultText.status) {
            const {status,message } = resultText
            const code = algo.split('/* starting writing your algo under this */')[1]
            addResultTestToSolution(uid,lesson,pagination,(solPagination - 1),status,message,code)
        }

    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
                <script>${algo}</script>
                </html>
            `)
        }, 450)
        return () => clearTimeout(timeout)
    }, [html, css, js, algo])
    return (
        <BottomPaneStyles>
            <IframeContainer>
                <Header>
                    <div className="left">
                        <h2>Display</h2>
                    </div>
                </Header>
                <iframe 
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </IframeContainer>
            {algo && <div className="editor">
                <Editor editorName='Algo' language='javascript' value={algo} onChange={setAlgo} testSol={testSolution} />
            </div>}
        </BottomPaneStyles>
    )
}

export default BottomPane
