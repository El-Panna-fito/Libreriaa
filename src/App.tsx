import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight, ShoppingCart, Star, X, Lock, Headphones, Trash2, Instagram, Twitter, Music, Palette } from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { AdminPanel } from './components/AdminPanel';
import { LoginPage } from './components/LoginPage';
import { ChatBot } from './components/ChatBot';
// @ts-ignore
import valsDelVeloCover from './assets/images/vals_del_velo_no_author_1780014092189.png';
// @ts-ignore
import cadenasDeTerciopeloCover from './assets/images/cadenas_de_terciopelo_v2_cover_1780014803285.png';
// @ts-ignore
import canticosDeSangreCover from './assets/images/canticos_de_sangre_v2_1780015451484.png';
// @ts-ignore
import susurrosDeLaPesteCover from './assets/images/susurros_de_la_peste_cover_1780614930300.png';
// @ts-ignore
import laDamaDeNegroCover from './assets/images/la_dama_de_negro_cover_1780615149960.png';
// @ts-ignore
import aristocrataNocheCover from './assets/images/aristocrata_noche_1780615849411.png';
// @ts-ignore
import lagrimasEbanoCover from './assets/images/lagrimas_ebano_1780615862278.png';
// @ts-ignore
import suspirosAbismoCover from './assets/images/suspiros_abismo_1780615874629.png';
// @ts-ignore
import silencioSaucesCover from './assets/images/silencio_sauces_1780615884714.png';
// @ts-ignore
import melodiaPenitenteCover from './assets/images/melodia_penitente_1780615895503.png';
// @ts-ignore
import cicatricesObsidianaCover from './assets/images/cicatrices_obsidiana_1780615907340.png';
// @ts-ignore
import grabadorEspejosCover from './assets/images/grabador_espejos_1780615920229.png';
// @ts-ignore
import herejiaRelojeroCover from './assets/images/herejia_relojero_1780616288924.png';
// @ts-ignore
import cuartoSinPuertaCover from './assets/images/cuarto_sin_puerta_1780616301063.png';
// @ts-ignore
import sociedadCrisantemosCover from './assets/images/sociedad_crisantemos_1780616312657.png';
// @ts-ignore
import versosTumbaVaciaCover from './assets/images/versos_tumba_vacia_1780616323547.png';
// @ts-ignore
import cenizasCriptaCover from './assets/images/cenizas_cripta_1780616334263.png';
// @ts-ignore
import analesTabernaculoNegroCover from './assets/images/anales_tabernaculo_negro_1780616346985.png';
// @ts-ignore
import cenizasImperiosCover from './assets/images/cenizas_imperios_1780616357719.png';
// @ts-ignore
import anatomiaPsiquicaSombrasCover from './assets/images/anatomia_psiquica_sombras_1780616377985.png';
// @ts-ignore
import herbarioAlquimistaCover from './assets/images/herbario_alquimista_1780616388750.png';
// @ts-ignore
import intelectoSombrioCover from './assets/images/intelecto_sombrio_1780616400483.png';
// @ts-ignore
import disertacionesVacioCover from './assets/images/disertaciones_vacio_1780616412435.png';
// @ts-ignore
import retratoReflejoCover from './assets/images/retrato_reflejo_1780616424368.png';
// @ts-ignore
import consagracionLunaCover from './assets/images/consagracion_luna_1780616434304.png';
// @ts-ignore
import sinfoniaClaveIntimaCover from './assets/images/sinfonia_clave_intima_1780616446369.png';
// @ts-ignore
import cronicasAzufreCover from './assets/images/cronicas_azufre_cover_1780616824508.png';
// @ts-ignore
import otonoManicomioCover from './assets/images/otono_manicomio_cover_1780616915511.png';
// @ts-ignore
import nocturnaRosaNegroCover from './assets/images/nocturna_rosa_negro_cover_1781463047799.jpg';

const INITIAL_BOOKS = [
  { 
    id: 999120, 
    title: 'Nocturna en Rosa y Negro: El Vals de BLACKPINK', 
    author: 'Sapetti Brillana', 
    category: 'Romance Oscuro', 
    price: '$39000', 
    audioPrice: '$19500',
    rating: 4.9,
    cover: nocturnaRosaNegroCover,
    description: 'En el cruce perfecto entre el susurro nocturno y el destello de la noche estelar, emerge una sinfonía literaria dedicada a las cuatro deidades de la música moderna: Jisoo, Jennie, Rosé y Lisa. Un relato de terciopelo rosa, espinas negras y corazones de cristal que laten "in your area".'
  },
  { 
    id: 1, 
    title: 'Promesas de Sangre', 
    author: 'Sapetti Brillana', 
    category: 'Gótico', 
    price: '$34500', 
    audioPrice: '$17500',
    rating: 4.9,
    cover: 'https://p4.wallpaperbetter.com/wallpaper/420/775/718/background-black-red-wallpaper-preview.jpg',
    description: 'Una danza macabra entre el deber y el deseo bajo la luna de una Europa que se desangra en leyendas. Isolde Night nos sumerge en un romance prohibido donde cada beso tiene un precio de vida o muerte.'
  },
  { 
    id: 2, 
    title: 'El Vals del Velo', 
    author: 'Sapetti Brillana', 
    category: 'Romance Oscuro', 
    price: '$32800', 
    audioPrice: '$16500',
    rating: 4.8,
    cover: valsDelVeloCover,
    description: 'En los salones de una aristocracia decadente, una joven descubre que su prometido no pertenece a este mundo. Un relato de suspiros, terciopelo negro y secretos que deberían haber permanecido enterrados.'
  },
  { 
    id: 3, 
    title: 'Cadenas de Terciopelo', 
    author: 'Sapetti Brillana', 
    category: 'Misterio', 
    price: '$36500', 
    audioPrice: '$18500',
    rating: 4.7,
    cover: cadenasDeTerciopeloCover,
    description: 'La elegancia se encuentra con el peligro en esta intriga psicológica. Seraphina Vale teje una telaraña de seducción y traición en el corazón de una mansión que respira por sí misma.'
  },
  {
    id: 5,
    title: 'Cánticos de Sangre',
    author: 'Sapetti Brillana',
    category: 'Vampiros',
    price: '$39900',
    audioPrice: '$19500',
    rating: 4.9,
    cover: canticosDeSangreCover,
    description: 'Una crónica épica que narra el ascenso y la caída de la primera estirpe de vampiros en los Cárpatos.'
  },
  {
    id: 7,
    title: 'Susurros de la Peste',
    author: 'Sapetti Brillana',
    category: 'Época',
    price: '$31200',
    audioPrice: '$15800',
    rating: 4.8,
    cover: susurrosDeLaPesteCover,
    description: 'Durante la peste negra, un médico descubre que la enfermedad no es lo único que está matando a la población de Londres.'
  },
  {
    id: 8,
    title: 'La Dama de Negro',
    author: 'Sapetti Brillana',
    category: 'Ficción Oscura',
    price: '$35500',
    audioPrice: '$17200',
    rating: 4.7,
    cover: laDamaDeNegroCover,
    description: 'Un clásico del terror victoriano sobre una aparición que acecha los pantanos de una mansión aislada.'
  },
  {
    id: 9,
    title: 'El Aristócrata de la Noche',
    author: 'Sapetti Brillana',
    category: 'Vampiros',
    price: '$38200',
    audioPrice: '$19100',
    rating: 4.8,
    cover: aristocrataNocheCover,
    description: 'En el París de la Belle Époque, un noble oculta una sed que lo obliga a cazar en los teatros de ópera.'
  },
  {
    id: 11,
    title: 'Crónicas del Azufre',
    author: 'Sapetti Brillana',
    category: 'Ficción Oscura',
    price: '$33800',
    audioPrice: '$16900',
    rating: 4.7,
    cover: cronicasAzufreCover,
    description: 'En una derruida ciudad industrial invadida por vapores de azufre, un misterioso médico de la peste custodia saberes prohibidos ante la silueta de catedrales góticas.'
  },
  {
    id: 12,
    title: 'Otoño en el Manicomio',
    author: 'Sapetti Brillana',
    category: 'Época',
    price: '$35500',
    audioPrice: '$17800',
    rating: 4.5,
    cover: otonoManicomioCover,
    description: 'Ambientada en el siglo XIX, narra la vida de un artista que descubre que las sombras en las paredes de su celda tienen vida propia.'
  },
  {
    id: 13,
    title: 'Lágrimas de Ébano',
    author: 'Sapetti Brillana',
    category: 'Poesía Trágica',
    price: '$30200',
    audioPrice: '$15100',
    rating: 4.9,
    cover: lagrimasEbanoCover,
    description: 'Un compendio de versos que exploran el duelo y la soledad en la inmensidad del vacío.'
  },
  {
    id: 14,
    title: 'Suspiros del Abismo',
    author: 'Sapetti Brillana',
    category: 'Poesía Trágica',
    price: '$32800',
    audioPrice: '$16400',
    rating: 4.8,
    cover: suspirosAbismoCover,
    description: 'Antología poética sobre amores imposibles y la belleza inherente a la tristeza infinita.'
  },
  {
    id: 15,
    title: 'El Silencio de los Sauces',
    author: 'Sapetti Brillana',
    category: 'Poesía Trágica',
    price: '$31500',
    audioPrice: '$15700',
    rating: 4.7,
    cover: silencioSaucesCover,
    description: 'Cada estrofa es una herida abierta, un tributo a las voces que el tiempo olvidó en los campos de batalla del corazón.'
  },
  {
    id: 16,
    title: 'La Melodía del Penitente',
    author: 'Sapetti Brillana',
    category: 'Romance Oscuro',
    price: '$33400',
    audioPrice: '$16700',
    rating: 4.8,
    cover: melodiaPenitenteCover,
    description: 'Una violinista descifra una sinfonía prohibida a medianoche. Un pacto de amor eterno que desafía las fronteras de lo terrenal.'
  },
  {
    id: 17,
    title: 'Cicatrices de Obsidiana',
    author: 'Sapetti Brillana',
    category: 'Romance Oscuro',
    price: '$34900',
    audioPrice: '$17400',
    rating: 4.9,
    cover: cicatricesObsidianaCover,
    description: 'Dos almas atormentadas por un veredicto de sangre juraron odiarse, solo para descubrir que el destino prefiere verlos arder al mismo fuego.'
  },
  {
    id: 18,
    title: 'El Grabador de Espejos',
    author: 'Sapetti Brillana',
    category: 'Ficción Oscura',
    price: '$35200',
    audioPrice: '$17600',
    rating: 4.7,
    cover: grabadorEspejosCover,
    description: 'Un artesano del siglo XVIII aprende a atrapar los últimos suspiros de sus acaudalados clientes detrás del azogue de sus espejos.'
  },
  {
    id: 19,
    title: 'Herejía del Relojero',
    author: 'Sapetti Brillana',
    category: 'Ficción Oscura',
    price: '$36800',
    audioPrice: '$18400',
    rating: 4.6,
    cover: herejiaRelojeroCover,
    description: 'Un inventor obsesivo diseña un intrincado reloj capaz de diseccionar el flujo de la vida y congelar el momento exacto del deceso.'
  },
  {
    id: 20,
    title: 'El Cuarto sin Puerta',
    author: 'Sapetti Brillana',
    category: 'Misterio',
    price: '$35800',
    audioPrice: '$17900',
    rating: 4.9,
    cover: cuartoSinPuertaCover,
    description: 'Un detective de Scotland Yard retirado se enfrenta al enigma irresoluble de una habitación sellada donde todo rastro de herencia se esfuma.'
  },
  {
    id: 21,
    title: 'La Sociedad de los Crisantemos',
    author: 'Sapetti Brillana',
    category: 'Misterio Real',
    price: '$37100',
    audioPrice: '$18500',
    rating: 4.8,
    cover: sociedadCrisantemosCover,
    description: 'Una organización clandestina custodia la mística floración de una crisantemo capaz de tender un puente fónico con los difuntos.'
  },
  {
    id: 22,
    title: 'Versos a una Tumba Vacía',
    author: 'Sapetti Brillana',
    category: 'Poesía Trágica',
    price: '$29800',
    audioPrice: '$14900',
    rating: 4.9,
    cover: versosTumbaVaciaCover,
    description: 'Compendio poético desgarrador que dibuja la soledad imperecedera del romántico espíritu doliente del siglo XIX.'
  },
  {
    id: 23,
    title: 'Cenizas en la Cripta',
    author: 'Sapetti Brillana',
    category: 'Poesía Trágica',
    price: '$28500',
    audioPrice: '$14200',
    rating: 4.8,
    cover: cenizasCriptaCover,
    description: 'Lamentos nocturnos dedicados a las hiedras que devoran el mármol de los panteones olvidados y al desamor irresoluble.'
  },
  {
    id: 24,
    title: 'Anales del Tabernáculo Negro',
    author: 'Sapetti Brillana',
    category: 'Historia',
    price: '$32600',
    audioPrice: '$16300',
    rating: 4.8,
    cover: analesTabernaculoNegroCover,
    description: 'La crónica prohibida del Santo Oficio en tierras andinas, donde los antiguos cultos de la medianoche se fusionaron con el fervor virreinal.'
  },
  {
    id: 25,
    title: 'Cenizas de Imperios Olvidados',
    author: 'Sapetti Brillana',
    category: 'Historia',
    price: '$35400',
    audioPrice: '$17700',
    rating: 4.9,
    cover: cenizasImperiosCover,
    description: 'Relato historiográfico de las dinastías malditas del viejo continente y los secretos sellados en las tumbas de mármol del siglo XIV.'
  },
  {
    id: 26,
    title: 'Anatomía Psíquica de las Sombras',
    author: 'Sapetti Brillana',
    category: 'Biología',
    price: '$36500',
    audioPrice: '$18250',
    rating: 4.7,
    cover: anatomiaPsiquicaSombrasCover,
    description: 'El riguroso estudio naturalista del siglo XIX que documenta las mutaciones celulares, el elixir vital y la fisiología de las criaturas nocturnas.'
  },
  {
    id: 27,
    title: 'El Herbario del Alquimista',
    author: 'Sapetti Brillana',
    category: 'Biología',
    price: '$31800',
    audioPrice: '$15900',
    rating: 4.8,
    cover: herbarioAlquimistaCover,
    description: 'Una guía ilustrada sobre plantas de floración fúnebre, venenos letales y esencias naturales extraídas de los bosques oscuros de Transilvania.'
  },
  {
    id: 28,
    title: 'Disertaciones sobre el Vacío',
    author: 'Sapetti Brillana',
    category: 'Filosofía',
    price: '$29900',
    audioPrice: '$14950',
    rating: 4.9,
    cover: disertacionesVacioCover,
    description: 'Tratado de existencialismo y estoicismo radical. Un viaje reflexivo hacia la paz que reside en la aceptación absoluta del silencio cósmico.'
  },
  {
    id: 29,
    title: 'El Intelecto Sombrío',
    author: 'Sapetti Brillana',
    category: 'Filosofía',
    price: '$33500',
    audioPrice: '$16750',
    rating: 4.8,
    cover: intelectoSombrioCover,
    description: 'Metafísica de la melancolía. Una exploración sobre el genio creador, la locura estética y las facultades cognoscitivas que operan solo en la penumbra.'
  },
  {
    id: 30,
    title: 'El Retrato de su Reflejo',
    author: 'Sapetti Brillana',
    category: 'LGBT+',
    price: '$34200',
    audioPrice: '$17100',
    rating: 4.9,
    cover: retratoReflejoCover,
    description: 'En la Florencia del siglo XIX, dos pintores sellan su destino en un lienzo maldito, desafiando el veredicto social con una devoción inmortal.'
  },
  {
    id: 31,
    title: 'La Consagración de la Luna',
    author: 'Sapetti Brillana',
    category: 'LGBT+',
    price: '$35800',
    audioPrice: '$17900',
    rating: 4.8,
    cover: consagracionLunaCover,
    description: 'Dos damas de la alta alcurnia de Valaquia descubren que la eternidad es efímera en comparación con el fuego prohibido que las condena y las salva.'
  },
  {
    id: 32,
    title: 'Sinfonía en Clave Íntima',
    author: 'Sapetti Brillana',
    category: 'LGBT+',
    price: '$32900',
    audioPrice: '$16450',
    rating: 4.7,
    cover: sinfoniaClaveIntimaCover,
    description: 'Cartas secretas y partituras enmudecidas que rinden homenaje a un romance prohibido entre dos compositores de la corte imperial de Viena.'
  }
];

const categories = ['Todos', 'Gótico', 'Audiolibros', 'Poesía Trágica', 'Romance Oscuro', 'Ficción Oscura', 'Vampírico', 'Misterio Real', 'Época', 'Historia', 'Biología', 'Filosofía', 'LGBT+'];

export default function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('nocturna_v10_books');
    let initialData = saved ? JSON.parse(saved) : INITIAL_BOOKS;
    // Force removal of "Reliquias Prohibidas" if it exists in saved state
    initialData = initialData.filter((b: any) => b.title !== 'Reliquias Prohibidas' && b.title !== 'Reliquias Prohibidas');
    
    // Inject Blackpink book if it is not in the list yet
    const hasBlackpink = initialData.some((b: any) => b.title.toLowerCase().includes('blackpink'));
    if (!hasBlackpink) {
      const blackpinkBook = {
        id: 999120,
        title: 'Nocturna en Rosa y Negro: El Vals de BLACKPINK',
        author: 'Sapetti Brillana',
        category: 'Romance Oscuro',
        price: '$39000',
        audioPrice: '$19500',
        rating: 4.9,
        cover: nocturnaRosaNegroCover,
        description: 'En el cruce perfecto entre el susurro nocturno y el destello de la noche estelar, emerge una sinfonía literaria dedicada a las cuatro deidades de la música moderna: Jisoo, Jennie, Rosé y Lisa. Un relato de terciopelo rosa, espinas negras y corazones de cristal que laten "in your area".'
      };
      initialData = [blackpinkBook, ...initialData];
    }

    // Force update the cover images in case they are loaded from localstorage with old covers
    initialData = initialData.map((b: any) => {
      if (b.id === 999120 || b.title.toLowerCase().includes('blackpink')) {
        return {
          ...b,
          cover: nocturnaRosaNegroCover
        };
      }
      if (b.id === 1 || b.title === 'Promesas de Sangre') {
        return {
          ...b,
          cover: 'https://p4.wallpaperbetter.com/wallpaper/420/775/718/background-black-red-wallpaper-preview.jpg'
        };
      }
      if (b.id === 2 || b.title === 'El Vals del Velo') {
        return {
          ...b,
          cover: valsDelVeloCover
        };
      }
      if (b.id === 3 || b.title === 'Cadenas de Terciopelo') {
        return {
          ...b,
          cover: cadenasDeTerciopeloCover
        };
      }
      if (b.id === 5 || b.title === 'Cánticos de Sangre') {
        return {
          ...b,
          cover: canticosDeSangreCover
        };
      }
      if (b.id === 7 || b.title === 'Susurros de la Peste') {
        return {
          ...b,
          cover: susurrosDeLaPesteCover
        };
      }
      if (b.id === 8 || b.title === 'La Dama de Negro') {
        return {
          ...b,
          cover: laDamaDeNegroCover
        };
      }
      if (b.id === 9 || b.title === 'El Aristócrata de la Noche') {
        return {
          ...b,
          cover: aristocrataNocheCover
        };
      }
      if (b.id === 11 || b.title === 'Crónicas del Azufre') {
        return {
          ...b,
          cover: cronicasAzufreCover,
          description: 'En una derruida ciudad industrial invadida por vapores de azufre, un misterioso médico de la peste custodia saberes prohibidos ante la silueta de catedrales góticas.'
        };
      }
      if (b.id === 12 || b.title === 'Otoño en el Manicomio') {
        return {
          ...b,
          cover: otonoManicomioCover
        };
      }
      if (b.id === 13 || b.title === 'Lágrimas de Ébano') {
        return {
          ...b,
          cover: lagrimasEbanoCover
        };
      }
      if (b.id === 14 || b.title === 'Suspiros del Abismo') {
        return {
          ...b,
          cover: suspirosAbismoCover
        };
      }
      if (b.id === 15 || b.title === 'El Silencio de los Sauces') {
        return {
          ...b,
          cover: silencioSaucesCover
        };
      }
      if (b.id === 16 || b.title === 'La Melodía del Penitente') {
        return {
          ...b,
          cover: melodiaPenitenteCover
        };
      }
      if (b.id === 17 || b.title === 'Cicatrices de Obsidiana') {
        return {
          ...b,
          cover: cicatricesObsidianaCover
        };
      }
      if (b.id === 18 || b.title === 'El Grabador de Espejos') {
        return {
          ...b,
          cover: grabadorEspejosCover
        };
      }
      if (b.id === 19 || b.title === 'Herejía del Relojero') {
        return {
          ...b,
          cover: herejiaRelojeroCover
        };
      }
      if (b.id === 20 || b.title === 'El Cuarto sin Puerta') {
        return {
          ...b,
          cover: cuartoSinPuertaCover
        };
      }
      if (b.id === 21 || b.title === 'La Sociedad de los Crisantemos') {
        return {
          ...b,
          cover: sociedadCrisantemosCover
        };
      }
      if (b.id === 22 || b.title === 'Versos a una Tumba Vacía') {
        return {
          ...b,
          cover: versosTumbaVaciaCover
        };
      }
      if (b.id === 23 || b.title === 'Cenizas en la Cripta') {
        return {
          ...b,
          cover: cenizasCriptaCover
        };
      }
      if (b.id === 24 || b.title === 'Anales del Tabernáculo Negro') {
        return {
          ...b,
          cover: analesTabernaculoNegroCover
        };
      }
      if (b.id === 25 || b.title === 'Cenizas de Imperios Olvidados') {
        return {
          ...b,
          cover: cenizasImperiosCover
        };
      }
      if (b.id === 26 || b.title === 'Anatomía Psíquica de las Sombras') {
        return {
          ...b,
          cover: anatomiaPsiquicaSombrasCover
        };
      }
      if (b.id === 27 || b.title === 'El Herbario del Alquimista') {
        return {
          ...b,
          cover: herbarioAlquimistaCover
        };
      }
      if (b.id === 28 || b.title === 'Disertaciones sobre el Vacío') {
        return {
          ...b,
          cover: disertacionesVacioCover
        };
      }
      if (b.id === 29 || b.title === 'El Intelecto Sombrío') {
        return {
          ...b,
          cover: intelectoSombrioCover
        };
      }
      if (b.id === 30 || b.title === 'El Retrato de su Reflejo') {
        return {
          ...b,
          cover: retratoReflejoCover
        };
      }
      if (b.id === 31 || b.title === 'La Consagración de la Luna') {
        return {
          ...b,
          cover: consagracionLunaCover
        };
      }
      if (b.id === 32 || b.title === 'Sinfonía en Clave Íntima') {
        return {
          ...b,
          cover: sinfoniaClaveIntimaCover
        };
      }
      return b;
    });
    return initialData;
  });
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [purchaseType, setPurchaseType] = useState<'physical' | 'audio'>('physical');
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('nocturna_v10_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [sales, setSales] = useState<any[]>(() => {
    const saved = localStorage.getItem('nocturna_v10_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nocturna_v10_settings');
    const defaultSettings = {
      storeName: 'NocturnaLibrary',
      whatsappNumber: '1234567890',
      notifications: true,
      currencySymbol: '$', // $ is standard for ARS
      themeColor: '#8B0000', // Crimson
      instagramUrl: 'https://instagram.com',
      twitterUrl: 'https://twitter.com',
      behanceUrl: 'https://behance.net',
      spotifyUrl: 'https://spotify.com'
    };
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('nocturna_v10_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('nocturna_v10_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('nocturna_v10_settings', JSON.stringify(settings));
    document.documentElement.style.setProperty('--color-crimson', settings.themeColor);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('nocturna_v10_sales', JSON.stringify(sales));
  }, [sales]);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const handleAddBook = (book: any) => {
    const newBook = {
      ...book,
      id: Date.now(),
      rating: book.rating || 5.0,
      audioPrice: book.audioPrice || '$0.00',
      price: book.price || '$0.00'
    };
    setBooks(prev => [...prev, newBook]);
  };
  
  const handleUpdateBook = (updated: any) => {
    setBooks(prev => prev.map(b => b.id === updated.id ? updated : b));
  };
  
  const handleDeleteBook = (id: number) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const addToCart = (book: any, type: 'physical' | 'audio') => {
    const itemPrice = type === 'physical' ? book.price : book.audioPrice;
    const formattedPrice = itemPrice.startsWith('$') ? itemPrice.replace('$', settings.currencySymbol) : itemPrice;
    const newItem = {
      ...book,
      cartId: `${book.id}-${type}-${Date.now()}`,
      purchaseType: type,
      displayPrice: formattedPrice
    };
    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
    if (selectedBook) setSelectedBook(null);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    // More robust parsing: remove everything except numbers, dots and commas
    const priceStr = (item.displayPrice || '').toString().replace(/[^0-9.,]/g, '');
    const price = parseFloat(priceStr.replace(',', '.'));
    return isNaN(price) ? acc : acc + price;
  }, 0);

  const filteredBooks = books.filter(book => {
    if (activeCategory === 'Todos') return true;
    if (activeCategory === 'Audiolibros') return !!book.audioPrice;
    if (activeCategory === 'Vampírico') return book.category === 'Vampiros' || book.category === 'Vampírico';
    if (activeCategory === 'Misterio Real') return book.category === 'Misterio' || book.category === 'Misterio Real';
    return book.category === activeCategory;
  });

  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <LoginPage 
          onLogin={() => setIsAuthenticated(true)} 
          onClose={() => setIsAdminView(false)} 
        />
      );
    }
    return (
      <AdminPanel 
        books={books} 
        sales={sales}
        onUpdateSales={setSales}
        onAddBook={handleAddBook} 
        onUpdateBook={handleUpdateBook} 
        onDeleteBook={handleDeleteBook}
        onClose={() => setIsAdminView(false)}
        onLogout={() => {
          setIsAuthenticated(false);
          setIsAdminView(false);
        }}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    );
  }

  return (
    <div className="relative min-h-screen font-sans">
      {/* Ambient Background Lighting (Frosted Glass Theme) */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-bordeaux rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-crimson rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-20 right-40 w-1 h-32 bg-crimson blur-xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-2 h-20 bg-bordeaux blur-lg opacity-30 rotate-45"></div>
      </div>
      <ParticleBackground />
      <Navbar 
        storeName={settings.storeName} 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <OrderSummary 
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        order={lastOrder}
        storeName={settings.storeName}
        onConfirm={() => {
          const message = `*Nueva Orden: ${lastOrder.orderId}*\n\n` + 
            lastOrder.items.map((item: any) => `- ${item.title} (${item.purchaseType === 'audio' ? 'Audio' : 'Físico'}): ${item.displayPrice}`).join('\n') +
            `\n\n*Total: ${lastOrder.total}*`;
          
          // Record the sale as "real"
          const newSale = {
            id: lastOrder.orderId,
            bookTitle: lastOrder.items.length === 1 ? lastOrder.items[0].title : `${lastOrder.items[0].title} (+${lastOrder.items.length - 1})`,
            customerName: 'Cliente via WhatsApp',
            date: new Date().toISOString().split('T')[0],
            status: 'Completada',
            total: lastOrder.total
          };
          setSales(prev => [newSale, ...prev]);

          window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
          setCartItems([]);
          setIsOrderOpen(false);
        }}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        total={cartTotal}
        whatsappNumber={settings.whatsappNumber}
        currencySymbol={settings.currencySymbol || '$'}
        onCheckout={() => {
          const orderId = `OC-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 999)}`;
          setLastOrder({
            orderId,
            date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
            items: cartItems,
            total: `${settings.currencySymbol || '$'}${cartTotal.toFixed(2)}`
          });
          setIsCartOpen(false);
          setIsOrderOpen(true);
        }}
      />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6 bg-black">
          {/* Subtle Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-10" />

          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=2000" 
              alt="Gothic Library Atmosphere"
              className="w-full h-full object-cover scale-110 opacity-40 brightness-50 grayscale"
            />
          </motion.div>

          <div className="relative z-20 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-crimson font-semibold tracking-[0.5em] uppercase text-[9px] mb-8 block">Curaduría de Literatura Oscura</span>
              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight leading-none mb-10">
                La Elegancia <br />
                <span className="italic font-light opacity-80">de lo Prohibido</span>
              </h1>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light leading-relaxed mb-12">
                Libros que habitan en la penumbra, relatos que susurran secretos y artefactos que guardan historias que el mundo ha preferido olvidar.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <button 
                  onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-12 py-5 bg-crimson text-white font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 rounded-full shadow-[0_0_40px_rgba(139,0,0,0.3)]"
                >
                  <span className="relative z-10">Explorar Archivos</span>
                </button>
                <div 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors"
                >
                  <span className="w-12 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-crimson transition-all" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Bajo la luz de la luna</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 rotate-90 origin-left translate-x-2">Despacio</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-crimson/60 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* FEATURED SECTION */}
        <section id="featured" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-crimson font-semibold tracking-widest uppercase text-xs mb-2 block">Selección de Autor</span>
              <h2 className="text-4xl md:text-5xl font-serif">Destacados del Mes</h2>
            </div>
            <p className="text-gray-500 max-w-md font-light">
              Nuestra editorial ha seleccionado estas piezas únicas por su narrativa visual y literaria excepcional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => {
                    setSelectedBook(book);
                    setPurchaseType(activeCategory === 'Audiolibros' ? 'audio' : 'physical');
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5 glass rounded-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-crimson/50">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 opacity-60 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 card-gradient z-10" />
                    <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        className="w-full py-3 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-crimson hover:text-white transition-colors rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(book, activeCategory === 'Audiolibros' ? 'audio' : 'physical');
                        }}
                      >
                        {activeCategory === 'Audiolibros' ? 'Adquirir Audio' : 'Añadir al Carrito'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-crimson fill-crimson" />
                        <span className="text-[10px] text-gray-500 uppercase">{book.rating} / 5.0</span>
                      </div>
                      {book.audioPrice && (
                        <Headphones className="w-3 h-3 text-gray-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium group-hover:text-crimson transition-colors">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <span className="text-crimson font-bold">
                      {activeCategory === 'Audiolibros' ? book.audioPrice : book.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="py-24 border-y border-white/5 bg-white/[0.02]">
           <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl mb-12 font-serif text-white/90">Explorar por Género</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 border text-sm font-light tracking-wide transition-all ${
                    activeCategory === cat 
                      ? 'bg-crimson border-crimson text-white shadow-[0_0_20px_rgba(139,0,0,0.3)]' 
                      : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
           </div>
        </section>

        {/* DECORATIVE CAROUSEL MARQUEE */}
        <div className="py-20 overflow-hidden border-b border-white/5 whitespace-nowrap select-none">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {books.map((book) => (
                  <span key={book.id} className="text-5xl md:text-7xl font-serif text-white/5 italic">
                    {book.title} —
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-white/5 glass p-8 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000" 
                alt="Reading spot"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square border border-crimson/30 z-0" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-crimson/20 blur-3xl z-0" />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <span className="text-crimson font-semibold tracking-widest uppercase text-xs mb-4 block">Nuestra Filosofía</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Más que una librería: una oda a la quietud</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                Nocturna Library nació en el corazón de una antigua biblioteca personal con una misión simple: rescatar la experiencia física y espiritual de leer bajo el manto de la noche. Creemos que el silencio es un lienzo, y la literatura de alta calidad es el color que lo transforma.
              </p>
              <p>
                No solo vendemos libros; curamos atmósferas. Cada ejemplar de nuestra colección es seleccionado por su peso cultural, la belleza táctil de su edición y la trascendencia de su mensaje. Desde ediciones góticas encuadernadas en lino hasta poemas trágicos que susurran verdades universales, cada obra es un portal.
              </p>
              <p>
                Nuestra visión se extiende más allá de los estantes. Buscamos fomentar una comunidad de lectores que valoran la pausa, el aroma del papel viejo y la profundidad de una narrativa que no teme explorar la luz y la sombra. En un mundo saturado de gratificación instantánea, Nocturna es un monumento a la paciencia y al asombro.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-white/5">
                <div>
                  <h4 className="text-white font-serif mb-2 text-xl">Curaduría Ética</h4>
                  <p className="text-sm text-gray-500">Trabajamos directamente con editoriales independientes y artesanos del libro para asegurar que cada página sea una obra de arte.</p>
                </div>
                <div>
                  <h4 className="text-white font-serif mb-2 text-xl">Legado Visual</h4>
                  <p className="text-sm text-gray-500">Valoramos la estética tanto como el contenido, seleccionando portadas que son piezas de colección por derecho propio.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                <h4 className="text-crimson font-serif mb-4 text-xl tracking-tight">El Proceso de Selección Nocturna</h4>
                <p className="text-sm text-gray-500 mb-4 font-light">
                  No todos los libros pueden entrar en nuestro santuario. Cada manuscrito pasa por un riguroso proceso de evaluación que dura exactamente un ciclo lunar. Buscamos:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                    Narrativas que desafíen el tiempo
                  </li>
                  <li className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                    Calidad tipográfica excepcional
                  </li>
                  <li className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                    Resonancia emocional profunda
                  </li>
                </ul>
              </div>

              <div className="pt-8">
              </div>
            </div>
          </motion.div>
        </section>

        <section id="contact" className="py-24 px-6 relative bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif text-white mb-4">Contactar con la Biblioteca</h2>
              <p className="text-gray-500 font-light italic">¿Buscas una obra en particular o deseas vender una pieza de tu colección?</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 md:p-12 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <form 
                className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const button = form.querySelector('button');
                  if (button) {
                    button.innerHTML = 'Enviando...';
                    setTimeout(() => {
                      button.innerHTML = 'Mensaje Enviado';
                      button.classList.remove('bg-crimson');
                      button.classList.add('bg-green-600');
                      form.reset();
                    }, 1500);
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Escriba su nombre..."
                    className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    placeholder="email@ejemplo.com"
                    className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Mensaje</label>
                  <textarea 
                    rows={4}
                    placeholder="¿En qué podemos asistirle?"
                    className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full py-5 bg-crimson text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:brightness-125 transition-all">
                    Enviar Misiva
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="footer" className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="text-2xl font-serif font-bold mb-6">
                {settings.storeName}<span className="text-crimson">.</span>
              </div>
              <p className="text-gray-500 max-w-sm font-light mb-8">
                Inscríbete a nuestra gaceta mensual para recibir recomendaciones exclusivas y noticias de ediciones limitadas.
              </p>
              <div className="flex gap-2 text-white">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-crimson transition-all flex-grow"
                />
                <button className="bg-crimson px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-crimson/80 transition-all">
                  Unirse
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Navegación</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li><a href="#featured" className="hover:text-white transition-colors">Colecciones</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Novedades</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Síguenos</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li>
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-all flex items-center gap-3 group">
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-all flex items-center gap-3 group">
                    <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href={settings.behanceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-all flex items-center gap-3 group">
                    <Palette className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Behance
                  </a>
                </li>
                <li>
                  <a href={settings.spotifyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-all flex items-center gap-3 group">
                    <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Spotify
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 Nocturna Library. Todos los derechos reservados.</span>
              <button 
                onClick={() => setIsAdminView(true)}
                className="text-[9px] text-gray-800 hover:text-crimson transition-all flex items-center gap-1 uppercase tracking-widest"
              >
                <Lock className="w-2 h-2" /> Acceso Administrativo
              </button>
            </div>
            <div className="flex gap-8 text-[10px] text-gray-600 uppercase tracking-widest">
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass overflow-hidden rounded-3xl grid md:grid-cols-2 z-10"
            >
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-6 right-6 z-20 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[3/4] md:aspect-auto h-full overflow-hidden bg-black/50 flex items-center justify-center">
                <img 
                  src={selectedBook.cover} 
                  alt={selectedBook.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-crimson font-semibold tracking-widest uppercase text-[10px] px-3 py-1 border border-crimson/30 rounded-full">
                    {selectedBook.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-crimson fill-crimson" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{selectedBook.rating} SCORE</span>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif mb-2 leading-tight">{selectedBook.title}</h2>
                <p className="text-xl text-gray-500 font-light mb-8 italic">por {selectedBook.author}</p>
                
                <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg italic">
                  "{selectedBook.description}"
                </p>

                <div className="mb-8">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Seleccionar Formato</span>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setPurchaseType('physical')}
                      className={`flex-1 py-4 border transition-all flex flex-col items-center gap-2 ${purchaseType === 'physical' ? 'border-crimson bg-crimson/5 text-white' : 'border-white/10 text-gray-500 hover:border-white/20'}`}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="text-[10px] uppercase tracking-widest">Impreso</span>
                    </button>
                    <button 
                      onClick={() => setPurchaseType('audio')}
                      className={`flex-1 py-4 border transition-all flex flex-col items-center gap-2 ${purchaseType === 'audio' ? 'border-crimson bg-crimson/5 text-white' : 'border-white/10 text-gray-500 hover:border-white/20'}`}
                    >
                      <Headphones className="w-5 h-5" />
                      <span className="text-[10px] uppercase tracking-widest">Audiolibro</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/10">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">
                      {purchaseType === 'physical' ? 'Precio Edición Impresa' : 'Precio Versión Audio'}
                    </span>
                    <span className="text-3xl font-bold text-white tracking-tighter">
                      {purchaseType === 'physical' ? selectedBook.price : selectedBook.audioPrice}
                    </span>
                  </div>
                  <button 
                    onClick={() => addToCart(selectedBook, purchaseType)}
                    className="px-8 py-4 bg-crimson text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:brightness-125 transition-all"
                  >
                    Adquirir {purchaseType === 'physical' ? 'Obra' : 'Audio'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp for Orders */}
      <motion.a
        href={`https://wa.me/${settings.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(139, 0, 0, 0.6)" }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] w-12 h-12 md:w-16 md:h-16 bg-crimson rounded-full flex items-center justify-center shadow-2xl group transition-all"
        title="Pedidos vía WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-crimson animate-ping opacity-20" />
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 md:w-8 md:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] uppercase tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Pedidos WhatsApp
        </span>
      </motion.a>

      <ChatBot books={books} settings={settings} />
    </div>
  );
}

function Navbar({ storeName, cartCount, onOpenCart }: { storeName: string; cartCount: number; onOpenCart: () => void }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#featured", label: "Colecciones" },
    { href: "#categories", label: "Novedades" },
    { href: "#about", label: "Sobre Nosotros" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 ${scrolled || isMobileMenuOpen ? 'py-4 glass shadow-2xl' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-crimson to-bordeaux rounded shadow-[0_0_15px_rgba(139,0,0,0.5)] flex items-center justify-center">
            <span className="text-white font-bold text-xl">{storeName.charAt(0)}</span>
          </div>
          <div className="text-xl md:text-2xl font-serif font-bold tracking-tighter">
            {storeName.replace('Library', '')}<span className="text-crimson font-black">Library</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="text-white hover:text-crimson transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-crimson text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white flex flex-col gap-1.5 p-2"
          >
            <motion.div 
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7 : 0 }}
              className="w-6 h-[1px] bg-white" 
            />
            <motion.div 
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              className="w-6 h-[1px] bg-white" 
            />
            <motion.div 
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7 : 0 }}
              className="w-6 h-[1px] bg-white" 
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif text-white hover:text-crimson transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode; key?: string }) {
  return (
    <a 
      href={href} 
      className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-crimson transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function OrderSummary({ isOpen, onClose, order, storeName, onConfirm }: { isOpen: boolean, onClose: () => void, order: any, storeName: string, onConfirm: () => void }) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(139,0,0,0.4)]"
          >
            {/* Header Design */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-r from-crimson/10 to-transparent">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-1">{storeName}</h2>
                  <p className="text-[10px] uppercase tracking-widest text-crimson font-bold">Orden de Compra Oficial</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-mono">{order.orderId}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{order.date}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Descripción</th>
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center">Tipo</th>
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {order.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="py-4">
                        <p className="text-sm text-white font-medium">{item.title}</p>
                        <p className="text-[10px] text-gray-500">{item.author}</p>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`text-[9px] px-2 py-1 rounded-full uppercase tracking-tighter ${item.purchaseType === 'audio' ? 'bg-amber-500/10 text-amber-500' : 'bg-crimson/10 text-crimson'}`}>
                          {item.purchaseType === 'audio' ? 'Audiolibro' : 'Físico'}
                        </span>
                      </td>
                      <td className="py-4 text-right text-sm text-white font-mono">{item.displayPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total a Pagar</p>
                  <h3 className="text-3xl font-bold text-white tracking-tighter">{order.total}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[9px] text-gray-500 max-w-[200px] leading-relaxed italic">
                      Este documento certifica su intención de adquisición en nuestra biblioteca.
                    </p>
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="p-6 bg-white/5 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-4 border border-white/10 text-white text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors"
                id="cancel-order-btn"
              >
                Volver al Carrito
              </button>
              <button 
                onClick={onConfirm}
                className="flex-[2] py-4 bg-crimson text-white text-[10px] uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:brightness-125 transition-all"
                id="confirm-order-btn"
              >
                Finalizar y Enviar a WhatsApp
              </button>
            </div>
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none text-[120px] font-serif rotate-[-20deg]">
              NOCTURNA
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CartSidebar({ isOpen, onClose, items, onRemove, total, whatsappNumber, onCheckout, currencySymbol }: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: any[]; 
  onRemove: (id: string) => void;
  total: number;
  whatsappNumber: string;
  onCheckout: () => void;
  currencySymbol: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/10 z-[201] flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-white">Tu Colección</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingCart className="w-12 h-12 mb-4" />
                  <p className="text-sm uppercase tracking-widest">El carrito está vacío</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-16 h-20 overflow-hidden bg-white/5 rounded">
                      <img src={item.cover} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{item.purchaseType === 'physical' ? 'Imprenta' : 'Audio'}</p>
                      <span className="text-crimson font-bold text-sm tracking-tighter">{item.displayPrice}</span>
                    </div>
                    <button 
                      onClick={() => onRemove(item.cartId)}
                      className="text-gray-700 hover:text-crimson transition-colors self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total Estimado</span>
                  <span className="text-3xl font-serif text-white font-bold">{currencySymbol}{total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="block w-full py-4 bg-crimson text-white text-center font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:brightness-125 transition-all"
                >
                  Generar Orden de Compra
                </button>
                <p className="text-[9px] text-gray-600 uppercase tracking-widest text-center">
                  Serás redirigido a WhatsApp para coordinar el pago y envío.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
