import "./styles.css";
import { createRoot } from "react-dom/client";
import App from "./routes/index";

const root = document.getElementById("root");
if (!root) throw new Error("Missing page root");

createRoot(root).render(<App />);
