import {makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: 50
    },
  
    toolbar: {
      backgroundColor:"#134563",
    },   
    title: {
      flexGrow: 1,
      textAlign:"center",
      fontFamily:"Rokkitt",
      fontWeight:"bold",
      fontSize:"24px"  
    },
   
  }));

  export default useStyles;