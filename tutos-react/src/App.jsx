import { BrowserRouter as Router, Routes, Route } from "react-router";

import Layout from "./components/Layout";
import ChooseTutos from './pages/ChooseTutos';
import ReactTuto from "./pages/ReactTuto";

function App() {
  return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<ChooseTutos />} />
                    <Route path="/tuto-react" element={<ReactTuto />} />
                </Routes>
            </Layout>
        </Router>
    )
};

export default App;
