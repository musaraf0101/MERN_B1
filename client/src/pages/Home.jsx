import { useTheme } from "../Context/ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#222",
        color: theme === "light" ? "#222" : "#fff",
      }}
    >
      <button onClick={toggleTheme} className="border-5">theme</button>
    </div>
  );
};

export default Home;
