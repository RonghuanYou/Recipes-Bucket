import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
// import CameraIcon from '@mui/icons-material/PhotoCamera';
// import {PhotoCamera} from '@material-ui/icons'
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles'

const UseStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
        marginRight: '20px'
    },
    buttons: {
        marginTop: '40px'
    },
    cardGrid: {
        padding: '20px'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1
    },
    textOverflow:{
        maxWidth: "250px",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    mr: {
        marginRight: theme.spacing(2),
    }
}))

// DISPLAY ALL RECIPES AND MY RECIPE LIST
const Recipes = () => {
    const classes = UseStyles()
    const [recipes, setRecipes] = useState([])
    const [myRecipes, setMyRecipes] = useState([])

    const [isMyRecipe, setIsMyRecipe] = useState(false)
    // let user_id = localStorage.getItem("user_id");
    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    let user_id = getCookie('user_id')

    const logOut = () => {
        localStorage.clear();
        axios.get("http://localhost:8000/api/logout", { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    // GET ALL RECIPES FROM SERVER
    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => {
                setRecipes(res.data.allRecipes);
                setMyRecipes(res.data.allRecipes.filter((recipe) => user_id === recipe.creator_id))
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    // DELETE ONE RECIPE BY ID
    



    return (
        <div>
            <CssBaseline />
            <AppBar position="relative" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Typography>
                        <Link to="/" className={classes.mr} style={{ color: '#C70039', fontWeight: 'bold', fontFamily: "Cursive", fontSize: 30 }}>Recipes Bucket</Link>
                    </Typography>
                    <Button style={{ fontWeight: 'bold' }}>
                        <Link to="/recipes" style={{ textDecoration: 'none', color: "black" }}>Recipes</Link>
                    </Button>
                    <Button style={{ fontWeight: 'bold' }}>
                        <Link to="/new" style={{ textDecoration: 'none', color: "black" }}>New Recipes</Link>
                    </Button>
                    <Button style={{ fontWeight: 'bold' }}>
                        Chefs
                    </Button>
                    <Button style={{ fontWeight: 'bold' }}>
                        Discovery
                    </Button>
                    
                    {/* <SearchBar>
                        
                    </SearchBar> */}
                    <Button style={{ fontWeight: 'bold' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: "black" }}> Sign Up/Log in</Link>
                    </Button>
                    <Button style={{ fontWeight: 'bold' }} onClick={logOut}>
                        <Link to="/login" style={{ textDecoration: 'none', color: "black" }}> Log Out</Link>
                    </Button>
                
                </Toolbar>
            </AppBar>

            <Typography variant='h2' align='center' color='textPrimary' gutterBottom>Recipes</Typography>

            
            <div className={classes.buttons}>
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <Button variant="contained" onClick={() => setIsMyRecipe(false)} style={{ color: 'white', backgroundColor: '#C70039'}}>
                            All Recipes
                        </Button>
                    </Grid>
                    
                    <Grid item>
                        <Button variant="outlined" onClick={() => setIsMyRecipe(true)}>
                            My Recipes
                            {/* <Link to="/myrecipe" style={{ color: '#C70039' }}>My Recipes</Link> */}
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {/* {JSON.stringify(isMyRecipe)}
            {JSON.stringify(myRecipes)}
            {JSON.stringify(user_id)} */}

            {/* DISPLAY ALL RECIPE CARDS */}
            { isMyRecipe ? 
            <Container className={classes.cardGrid} maxWidth='md'>
                <Grid container spacing={4}>
                    {myRecipes.map((recipe) => (
                        <Grid item xs={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={recipe.img}
                                    title={recipe.name}
                                />

                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {recipe.name}
                                    </Typography>

                                    <Typography className={classes.textOverflow}>
                                        {recipe.description}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size='small' color='primary'>Edit</Button>
                                    <Button size='small' color='primary'>Remove</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container> 
            : 
            <Container className={classes.cardGrid} maxWidth='md'>
                <Grid container spacing={4}>
                    {recipes.map((recipe) => (
                        <Grid item xs={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={recipe.img}
                                    title={recipe.name}
                                />

                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {recipe.name}
                                    </Typography>

                                    <Typography className={classes.textOverflow}>
                                        {recipe.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            }
        </div>
    )
}

export default Recipes
