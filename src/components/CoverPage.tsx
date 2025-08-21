import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CoverPageProps {
  onContinue: () => void;
}

export function CoverPage({ onContinue }: CoverPageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to the Future of{' '}
          <span className="text-green-400">Eco-Tourism</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto opacity-90">
          Discover how travel can help restore our planet. Explore future trends in eco-tourism — 
          from climate-conscious journeys to large-scale conservation efforts.
        </p>
        
        <button
          onClick={onContinue}
          className="group inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-75">
        <div className="animate-bounce">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>
    </div>
  );
}