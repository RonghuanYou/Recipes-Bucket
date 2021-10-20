import React, { useState } from 'react'
import { TextField, Button, Container } from '@material-ui/core'
import Box from '@mui/material/Box';
import Alert from '@material-ui/lab/Alert';

const RecipeForm = (props) => {
    const { onSubmitProp, dbErrors, initName, initSummary, initDesription, initTime, initImg} = props
    const [name, setName] = useState(initName)
    const [summary, setSummary] = useState(initSummary)
    const [description, setDescription] = useState(initDesription)
    const [time, setTime] = useState(initTime)
    const [img, setImg] = useState(initImg)



    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp(name, summary, description, time, img) // create/update
        setName("")
        setSummary("")
        setDescription("")
        setTime("")
        setImg("")
    }
    
    return (
        <Container component="main" maxWidth="xs">
            { dbErrors.length !== 0 ? 
                <Alert severity="error">
                    {dbErrors.map((error, idx) => <p key={idx}> {error} </p>)}
                </Alert> : ""
            }

            <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 1 }}>
                <TextField
                    onChange={e => setName(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={name}
                    autoFocus
                />
                <TextField
                    onChange={e => setSummary(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    label="Summary"
                    name="summary"
                    variant="outlined"
                    value={summary}
                    autoFocus
                />    
                <TextField
                    onChange={e => setDescription(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    autoFocus
                />    

                <TextField
                    onChange={e => setTime(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    label="Total Time"
                    name="time"
                    variant="outlined"
                    value={time}
                    autoFocus
                />

                <TextField
                    onChange={e => setImg(e.target.value)}
                    margin="normal"
                    type="file"
                    fullWidth
                    name="img"
                    accept="image/*"
                    aria-label="add"
                    value={img}
                />

                <Button
                    color="primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m: 3}}
                >
                    Create
                </Button>
            </Box>
        </Container>
    )
}

export default RecipeForm
