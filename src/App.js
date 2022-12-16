import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          DoorDelights
        </p>
      </header>
    </div>
  );
}

export default App;
