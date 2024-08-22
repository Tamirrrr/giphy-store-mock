import {RootStoreProvider} from "./providers/RootStoreProvider";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from "./pages/auth/Auth";
import HomePage from "@/pages/store/Home.tsx";
import SearchResultPage from "@/pages/store/SearchResult.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

const App = () => {
    return (
        <RootStoreProvider>
            <Router>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/" element={<Auth/>}/>
                        <Route path="/store" element={<HomePage/>}/>
                        <Route path="/search" element={<SearchResultPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </RootStoreProvider>
    );
}

export default App
