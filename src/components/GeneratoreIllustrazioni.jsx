import React, { useState } from 'react';
import { Camera, Palette, BookOpen, Sparkles, Download, Eye, RefreshCw, Wand2, Heart, Star } from 'lucide-react';

const GeneratoreIllustrazioni = () => {
  const [testoFavola, setTestoFavola] = useState('');
  const [stileArtistico, setStileArtistico] = useState('');
  const [numeroIllustrazioni, setNumeroIllustrazioni] = useState(4);
  const [staGenerando, setStaGenerando] = useState(false);
  const [illustrazioni, setIllustrazioni] = useState([]);
  const [step, setStep] = useState(0);
  const [caratteristichePrincipali, setCaratteristichePrincipali] = useState({
    personaggioPrincipale: '',
    ambientazione: '',
    oggettiImportanti: '',
    coloriDominanti: ''
  });

  const stiliArtistici = [
    {
      nome: 'Illustrazione per Bambini Classica',
      valore: 'children_book_classic',
      descrizione: 'Stile tradizionale con colori vivaci e tratti morbidi',
      emoji: '📚',
      esempio: 'Stile Eric Carle o Maurice Sendak'
    },
    {
      nome: 'Acquerello Dolce',
      valore: 'watercolor_soft',
      descrizione: 'Acquerelli delicati con sfumature pastello',
      emoji: '🎨',
      esempio: 'Perfetto per storie rilassanti'
    },
    {
      nome: 'Cartoon Divertente',
      valore: 'cartoon_fun',
      descrizione: 'Stile cartone animato allegro e colorato',
      emoji: '😄',
      esempio: 'Come i migliori cartoni Disney/Pixar'
    },
    {
      nome: 'Fantasy Magico',
      valore: 'fantasy_magical',
      descrizione: 'Illustrazioni fantastiche con elementi magici',
      emoji: '✨',
      esempio: 'Con brillantini, fate e creature magiche'
    },
    {
      nome: 'Natura Realistica',
      valore: 'nature_realistic',
      descrizione: 'Animali e natura in stile semi-realistico',
      emoji: '🌿',
      esempio: 'Perfetto per storie con animali'
    },
    {
      nome: 'Digitale Moderno',
      valore: 'digital_modern',
      descrizione: 'Illustrazione digitale contemporanea',
      emoji: '💻',
      esempio: 'Stile moderno e pulito'
    }
  ];

  const analizzaFavola = async () => {
    if (!testoFavola.trim()) {
      alert('Per favore inserisci il testo della favola prima di continuare.');
      return;
    }

    setStaGenerando(true);

    try {
      const promptAnalisi = `Analizza questa favola per bambini e estrai le informazioni chiave per creare illustrazioni coerenti:

"${testoFavola}"

Rispondi SOLO con un oggetto JSON valido in questo formato esatto:
{
  "personaggioPrincipale": "descrizione dettagliata del personaggio principale (aspetto fisico, vestiti, caratteristiche)",
  "ambientazione": "descrizione dell'ambientazione principale (luogo, epoca, atmosfera)",
  "oggettiImportanti": "oggetti chiave nella storia che dovrebbero apparire nelle illustrazioni",
  "coloriDominanti": "palette di colori che riflette il tono della storia",
  "momenteChiave": [
    "momento 1 della storia da illustrare",
    "momento 2 della storia da illustrare", 
    "momento 3 della storia da illustrare",
    "momento 4 della storia da illustrare"
  ]
}

IMPORTANTE: Rispondi SOLO con il JSON valido, senza testo aggiuntivo o formattazione markdown.`;

      // Simula chiamata API
      // const risposta = await window.claude.complete(promptAnalisi);
      const datiAnalizzati = {
        personaggioPrincipale: "Un piccolo coniglietto di nome Luca, con pelo bianco come la neve e orecchie lunghe e soffici.",
        ambientazione: "Un prato verde e soleggiato, pieno di margherite, vicino a un bosco antico.",
        oggettiImportanti: "Una farfalla colorata con un'ala rotta, foglie magiche, un fiore speciale che brilla di luce dorata.",
        coloriDominanti: "Verde prato, bianco neve, giallo dorato, colori vivaci dei fiori e della farfalla.",
        momenteChiave: [
            "Luca il coniglietto saltella felice nel prato.",
            "Luca incontra la farfalla triste con l'ala rotta.",
            "Luca porta la farfalla dal saggio gufo nel bosco.",
            "La farfalla, guarita, regala a Luca un fiore luminoso."
        ]
      };

      if (!datiAnalizzati.personaggioPrincipale || !datiAnalizzati.ambientazione) {
        throw new Error('Dati incompleti nella risposta di analisi');
      }

      setCaratteristichePrincipali({
        personaggioPrincipale: datiAnalizzati.personaggioPrincipale || 'Personaggio non identificato',
        ambientazione: datiAnalizzati.ambientazione || 'Ambientazione non identificata',
        oggettiImportanti: datiAnalizzati.oggettiImportanti || 'Nessun oggetto identificato',
        coloriDominanti: datiAnalizzati.coloriDominanti || 'Colori non specificati'
      });

      setStep(1);

    } catch (errore) {
      console.error('Errore completo nell\'analisi:', errore);
      alert(`Errore nell'analisi della favola: ${errore.message}. Riprova per favore.`);
    } finally {
      setStaGenerando(false);
    }
  };

  const generaPromptIllustrazioni = async () => {
    setStaGenerando(true);

    try {
      const stileSelezionato = stiliArtistici.find(s => s.valore === stileArtistico);

      const promptGenerazione = `Crea ${numeroIllustrazioni} prompt dettagliati per generare illustrazioni coerenti per questa favola per bambini.

INFORMAZIONI DELLA STORIA:
- Personaggio principale: ${caratteristichePrincipali.personaggioPrincipale}
- Ambientazione: ${caratteristichePrincipali.ambientazione}
- Oggetti importanti: ${caratteristichePrincipali.oggettiImportanti}
- Colori dominanti: ${caratteristichePrincipali.coloriDominanti}

STILE ARTISTICO RICHIESTO: ${stileSelezionato.descrizione}

TESTO COMPLETO DELLA FAVOLA:
"${testoFavola}"

Crea ${numeroIllustrazioni} prompt per illustrazioni che:
1. Mantengano coerenza visiva tra tutte le immagini
2. Mostrino i momenti chiave della storia in sequenza
3. Siano adatte ai bambini (colori vivaci, stile rassicurante)
4. Includano sempre gli stessi personaggi con lo stesso aspetto
5. Mantengano la stessa ambientazione e atmosfera

Rispondi SOLO con un oggetto JSON valido:
{
  "illustrazioni": [
    {
      "numero": 1,
      "momento": "breve descrizione del momento della storia",
      "promptCompleto": "prompt dettagliato per AI di generazione immagini (Midjourney/DALL-E style)",
      "descrizioneItaliana": "descrizione in italiano di cosa mostra l'illustrazione"
    }
  ]
}

IMPORTANTE: I prompt devono essere in inglese e molto dettagliati per garantire coerenza visiva. Rispondi SOLO con il JSON valido.`;

      // Simula chiamata API
      // const risposta = await window.claude.complete(promptGenerazione);
       const datiIllustrazioni = {
        "illustrazioni": [
          { "numero": 1, "momento": "Luca che saltella felice", "promptCompleto": "A joyful baby rabbit named Luca, with fluffy white fur and long ears, is hopping happily in a vibrant green meadow full of daisies. Children's book illustration, gentle watercolor style, pastel colors.", "descrizioneItaliana": "Luca il coniglietto salta felice in un prato pieno di margherite." },
          { "numero": 2, "momento": "L'incontro con la farfalla", "promptCompleto": "Luca the white rabbit gently looks at a sad, colorful butterfly with a broken wing, sitting on a large daisy. The meadow is sunny and peaceful. Children's book illustration, gentle watercolor style, pastel colors.", "descrizioneItaliana": "Luca incontra la farfalla triste con un'ala rotta." },
          { "numero": 3, "momento": "Dal saggio gufo", "promptCompleto": "Inside a cozy tree hollow, a wise old owl is carefully placing a magical leaf on the broken wing of a colorful butterfly, held by the gentle rabbit Luca. The scene is warm and caring. Children's book illustration, gentle watercolor style.", "descrizioneItaliana": "Luca e la farfalla sono dal saggio gufo che la sta curando." },
          { "numero": 4, "momento": "Il fiore magico", "promptCompleto": "The colorful butterfly, now healed, flies happily around Luca the white rabbit, offering him a special, single flower that glows with a magical golden light. The meadow is bathed in a warm, magical glow. Children's book illustration, gentle watercolor style.", "descrizioneItaliana": "La farfalla, guarita, regala a Luca un fiore che brilla di luce magica." }
        ]
      };
      
      setIllustrazioni(datiIllustrazioni.illustrazioni.slice(0, numeroIllustrazioni));
      setStep(2);

    } catch (errore) {
      console.error('Errore completo nella generazione:', errore);
      alert(`Errore nella generazione dei prompt: ${errore.message}. Riprova per favore.`);
    } finally {
      setStaGenerando(false);
    }
  };

  const copiaPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    alert('Prompt copiato negli appunti!');
  };

  const esportaTuttiPrompt = () => {
    const tuttiPrompt = illustrazioni.map((ill, index) =>
      `ILLUSTRAZIONE ${index + 1}: ${ill.momento}\n${ill.promptCompleto}\n\n`
    ).join('');

    navigator.clipboard.writeText(tuttiPrompt);
    alert('Tutti i prompt sono stati copiati negli appunti!');
  };

  const ricomincia = () => {
    setStep(0);
    setIllustrazioni([]);
    setCaratteristichePrincipali({
      personaggioPrincipale: '',
      ambientazione: '',
      oggettiImportanti: '',
      coloriDominanti: ''
    });
  };

  // Step 0: Input favola
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6">
              <div className="text-center text-white">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <Palette className="w-10 h-10 animate-pulse" />
                  <h1 className="text-3xl font-bold">Generatore di Illustrazioni per Favole</h1>
                  <Camera className="w-10 h-10 animate-pulse" />
                </div>
                <p className="text-purple-100 text-lg">Trasforma la tua favola in una storia illustrata magica! ✨</p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                    Incolla qui la tua favola:
                  </label>
                  <textarea
                    value={testoFavola}
                    onChange={(e) => setTestoFavola(e.target.value)}
                    placeholder="Incolla qui il testo completo della favola generata precedentemente..."
                    className="w-full h-64 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none text-lg"
                    autoFocus
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-purple-400">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-purple-500" />
                    Come funziona:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Incolla il testo della tua favola nell'area sopra</li>
                    <li>L'AI analizzerà personaggi, ambientazioni e momenti chiave</li>
                    <li>Sceglierai lo stile artistico per le illustrazioni</li>
                    <li>Riceverai prompt dettagliati per creare immagini coerenti</li>
                    <li>Potrai usare i prompt con DALL-E, Midjourney o altri AI</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4 border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Suggerimento:</strong> Per testare l'applicazione, puoi usare questa favola di esempio:
                  </p>
                  <button
                    onClick={() => setTestoFavola("C'era una volta un piccolo coniglietto di nome Luca che viveva in un prato verde pieno di margherite. Luca aveva delle orecchie lunghe e soffici e un pelo bianco come la neve. Un giorno, mentre saltellava tra i fiori, incontrò una farfalla colorata che non riusciva a volare perché aveva un'ala rotta. Luca decise di aiutarla, la portò dal saggio gufo del bosco che le curò l'ala con delle foglie magiche. La farfalla, grata, regalò a Luca un fiore speciale che brillava di luce dorata. Da quel giorno Luca imparò che aiutare gli altri porta sempre gioia e magia nella vita.")}
                    className="mt-2 text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-lg transition-colors"
                  >
                    Usa favola di esempio
                  </button>
                </div>

                <button
                  onClick={analizzaFavola}
                  disabled={!testoFavola.trim() || staGenerando}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  {staGenerando ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Analizzando la favola...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Analizza e Inizia
                      <Camera className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Configurazione stile
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-2">Configura le Tue Illustrazioni</h1>
                <p className="text-purple-100">Personalizza stile e numero di immagini</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Analisi della favola */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-purple-500" />
                    Analisi della Favola
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-purple-700">Personaggio Principale:</span>
                      <p className="text-gray-700 mt-1">{caratteristichePrincipali.personaggioPrincipale}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Ambientazione:</span>
                      <p className="text-gray-700 mt-1">{caratteristichePrincipali.ambientazione}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Oggetti Importanti:</span>
                      <p className="text-gray-700 mt-1">{caratteristichePrincipali.oggettiImportanti}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Colori Dominanti:</span>
                      <p className="text-gray-700 mt-1">{caratteristichePrincipali.coloriDominanti}</p>
                    </div>
                  </div>
                </div>

                {/* Configurazione */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Palette className="w-6 h-6 text-pink-500" />
                      Scegli lo Stile Artistico:
                    </label>
                    <div className="space-y-3">
                      {stiliArtistici.map((stile) => (
                        <button
                          key={stile.valore}
                          onClick={() => setStileArtistico(stile.valore)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            stileArtistico === stile.valore
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{stile.emoji}</span>
                            <div>
                              <div className="font-bold">{stile.nome}</div>
                              <div className="text-sm opacity-70">{stile.descrizione}</div>
                              <div className="text-xs opacity-60 italic">{stile.esempio}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Camera className="w-6 h-6 text-orange-500" />
                      Numero di Illustrazioni:
                    </label>
                    <div className="flex gap-3">
                      {[3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => setNumeroIllustrazioni(num)}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 font-bold ${
                            numeroIllustrazioni === num
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={ricomincia}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200"
                >
                  Ricomincia
                </button>
                <button
                  onClick={generaPromptIllustrazioni}
                  disabled={!stileArtistico || staGenerando}
                  className="flex-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {staGenerando ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generando Prompt...
                    </>
                  ) : (
                    <>
                      Genera Illustrazioni
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Risultati
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                  <Camera className="w-8 h-8" />
                  La Tua Storia Illustrata è Pronta!
                  <Sparkles className="w-8 h-8" />
                </h1>
                <p className="text-purple-100 text-lg">
                  {illustrazioni.length} illustrazioni generate • Stile: {stiliArtistici.find(s => s.valore === stileArtistico)?.nome}
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Prompt per le Illustrazioni</h2>
                <div className="flex gap-3">
                  <button
                    onClick={esportaTuttiPrompt}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Copia Tutti
                  </button>
                  <button
                    onClick={ricomincia}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Nuova Storia
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                {illustrazioni.map((ill, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {ill.numero}
                          </span>
                          Illustrazione {ill.numero}
                        </h3>
                        <p className="text-purple-700 font-medium mt-1">{ill.momento}</p>
                      </div>
                      <button
                        onClick={() => copiaPrompt(ill.promptCompleto)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Copia Prompt
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Descrizione (Italiano):</h4>
                        <p className="text-gray-600 bg-white rounded-xl p-4 border">
                          {ill.descrizioneItaliana}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Prompt per AI (Inglese):</h4>
                        <div className="bg-gray-800 text-green-400 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                          {ill.promptCompleto}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  Come Usare i Prompt:
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>1. DALL-E (OpenAI):</strong> Copia e incolla direttamente ogni prompt</p>
                  <p><strong>2. Midjourney:</strong> Usa i prompt con parametri come --ar 16:9 --style raw</p>
                  <p><strong>3. Stable Diffusion:</strong> Aggiungi "high quality, detailed" all'inizio</p>
                  <p><strong>4. Coerenza:</strong> Genera tutte le immagini in sequenza per mantenere lo stesso stile</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <div className="flex items-center justify-center gap-3 text-purple-500 mb-4">
                  <Heart className="w-6 h-6 animate-pulse" />
                  <span className="text-lg font-medium">La tua storia illustrata magica è pronta! ✨</span>
                  <Heart className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GeneratoreIllustrazioni;