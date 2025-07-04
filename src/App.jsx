import React, { useState } from 'react';
import { Book, Camera, Palette, Home } from 'lucide-react';
import BedtimeStoryGenerator from './components/BedtimeStoryGenerator';
import GeneratoreCharacterSheet from './components/GeneratoreCharacterSheet';
import GeneratoreIllustrazioni from './components/GeneratoreIllustrazioni';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Definizione delle pagine
  const pages = [
    { id: 'home', title: 'Home', icon: Home, component: null },
    { id: 'story', title: 'Generatore Storie', icon: Book, component: BedtimeStoryGenerator },
    { id: 'character', title: 'Character Sheet', icon: Camera, component: GeneratoreCharacterSheet },
    { id: 'illustrations', title: 'Illustrazioni', icon: Palette, component: GeneratoreIllustrazioni }
  ];

  // Funzione per mostrare la pagina corrente
  const renderCurrentPage = () => {
    // Se la pagina è 'home', mostra la schermata principale
    if (currentPage === 'home') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Generatori AI per Storie
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Crea storie personalizzate e illustrazioni magiche per i tuoi bambini
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {pages.slice(1).map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <page.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{page.title}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Altrimenti, trova e mostra il componente della pagina selezionata
    const page = pages.find(p => p.id === currentPage);
    if (page && page.component) {
      const ComponentToRender = page.component;
      return <ComponentToRender />;
    }

    return null; // Fallback nel caso la pagina non venga trovata
  };

  return (
    <div>
      {/* Mostra la barra di navigazione solo se non siamo sulla home */}
      {currentPage !== 'home' && (
        <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
            <button onClick={() => setCurrentPage('home')} className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fairytale Generators
            </button>
            <div className="flex gap-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <page.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{page.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;