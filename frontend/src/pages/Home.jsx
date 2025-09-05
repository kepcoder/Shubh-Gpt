import React from 'react'
import HeroSection from './../components/HeroSection';
import FeaturesSection from './../components/FeatureSection';
import TestimonialsSection from '../components/TestimonialSection';
import PricingSection from './../components/PricingSection';
import FAQSection from './../components/FAQSection';
import Footer from './../components/FooterSection';
import Navbar from './../components/Navbar';
const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <PricingSection/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default Home
