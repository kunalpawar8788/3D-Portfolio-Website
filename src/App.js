import React from "react";
import Header from "./Header";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import Card from "./Card";
import Chatbot from "./Chatbot";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">
      <section className="full-section">
        <Header />
      </section>
      <section className="full-section">
        <Chatbot />
      </section>

      <section className="full-section">
        <AboutMe />
      </section>

      <section className="full-section">
        <Card />
      </section>

      <section className="full-section">
        <Contact />
      </section>
    </div>
  );
}

export default App;
