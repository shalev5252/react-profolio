import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import ProjectDetails from "./components/Projects/ProjectDetails";
import Contact from "./components/Contact/Contact";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingFinished = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onFinished={handleLoadingFinished} />}
      <Router>
        <div className={styles.App}>
          <ParticleBackground />
          <Routes>
            {/* Main Page */}
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Hero />
                  <About />
                  <Skills />
                  <Experience />
                  <Projects />
                  <Contact />
                  <ScrollToTop />
                </>
              }
            />
            <Route path="/projects" element={<ProjectDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
