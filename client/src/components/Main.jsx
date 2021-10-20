import React from 'react'
import { Link } from 'react-router-dom'
// import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import { Typography, AppBar, Button, CssBaseline, Toolbar } from '@material-ui/core'
import axios from 'axios'
import SearchBar from "material-ui-search-bar";

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    mr: {
        marginRight: theme.spacing(2),
    },
}));

const Main = () => {
    const classes = useStyles();
    const APP_ID = "30d9b4cd"
    const APP_KEY = "df4628d9eae302833ca1bc057eadf6db"	

    const url = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`


    // GET RECIPE DATA
    const getRecipes = (url) => {
        const data = axios.get(url)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        console.log(data);
    }
    getRecipes(url)


    const logOut = () => {
        // localStorage.clear();
        axios.get("http://localhost:8000/api/logout", { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    // 

    return (
        <div styles={{ backgroundColor: '#f5f5f5'}}>
            <CssBaseline />
            <AppBar position="relative" style={{ backgroundColor: 'white'}}>
                <Toolbar>
                    {/* <PhotoCamera /> */}
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



                    <Button style={{ fontWeight: 'bold' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: "black" }}> Sign Up/Log in</Link>
                    </Button>
                    <Button style={{ fontWeight: 'bold' }} onClick={logOut}>
                        <Link to="/login" style={{ textDecoration: 'none', color: "black" }}> Log Out</Link>
                    </Button>

                </Toolbar>
            </AppBar>
            <main>
                
            </main>
        </div>
    )
}

export default Main
