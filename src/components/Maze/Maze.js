import React ,{useState}from 'react'
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import rat from '../../images/rat.jpg'
import cheese from '../../images/cheese.png'
import Button from '@material-ui/core/Button';

import Cell from '../Cell/Cell';
import './Maze.css';


const Maze = (props) => {
    let n=props.n;
    
    let matrixCopy=[]
     for (let i = 0; i< n; i++) {
        for(let j = 0; j< n; j++) {
            matrixCopy[i]= [];
        }
     }
     for (let i = 0; i< n; i++) {
        for(let j = 0; j< n; j++) {
            matrixCopy[i][j]= 0;
        }
     }
     const[ matrix, setMatrix]=useState(matrixCopy);
     const[totalpath,setTotalPath]=useState([]);
     const[initial,setInitial]=useState(true);
     let paths=[];

     const handleClick=(s)=>{
         let matrixCopy=[...matrix];
        let n=s.length/2;
        let s1=s.substr(0,n);
        let s2=s.substr(n);
        let n1=Number(s1);
        let n2=Number(s2);
       matrixCopy[n1][n2]=1;
        
        setMatrix(matrixCopy);
    }

     const loadCells=(mat,rows,columns,gindex,path)=>{
        let matrix=[]
        for (let i = 0; i< rows; i++) {
           for(let j = 0; j< columns; j++) {
               matrix[i]= [];
           }
        }
        for (let i = 0; i< rows; i++) {
           for(let j = 0; j< columns; j++) {
               matrix[i][j]= 0;
           }
        }
        for(let i=0;i<mat.length;i++){
            for(let j=0;j<mat[0].length;j++){
                matrix[i][j]=mat[i][j];
            }
        }
       path.forEach((coordinate)=>{
               matrix[coordinate[0]][coordinate[1]]=2;
            })
            
        
       console.log("Matrix",matrix);
        let cells=[];
        matrix.forEach((row,rindex)=>{
            row.forEach((col,cindex)=>{
            if(col===1){
               cells.push( <Cell
                    color="red"
                    index={gindex.toString() + rindex.toString() + cindex.toString()}
                >
                    <Box height="30px" width="30px"></Box>
                </Cell>);
            }
            else if(rindex===0 && cindex===0){
                    cells.push(
                        <Cell 
                        color="white"
                        index={rindex.toString() + cindex.toString()}
                        >
                            <Box height="30px" width="30px">
                                <img style={{width:"100%"}} alt="rat" src={rat}/>
                            </Box>
                        </Cell>
                    )
            }
            else if(rindex===rows-1 && cindex===columns-1){
                cells.push(
                    <Cell 
                    color="white"
                    index={ rindex.toString() + cindex.toString()}
                     >
                        <Box height="30px" width="30px">
                            <img style={{width:"100%"}} alt="cheese" src={cheese}/>
                        </Box>
                    </Cell>
                )
            }
            else if(col===2){
                cells.push( <Cell
                    color="green"
                    index={ rindex.toString() + cindex.toString()}
                >
                    <Box height="30px" width="30px"></Box>
                </Cell>);
            }
            else{
                cells.push( <Cell
                    color="white"
                    index= {rindex.toString() + cindex.toString()}
                    
                >
                    <Box height="30px" width="30px" onClick={()=>{handleClick(rindex.toString() + cindex.toString())}} 
                    >
                                        </Box>
                </Cell>);
            }
            
        })
            cells.push(<Grid item xs={12} sm={12}></Grid>)
        })
        console.log('Cells',cells)
        return cells;
    }
    
    
    const calculatePaths=(matrix,i,j,rows,columns)=>{
        
        let visited=[];
        for (let x = 0; x< rows; x++) {
            for(let y = 0; y< columns; y++) {
                visited[x]= [];
            }
         }
         for (let x = 0; x< rows; x++) {
            for(let y = 0; y< columns; y++) {
                visited[x][y]= 0;
            }
         }

         calculatePathsUtil(matrix,visited,i,j,rows,columns,[]);
         return paths;
    }

  const calculatePathsUtil=(matrix,visited,i,j,rows,columns,currentpath)=>{
        if(i<0 || i>=rows || j<0 || j>=columns)
            return;
        if(matrix[i][j]===1 || visited[i][j]===1)
            return;
        if(i=== rows-1 && j === columns-1){
           paths.push([...currentpath]);
            visited[i][j]=0;
            console.log("Found a path");
            return;
        }
        visited[i][j]=1;
        //up
        currentpath.push([i-1,j]);
        calculatePathsUtil(matrix,visited,i-1,j,rows,columns,currentpath);
        currentpath.pop();

        //down
        currentpath.push([i+1,j]);
        calculatePathsUtil(matrix,visited,i+1,j,rows,columns,currentpath);
        currentpath.pop();

        //left
        currentpath.push([i,j-1]);
        calculatePathsUtil(matrix,visited,i,j-1,rows,columns,currentpath);
        currentpath.pop();

        //right
        currentpath.push([i,j+1]);
        calculatePathsUtil(matrix,visited,i,j+1,rows,columns,currentpath);
        currentpath.pop();

        visited[i][j]=0;
        return;
  }

  const handleSubmit=(rows,columns)=>{
    let pathAns=calculatePaths(matrix,0,0,rows,columns);
    console.log('Clicked');
    setInitial(false);
     setTotalPath([...pathAns]);
     
  }
  
    return (
        <div className="container-maze">
            <div className="header">
                <p>
                Click on the cells to make them an obstacle
                </p>
                <Button  variant="contained" color="primary" onClick={()=>{handleSubmit(n,n)}}>Go!</Button>
            </div>    
            <Grid container spacing={1}>
                    <Box width="100vw">
                            <Grid container xs={12} spacing={0} justify="center" style={{ backgroundColor: "#fff" }} direction="row" item >
                                {loadCells(matrix,n,n,0,[])}
                            </Grid>
                            <Grid
            style={{ backgroundColor: "orange" }}
            container
            justify="center"
          >
             
            <p className="text">
            Initial Maze
            </p>
           </Grid>
             </Box>
             <Grid style={{ backgroundColor: "orange" }} container justify="center">
          
          <p className="text">
          Total Paths={totalpath.length}
          </p>
        </Grid>
                   
                
                {
                    
                    ( totalpath.length===0 && !initial)?
                        <p className="not-found">No Paths Found!</p>
                    :
                     totalpath.map((path,index)=>{
                        return(
                            <Grid
                            key={(index+1).toString()}
                            style={{backgroundColor:"#fff"}}
                            container
                            direction="row"
                            spacing={0}
                            md={4}
                            sm={6}
                            xs={12}
                            justify="center"
                            item
                            >
                                {loadCells(matrix,n,n,index+1,path)}
                            </Grid>
                        );
                    })
                
                }
                
                         
           </Grid>
        </div>
    )
}

export default Maze
