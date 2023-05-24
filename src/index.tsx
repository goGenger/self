import routes from "./routes/index";
import RouterWrapper from "./routes/RouterWrapper";
import { createRoot } from "react-dom/client";

const container = document.getElementById("main")!;
const root = createRoot(container);
root.render(<RouterWrapper routes={routes} />);
