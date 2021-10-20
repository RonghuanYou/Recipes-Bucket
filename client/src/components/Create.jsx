import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import axios from 'axios'
import RecipeForm from './RecipeForm'

const Create = () => {
    const [dbErrors, setDbErrors] = useState([])   // backend-validation
    const history = useHistory()

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    
    let creator_id = getCookie('user_id')

    // CREATING A RECIPE IN DB
    const createRecipe = (name, summary, description, time, img) => {
        axios.post("http://localhost:8000/api/new", { name, summary, description, time, img, creator_id})
            .then(res => {
                console.log(res.data)
                // create recipe successfully, redirect to recipes page
                history.push('/recipes')
            })
            .catch(err => {
                console.log(err)
                const { errors } = err.response.data
                const messages = Object.keys(errors).map(att => errors[att].message)
                setDbErrors(messages)
            })
    }

    return (
        <Container>
            <Typography variant='h6' style={{ color: '#C70039', fontWeight: 'bold', marginTop: 30, marginBottom: 10 }}>
                Create a New Recipe
            </Typography>

            <RecipeForm onSubmitProp={createRecipe}
                dbErrors={dbErrors}
                initName=""
                initSummary=""
                initDesription=""
                initTime=""
                initImg=""
            />
        </Container>
    )
}

export default Create
