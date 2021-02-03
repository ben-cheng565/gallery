import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import GalleryPage from "./pages/gallery-page";

/**
 * Main app component. Hooks up the Redux store and provides the app bar. The main app logic is all handled
 * within the ToDoManager.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <GalleryPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
