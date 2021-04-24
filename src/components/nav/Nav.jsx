import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useData } from '../../context/DataContext'
import { addingTopic, addingSolutionToExercise, addExercise } from '../../firebase'
import { ButtonStyles, NavStyles, PaginationButton} from './nav.styles'
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'
import parser from 'posthtml-parser'
import CSSOM from 'cssom'
import parse from 'shift-parser'
import { useAuth } from '../../context/AuthContext'

const Nav = () => {
    const {html,setHtml,steps,setAlgo,css,setCss,js,setJs,solutions,setSolutions,solPagination,setSolPagination,pagination,setPagination} = useData()
    const {currentUser} = useAuth()
    const {uid} = currentUser
    const [showSolutions, setShowSolutions] = useState(false)
    const {userType} = useAuth()
    const {lesson} = useParams()

    const handleAddTopicClick = () => {
        if(!css && !js && html) {
            const code = [{html}]
            addingTopic(uid,(steps.length + 1),'html',code,lesson,'code')
            setHtml('')
            return
        }
        if(!html && !js && css) {
            const code = [{css}]
            addingTopic(uid,(steps.length + 1),'css',code,lesson,'code')
            setCss('')
            return
        }
        if(!html && !css && js){
            const code = [{js}]
            addingTopic(uid,(steps.length + 1),'js',code,lesson,'code')
            setJs('')
            return
        }
        if(html && css && !js){
            const code = [{html,css}]
            addingTopic(uid,(steps.length + 1),'html,css',code,lesson,'code')
            setHtml('')
            setCss('')
            return
        }
        if(css && js && !html){
            const code = [{css,js}]
            addingTopic(uid,(steps.length + 1),'css,js',code,lesson,'code')
            setCss('')
            setJs('')
            return
        }
        if(html && js && !css){
            const code = [{html,js}]
            addingTopic(uid,(steps.length + 1),'html,js',code,lesson,'code')
            setJs('')
            setHtml('')
            return
        }
        if(html && css && js){
            const code = [{html,css,js}]
            addingTopic(uid,(steps.length + 1),'html,css,js',code,lesson,'code')
            setHtml('')
            setCss('')
            setJs('')
            return
        }
        if(!html && !css && !js){
            alert('please write first in the given boxes before adding the topic')
            return
        }
    }
    const handleAddExercise = () => {
        if(html && !css && !js) {
            const statement = html.split('exercise statement:')[1].split('-->')[0]
            addExercise(uid,'exercise','html',statement,lesson,(steps.length + 1))
            setHtml('')
            return
        }
        if(css && !html && !js){
            const statement = css.split('exercise statement:')[1].split('*/')[0]
            addExercise(uid,'exercise','css',statement,lesson,(steps.length + 1))
            setCss('')
            return
        }
        if(js && !html && !css){
            const statement = js.split('exercise statement:')[1].split('*/')[0]
            addExercise(uid,'exercise','js',statement,lesson,(steps.length + 1))
            setJs('')
            return
        }
    }
    const handleSaveExercise = () => {
        const a = solutions.filter(solution=>solution.status !== true)
        if (a.length > 0){
            alert('first evaluate all the solution correctly')
            return
        }
        setShowSolutions(false)
        setPagination(1)
    }
    const handleAddSolution = () => {
        if(html && !css && !js){
            const sol = html.split('<!-- EXERCISE START -->')[1].split('<!-- EXERCISE END -->')[0].trim()
            addingSolutionToExercise(uid,pagination,lesson,sol)
            return
        }
        if(css && !html && !js){
            const sol = css.split('exercise start')[1].split('exercise end')[0].trim()
            addingSolutionToExercise(uid,pagination,lesson,sol)
            return
        }
        if(js && !html && !css){
            const sol = js.split('exercise start */')[1].split('exercise end')[0].trim()
            addingSolutionToExercise(uid,pagination,lesson,sol)
            return
        }
    }
    const handlePrevForTopics = () => {
        if(pagination === 1)  return
        setPagination(pagination - 1)
    }
    const handleNextForTopics = () => {
        if(pagination >= steps.length) return 
        setPagination(pagination + 1)
    }
    const handlePrevforSolution = () => {
        if(solPagination === 1) return
        setSolPagination(solPagination - 1)
    }
    const handleNextForSolutions = () => {   
        if(solPagination >= solutions.length) return
        setSolPagination(solPagination + 1)
    }

    useEffect(()=>{
        if(pagination > steps.length) return
            setHtml('')
            setCss('')
            setJs('')
            setAlgo(undefined)
        if (steps[pagination - 1].type === 'code'){
            
            if('html' in steps[pagination - 1].code[0]){
                setHtml(steps[pagination - 1].code[0].html)
            }
            if('css' in steps[pagination - 1].code[0]){
                setCss(steps[pagination - 1].code[0].css)
            }
            if('js' in steps[pagination - 1].code[0]){
                setJs(steps[pagination - 1].code[0].js)
            }
            setShowSolutions(false)
            return
        }
        if(steps[pagination -1].type === 'exercise'){
            setShowSolutions(true)
            setSolPagination(1)
            if(steps[pagination - 1].solutions.length === 0){
                if(steps[pagination - 1].lang === 'html'){
                    setHtml(`<!-- EXERCISE Statement: ${steps[pagination - 1].statement} -->\n<!-- EXERCISE START -->\n\t\n<!-- EXERCISE END -->`)
                    setSolutions(steps[pagination - 1].solutions)
                    return
                }
                if(steps[pagination - 1].lang === 'css'){
                    setCss(`/* exercise statement: ${steps[pagination - 1].statement}\n\texercise start*/\n\n\t/*exercise end\n*/`)
                    setSolutions(steps[pagination - 1].solutions)
                    return
                }
                if(steps[pagination - 1].lang === 'js'){
                    console.log('yes')
                    setJs(`/* exercise statement: ${steps[pagination - 1].statement}\n\texercise start*/\n\n\t/*exercise end\n*/`)
                    setSolutions(steps[pagination - 1].solutions)
                    return
                }
            }
            setSolutions(steps[pagination - 1].solutions)
            return
        }
    },[pagination,steps,setHtml,setCss,setJs,setSolPagination,setAlgo,setSolutions])
    useEffect(()=>{
        if(solPagination === undefined) return
        if(steps[pagination - 1].lang === 'html'){
            setHtml(
                 `<!-- EXERCISE Statement: ${steps[pagination - 1].statement} -->\n<!-- EXERCISE START -->\n\t${solutions[solPagination -1].sol}\n<!-- EXERCISE END -->`
             )
    
            const ast = parser(solutions[solPagination -1].sol) 
            setAlgo(`const ast = ${JSON.stringify(ast)} \n /* starting writing your algo under this */ \n const sMsg=''; \n const eMsg=''; \n`)
            return
        }
        if(steps[pagination - 1].lang === 'css'){
            setCss(`/* exercise statement: ${steps[pagination - 1].statement}\n\texercise start*/\n\t${solutions[solPagination -1].sol}\n\t/*exercise end\n*/`)
            const ast = CSSOM.parse(solutions[solPagination - 1].sol)
            console.log(ast)
            //setAlgo(`const ast = ${ast.cssRules[0]} \n const message='';`)
            return
        }
        if(steps[pagination - 1].lang === 'js'){
            setJs(`/* exercise statement: ${steps[pagination - 1].statement}\n\texercise start\n\t*/\n\t${solutions[solPagination -1].sol}\n\t/*exercise end\n*/`)
            const ast = parse('const a = undefined')
            return
        }
    },[solPagination,setHtml])
    return (
        <NavStyles>
                <div className="left">
                    {userType === 'teacher' && <ButtonStyles onClick={handleAddTopicClick} disabled={showSolutions}>Add Topic</ButtonStyles>}
                    <div className="topics-pagination">
                        {steps.length > 1 && <AiFillCaretLeft onClick={handlePrevForTopics} /> }
                        {steps.length > 0 && 
                                <div className="pagination-container">
                                    {steps.map(({id})=> 
                                            <PaginationButton 
                                                    key={id} 
                                                    onClick={e=>setPagination(parseInt(e.target.textContent))} 
                                                    className={pagination.toString() === id ? 'current-step': ''}
                                            >
                                            {id}
                                            </PaginationButton>) 
                                    }
                                </div>
                        }
                        {steps.length > 1 && <AiFillCaretRight onClick={handleNextForTopics} />}
                    </div>
                </div>
                <div className="right">
                    {!showSolutions && userType === 'teacher' && <ButtonStyles onClick={handleAddExercise}>Add Exercise</ButtonStyles>}
                    <div className="sol-pagination">
                        {solutions.length > 1 && showSolutions && <AiFillCaretLeft onClick={handlePrevforSolution} /> }
                        {solutions.length >=1 &&showSolutions && solutions.map(solution => 
                                                                                <PaginationButton 
                                                                                    key={solution.id}
                                                                                    className={solPagination === solution.id ? 'current-step': ''}
                                                                                    onClick={e=>setSolPagination(parseInt(e.target.textContent))}
                                                                                >
                                                                                    {solution.id}
                                                                                </PaginationButton>
                                                                                )
                        }
                        {solutions.length > 1 && showSolutions && <AiFillCaretRight onClick={handleNextForSolutions} />}
                    </div>
                    {showSolutions && <ButtonStyles onClick={handleAddSolution}>Add Solution </ButtonStyles>}
                    {showSolutions && <ButtonStyles onClick={handleSaveExercise}>Save Exercise</ButtonStyles>}
                </div>
        </NavStyles>
    )
}

export default Nav
