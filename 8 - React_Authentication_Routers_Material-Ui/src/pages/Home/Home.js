import "./Home.css";
import Table from "../../components/Table/Table";
import { useContext } from "react";
import useStyles from "./style";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Context } from "../../Context/AuthContext";

function Home(props) {
  const classes = useStyles();
  const { removeUserSession } = useContext(Context);

  function handleLogout() {
    props.history.push("/");
    removeUserSession();
  }

  return (
    <div className="container-home">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" noWrap>
              KONTACTS
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}></div>
              <IconButton
                onClick={handleLogout}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className="content-home">
        <Table />
      </div>
    </div>
  );
}

export default Home;