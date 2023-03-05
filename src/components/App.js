import React, { Component } from "react";
import RecatDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./views/Home";

import "../styles/main.scss";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import theme from "../styles/theme";
class App extends Component {
  render() {
    return (
      <div className="app-background">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Header />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    );
  }
}

export default App;
