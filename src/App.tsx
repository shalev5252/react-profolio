import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
// import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import ScrollingImage from "./components/ScrollingImage/ScrollingImage";
import Skills from "./components/Skills/Skills";
function App() {
  return (
    <div className={styles.App}>
      <ScrollingImage />
      <NavBar />
      <Hero />
      {/* <About /> */}
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
