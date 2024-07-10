import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const MarketInsights = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-grow">
        {/* Your destination experiences content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default MarketInsights;
