import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { APICall } from "./utility/utils";
import { GET_DATA } from "./utility/URL";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Response from "./Response";

// }
// function App() {
//   const [response,setResponse] = useState("");

//
//   }

export default function Home() {
  const [response, setResponse] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [light, setLight] = React.useState(false);
  const [visibility, setVisibility] = React.useState(false);

  // var response = "";

  const getData = () => {
    APICall({
      method: "post",
      url: GET_DATA,
      data: JSON.stringify({ url: url }),
      successCallBack: (data) => {
        setResponse(data);
      },
    });
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setDarkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const setLightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const handleTheme = () => {
    setLight(!light);
  };
  return (
    <ThemeProvider theme={light ? setLightTheme : setDarkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* <FormGroup>
                <FormControlLabel
                control={
                    <Switch
                    checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                    />
            </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              URL Checker
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <IconButton onClick={() => handleTheme()}>
                  {light ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                onChange={(e) => {
                  setUrl(e.target.value);
                  setResponse("");
                  console.log(url);
                }}
                sx={{
                  width: "600px",
                  marginLeft: "400px",
                  color: "white",
                  alignContent: "center",
                  position: "center",
                }}
                label="Enter the Url"
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                onClick={() => getData()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            marginLeft: "550px",
            marginTop: "20px",
            alignContent: "center",
            visibility: response.length > 0 ? "block" : "hidden",
          }}
        >
          {console.log(response)}
          <Response response={response} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
