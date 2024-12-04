import Layout from "./components/layout/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileProvider } from "./context/profileContext";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import VenuesPage from "./pages/venueList/venuesPage";
import VenueDetailsPage from "./pages/venueDetails/venueDetailsPage";
import CreateVenuePage from "./pages/venueManager/createVenue/createVenuePage";
import ProfilePage from "./pages/profile/profilePage";
import ScrollToTop from "./components/scroll/scroll";

function App() {
    return (
        <ProfileProvider>
            <Router>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/venues" element={<VenuesPage />} />
                        <Route
                            path="/venues/:id"
                            element={<VenueDetailsPage />}
                        />
                        <Route
                            path="/create-venue"
                            element={<CreateVenuePage />}
                        />
                        <Route path="/my-profile" element={<ProfilePage />} />
                    </Routes>
                </Layout>
            </Router>
        </ProfileProvider>
    );
}

export default App;
