import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, ChevronRight, X, Trash2, Utensils, Facebook, MapPin, Loader2, Gift, Star, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSheetData, submitSheetData, SheetDish, SheetCategory, SHEET_ID } from './services/googleSheets';
import { DEFAULT_MENU_DATA, Dish, Category } from './data/menuData';

// ==========================================
// 📋 CONFIGURACIÓN DE LA PLANTILLA DEL MENÚ
// ==========================================
const RESTAURANTE_NAME = "El Pollón de Manchester";
const RESTAURANTE_SLOGAN = "Pollos a la Brasa & Parrillas";
const WHATSAPP_NUMBER = "51900000000"; // Reemplaza con tu número de WhatsApp con código de país (ej: 51 para Perú)
const FACEBOOK_URL = "https://facebook.com/";
const MAPS_URL = "https://www.google.com/maps/";
const LOGO_FOOTER_PATH = ""; // Reemplaza con la ruta de tu logo en public/ (ej: /logo.png)
const BANNER_PATH = ""; // Reemplaza con la ruta de tu banner en public/ (ej: /banner.png)
const MARQUEE_TEXT = "🔥 ¡BIENVENIDOS A EL POLLÓN DE MANCHESTER! • EL MEJOR SABOR EN POLLOS A LA BRASA Y PARRILLAS • PEDIDOS AL WHATSAPP • ";
// ==========================================

// Mapa de imágenes locales por categoría
const LOCAL_CATEGORY_IMAGES: Record<string, string> = {};

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
}

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // States for Birthday Form
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [isSubmittingBirthday, setIsSubmittingBirthday] = useState(false);
  const [birthdaySuccess, setBirthdaySuccess] = useState(false);
  const [birthdayData, setBirthdayData] = useState({
    nombre: '',
    telefono: '',
    fechaNacimiento: '',
    distrito: '',
    correo: ''
  });

  // States for Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewData, setReviewData] = useState({
    estrellasMozo: 0,
    estrellasComida: 0,
    comentario: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!SHEET_ID) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const [cats, dishes] = await Promise.all([
          fetchSheetData<SheetCategory>('Categorías'),
          fetchSheetData<SheetDish>('Platos')
        ]);

        if (cats.length === 0 && dishes.length === 0) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const formattedCategories: Category[] = cats.map(c => ({
          id: c.nombre.toLowerCase().replace(/\s+/g, '-'),
          nombre: c.nombre,
          imagen: LOCAL_CATEGORY_IMAGES[c.nombre] || c['URL de imagen'] || undefined,
          items: dishes
            .filter(d => d.categoría === c.nombre)
            .map(d => ({
              nombre: d['nombre del plato'],
              descripcion: d.descripción,
              precio: d.precio
            }))
        }));

        setCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setActiveCategory(formattedCategories[0].id);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setCategories(DEFAULT_MENU_DATA);
        if (DEFAULT_MENU_DATA.length > 0) {
          setActiveCategory(DEFAULT_MENU_DATA[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(i => i.nombre === dish.nombre && i.precio === dish.precio);
      if (existing) {
        return prev.map(i =>
          (i.nombre === dish.nombre && i.precio === dish.precio)
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { nombre: dish.nombre, precio: dish.precio, cantidad: 1 }];
    });
  };

  const updateQuantity = (nombre: string, precio: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.nombre === nombre && i.precio === precio) {
            const newQty = i.cantidad + delta;
            return newQty > 0 ? { ...i, cantidad: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const cleanPrice = item.precio.replace(/^[^\d.]*/, '').replace(',', '.');
      const num = parseFloat(cleanPrice) || 0;
      return acc + num * item.cantidad;
    }, 0);
  };

  const sendToWhatsApp = () => {
    const total = calculateTotal();
    let message = `*¡Hola ${RESTAURANTE_NAME}! Deseo realizar el siguiente pedido:*\n\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
    });
    message += `\n*TOTAL: S/. ${total.toFixed(2)}*\n\n_Por favor confirmar disponibilidad y tiempo de entrega._`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBirthdaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBirthday(true);
    const success = await submitSheetData('Cumpleaños', {
      timestamp: new Date().toLocaleString('es-PE'),
      nombre: birthdayData.nombre,
      telefono: birthdayData.telefono,
      fechaNacimiento: birthdayData.fechaNacimiento,
      distrito: birthdayData.distrito,
      correo: birthdayData.correo || 'No indicado'
    });
    
    setIsSubmittingBirthday(false);
    if (success) {
      setBirthdaySuccess(true);
      setTimeout(() => {
        setShowBirthdayForm(false);
        setBirthdaySuccess(false);
        setBirthdayData({ nombre: '', telefono: '', fechaNacimiento: '', distrito: '', correo: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewData.estrellasMozo === 0 || reviewData.estrellasComida === 0) {
      alert("Por favor califica ambas opciones con estrellas.");
      return;
    }

    setIsSubmittingReview(true);
    const success = await submitSheetData('Reseñas', {
      timestamp: new Date().toLocaleString('es-PE'),
      estrellasMozo: reviewData.estrellasMozo,
      estrellasComida: reviewData.estrellasComida,
      comentario: reviewData.comentario || 'Sin comentarios'
    });
    
    setIsSubmittingReview(false);
    if (success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccess(false);
        setReviewData({ estrellasMozo: 0, estrellasComida: 0, comentario: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF9]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-slogan text-primary font-bold tracking-widest uppercase text-xs">Cargando las mejores brasas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#FFFDF9] min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 px-5 py-4 flex justify-between items-center border-b border-orange-100">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-primary animate-pulse" />
            <h1 className="font-title text-[24px] tracking-wide text-primary leading-none uppercase">{RESTAURANTE_NAME}</h1>
          </div>
          <span className="font-slogan text-[11px] text-secondary font-bold tracking-wider mt-1">{RESTAURANTE_SLOGAN}</span>
        </div>
        <div className="flex items-center gap-2">
          {FACEBOOK_URL && (
            <motion.a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <Facebook size={20} />
            </motion.a>
          )}
          {MAPS_URL && (
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <MapPin size={20} />
            </motion.a>
          )}
          <motion.div
            onClick={() => cartCount > 0 && setShowSummary(true)}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative cursor-pointer hover:bg-primary/20 transition-colors"
          >
            <ShoppingBag size={20} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-secondary text-white rounded-full text-[10px] font-bold flex items-center justify-center px-1 animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      {/* Marquee Ticker */}
      <div className="w-full bg-gradient-to-r from-primary via-secondary to-primary py-2 overflow-hidden flex items-center shadow-inner">
        <div className="animate-marquee flex gap-6 text-white font-slogan font-bold text-[11px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>

      {/* Birthday Promo Card */}
      <div className="px-5 pt-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: ["0px 0px 0px 0px rgba(234,88,12,0.6)", "0px 0px 18px 6px rgba(234,88,12,0)", "0px 0px 0px 0px rgba(234,88,12,0)"] 
          }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          onClick={() => setShowBirthdayForm(true)}
          className="w-full bg-gradient-to-r from-amber-500 via-secondary to-red-600 text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide border border-amber-300 relative overflow-hidden group text-center shadow-lg"
        >
          <div className="absolute inset-0 shimmer opacity-25 mix-blend-overlay"></div>
          <Gift size={20} className="animate-bounce shrink-0 text-amber-200" />
          <span>¡Celebra tu cumpleaños con el mejor sabor! 🍗 <span className="text-amber-100 font-black underline">Regístrate aquí</span> y recibe una cortesía especial en tu día. 🎁🔥</span>
        </motion.button>
      </div>

      {/* Main Banner / Media Section */}
      <div className="px-5 pt-4 pb-2">
        {BANNER_PATH ? (
          <img src={BANNER_PATH} alt="Banner El Pollón de Manchester" className="w-full rounded-3xl object-cover aspect-[2/1] shadow-md border border-orange-100" />
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden shadow-md aspect-[2/1] bg-gradient-to-br from-primary/10 via-secondary/15 to-primary/5 flex flex-col items-center justify-center text-center p-4 border border-dashed border-primary/30">
            <Flame className="w-8 h-8 text-primary/40 mb-1" />
            <p className="font-dish font-bold text-primary text-xs uppercase tracking-widest">
              aca va a imagen
            </p>
          </div>
        )}
      </div>

      {/* Category Navigation Pills */}
      <div className="px-5 py-3 overflow-x-auto no-scrollbar sticky top-[73px] bg-[#FFFDF9]/95 backdrop-blur-sm z-40 border-b border-orange-100/60">
        <div className="flex gap-2 w-max py-0.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[12px] font-category font-semibold whitespace-nowrap transition-all duration-200 border uppercase tracking-wider
                ${activeCategory === cat.id
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/30 scale-105'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-primary/40 hover:text-primary'
                }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections & Dish Lists */}
      <main className="flex-1 overflow-y-auto pb-32 px-5 pt-2">
        {categories.map(cat => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-8 scroll-mt-36">
            {/* Category Header */}
            <div className="mb-3 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="text-primary wave-icon" size={20} />
                <h3 className="font-category font-bold text-primary text-[24px] uppercase tracking-wide category-underline">
                  {cat.nombre}
                </h3>
              </div>

              {/* Imagen de la Categoría */}
              {cat.imagen ? (
                <div className="w-full rounded-2xl overflow-hidden shadow-sm aspect-[21/9] mb-3 border border-orange-100">
                  <img
                    src={cat.imagen}
                    alt={cat.nombre}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedImage(cat.imagen || null)}
                  />
                </div>
              ) : (
                <div className="w-full rounded-2xl overflow-hidden shadow-sm aspect-[21/9] bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 flex flex-col items-center justify-center text-center p-3 border border-dashed border-primary/25 mb-3">
                  <span className="font-dish font-bold text-[10px] text-primary/70 uppercase tracking-widest">
                    aca va a imagen
                  </span>
                </div>
              )}
            </div>

            {/* Lista de Platos de la Categoría */}
            <div className="flex flex-col gap-2.5">
              {cat.items.map((dish, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-dish font-bold text-stone-900 text-[14px] leading-snug mb-1">
                      {dish.nombre}
                    </h4>
                    {dish.descripcion && (
                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                        {dish.descripcion}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-dish font-extrabold text-primary text-[15px] whitespace-nowrap">
                      {dish.precio}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => addToCart(dish)}
                      className="w-8 h-8 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                      title="Agregar al pedido"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Customer Review Invitation */}
        <section className="mt-8 mb-4 border border-orange-200/70 bg-gradient-to-br from-orange-50/70 to-amber-50/50 rounded-3xl p-5 text-center shadow-sm">
          <h3 className="font-title text-primary text-[22px] leading-tight mb-1 uppercase tracking-wide">¿Cómo estuvo tu experiencia?</h3>
          <p className="text-[11px] text-stone-600 mb-4 px-2">Ayúdanos a brindarte el mejor servicio calificando la atención y la comida.</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(true)}
            className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 mx-auto w-full transition-colors"
          >
            <Star size={18} className="fill-white" />
            Calificar Experiencia
          </motion.button>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-8 pb-10 border-t border-stone-200 flex flex-col items-center justify-center">
          <p className="font-title text-2xl text-primary mb-3 uppercase tracking-wide">{RESTAURANTE_NAME}</p>
          {LOGO_FOOTER_PATH ? (
            <img src={LOGO_FOOTER_PATH} alt="Logo" className="w-28 h-28 mb-5 object-contain" />
          ) : (
            <div className="w-28 h-28 mb-5 rounded-2xl border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center text-center p-2">
              <span className="font-dish font-bold text-[10px] text-primary uppercase tracking-wide">aca va a imagen</span>
            </div>
          )}
          <p className="text-[11px] text-stone-400 font-medium">© 2026 Todos los derechos reservados.</p>
        </footer>

        {/* Brand Credit */}
        <div className="bg-dark py-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-50 text-white/50">Digital Menu Experience</p>
          <motion.a 
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-sm tracking-tight group cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white group-hover:text-[#00BFFF] transition-colors duration-200">Hecho por Tyma</span>
            <span className="text-[#00BFFF] group-hover:text-white transition-colors duration-200">Solutions</span>
          </motion.a>
        </div>
      </main>

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {cartCount > 0 && !showSummary && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 w-full max-w-md p-4 z-40"
          >
            <div className="glass rounded-[2rem] p-3.5 flex items-center justify-between border border-white/70 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative overflow-hidden shadow-md">
                  <div className="shimmer absolute inset-0 opacity-20"></div>
                  <ShoppingBag size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-extrabold text-stone-900 text-base">{cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-primary hover:bg-red-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/30 font-bold text-sm transition-all"
              >
                Ver Pedido
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center p-4 lg:p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5 border-b border-stone-100 pb-3">
                <h2 className="font-title text-2xl text-primary uppercase tracking-wide">Mi Pedido</h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                >
                  <X size={18} className="text-stone-500" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div
                    key={`${item.nombre}-${item.precio}`}
                    className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-100"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-dish font-bold text-stone-900 text-sm truncate">{item.nombre}</h4>
                      <p className="font-dish text-xs text-primary font-extrabold">{item.precio}</p>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white px-2.5 py-1 rounded-xl border border-stone-200">
                      <button onClick={() => updateQuantity(item.nombre, item.precio, -1)} className="text-stone-400 hover:text-primary transition-colors">
                        <Minus size={15} />
                      </button>
                      <span className="font-dish font-bold text-sm w-4 text-center">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.nombre, item.precio, 1)} className="text-primary hover:text-red-700 transition-colors">
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-stone-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-dish text-lg font-bold text-stone-700">Total a pagar</h3>
                  <h3 className="font-dish text-2xl font-extrabold text-primary">S/. {calculateTotal().toFixed(2)}</h3>
                </div>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 hover:scale-[1.01] transition-transform font-bold text-base"
              >
                Enviar Pedido a WhatsApp
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday Form Modal */}
      <AnimatePresence>
        {showBirthdayForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowBirthdayForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <X size={18} className="text-stone-400" />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                  <Gift size={24} className="text-secondary" />
                </div>
                <h2 className="font-title text-2xl text-dark leading-none mb-1 uppercase">¡Tu Cumpleaños!</h2>
                <p className="text-xs text-stone-500">Regístrate y recibe una cortesía especial para celebrar con nosotros.</p>
              </div>

              {birthdaySuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-center text-sm font-bold border border-green-200">
                  ¡Gracias! Tus datos han sido guardados con éxito.
                </div>
              ) : (
                <form onSubmit={handleBirthdaySubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Nombre Completo</label>
                    <input required type="text" value={birthdayData.nombre} onChange={e => setBirthdayData({...birthdayData, nombre: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/70 transition-colors" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Teléfono</label>
                    <input required type="tel" minLength={9} maxLength={11} pattern="[0-9]*" value={birthdayData.telefono} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBirthdayData({...birthdayData, telefono: val});
                    }} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/70 transition-colors" placeholder="Ej. 987654321" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Fecha de Nacimiento</label>
                    <input required type="date" value={birthdayData.fechaNacimiento} onChange={e => setBirthdayData({...birthdayData, fechaNacimiento: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/70 transition-colors text-stone-700" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Distrito</label>
                    <input required type="text" value={birthdayData.distrito} onChange={e => setBirthdayData({...birthdayData, distrito: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/70 transition-colors" placeholder="Ej. San Juan de Lurigancho" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Correo Electrónico (Opcional)</label>
                    <input type="email" value={birthdayData.correo} onChange={e => setBirthdayData({...birthdayData, correo: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/70 transition-colors" placeholder="correo@ejemplo.com" />
                  </div>
                  
                  <button disabled={isSubmittingBirthday} type="submit" className="w-full bg-secondary hover:bg-orange-700 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-secondary/20 mt-2 disabled:opacity-70 flex justify-center items-center transition-colors">
                    {isSubmittingBirthday ? <Loader2 size={18} className="animate-spin" /> : "Guardar mis datos"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <X size={18} className="text-stone-400" />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                  <Star size={24} className="text-primary fill-primary" />
                </div>
                <h2 className="font-title text-2xl text-dark leading-none mb-1 uppercase">¡Califícanos!</h2>
                <p className="text-xs text-stone-500">Tu opinión nos ayuda a mejorar cada día.</p>
              </div>

              {reviewSuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-center text-sm font-bold border border-green-200">
                  ¡Muchas gracias por tu reseña!
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col items-center">
                    <p className="text-xs font-bold text-stone-600 mb-2">Atención del Mozo</p>
                    <div className="flex gap-1.5">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasMozo: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star size={28} className={reviewData.estrellasMozo >= star ? "text-amber-400 fill-amber-400" : "text-stone-300"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col items-center">
                    <p className="text-xs font-bold text-stone-600 mb-2">Sabor & Calidad de la Comida</p>
                    <div className="flex gap-1.5">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasComida: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star size={28} className={reviewData.estrellasComida >= star ? "text-amber-400 fill-amber-400" : "text-stone-300"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-1">Comentario (Opcional)</label>
                    <textarea 
                      rows={3} 
                      value={reviewData.comentario} 
                      onChange={e => setReviewData({...reviewData, comentario: e.target.value})} 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none mt-1" 
                      placeholder="Cuéntanos más sobre tu experiencia..." 
                    />
                  </div>
                  
                  <button disabled={isSubmittingReview} type="submit" className="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/25 mt-2 disabled:opacity-70 flex justify-center items-center transition-colors">
                    {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : "Enviar Reseña"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
