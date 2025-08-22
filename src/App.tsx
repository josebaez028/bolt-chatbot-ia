import React from 'react';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Asistente Empresarial
                </h1>
                <p className="text-slate-400 text-sm">
                  Soluciones inteligentes para tu negocio
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Tu Asistente Virtual Inteligente
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Obtén respuestas instantáneas y soporte profesional las 24 horas del día. 
            Nuestro chatbot empresarial está aquí para ayudarte con todas tus consultas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">24/7</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Disponible Siempre
              </h3>
              <p className="text-slate-300">
                Soporte continuo sin interrupciones para resolver tus dudas en cualquier momento.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Inteligencia Artificial
              </h3>
              <p className="text-slate-300">
                Respuestas precisas y contextuales gracias a la tecnología de IA más avanzada.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Respuestas Rápidas
              </h3>
              <p className="text-slate-300">
                Obtén información instantánea sin esperas ni demoras en el procesamiento.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

export default App;