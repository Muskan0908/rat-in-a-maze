import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Home.css';
import Maze from '../Maze/Maze';

const Home = () => {
    const[n,setN]=useState(0);
    const[error,setError]=useState(false);
    const[initial,setInitial]=useState(true);
const handleChange=(e)=>{
    setN(e.target.value);
}
const handleClick=()=>{
    if(n<2 || isNaN(n))
        setError(true);
    else
        setError(false);
    setInitial(false);
}
    return (
        <div id="container-input">
            {
           error || (initial && !error)?
            <div id="input">
                <TextField id="standard-basic"
                    error={error} helperText={error?"Value should be a number greater than 1.":""}
                label="Enter the size of the maze" onChange={handleChange}/><br/><br/>
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Submit
                </Button>
            </div>
            :
            <Maze n={n}/>}
        </div>
        
    )
}

export default Home
