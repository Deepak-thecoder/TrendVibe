import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class App extends Component {
   apiKey = process.env.REACT_API_KEY;
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <div>
        <Router>
          <AppNavbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route
              path="/Home"
              element={
                <News
                  key="home"
                  pageSize={20}
                  country="us"
                  category="general"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/Business"
              element={
                <News
                  key="business"
                  pageSize={20}
                  country="us"
                  category="business"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/Sports"
              element={
                <News
                  key="sports"
                  pageSize={20}
                  country="us"
                  category="sports"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/Entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={20}
                  country="us"
                  category="entertainment"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/General"
              element={
                <News
                  key="general"
                  pageSize={20}
                  country="us"
                  category="general"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/Health"
              element={
                <News
                  key="health"
                  pageSize={20}
                  country="us"
                  category="health"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/Science"
              element={
                <News
                  key="science"
                  pageSize={20}
                  country="us"
                  category="science"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}  
                />
              }
            />
            <Route
              path="/Technology"
              element={
                <News
                  key="technology"
                  pageSize={20}
                  country="us"
                  category="technology"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
