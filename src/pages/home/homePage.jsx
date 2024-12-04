import React, { useEffect } from "react";
import HeroSection from "./heroSection/heroSection";
import NewsletterSection from "./newsletterSection/newsletterSection";
import PetSection from "./petSection/petSection";
import { useProfile } from "../../context/profileContext";

const HomePage = () => {
    const { profile } = useProfile();

    useEffect(() => {
        document.title = "Holidaze - Home Page";
    }, []);
    useEffect(() => {}, [profile]);

    return (
        <div>
            <HeroSection />
            <NewsletterSection />
            <PetSection />
        </div>
    );
};

export default HomePage;
