import { useState } from 'react';
import { ShoppingBag, Star, IndianRupee, Heart, Plus, Minus, X, Check, Truck, Shield, Award } from 'lucide-react';
import { products, productCategories, type Product } from '@/data/tourism';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showProduct, setShowProduct] = useState<Product | null>(null);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.product.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(
      cart.map((c) =>
        c.product.id === id
          ? { ...c, qty: Math.max(1, c.qty + delta) }
          : c
      )
    );
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <section id="marketplace" className="py-16 md:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-100 text-maroon-700 text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" />
            Authentic Crafts
          </div>
          <h2 className="section-title">Local Heritage Marketplace</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Handcrafted treasures made by artisans across India. Every purchase directly supports local craftspeople and preserves traditional art forms.
          </p>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Award, title: 'Authentic', desc: 'Verified artisans' },
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹2,000' },
            { icon: Shield, title: 'Secure', desc: 'Protected checkout' },
            { icon: Heart, title: 'Fair Trade', desc: 'Direct to artisan' },
          ].map((badge) => (
            <div key={badge.title} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-saffron-50 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-saffron-600" />
              </div>
              <div>
                <div className="font-semibold text-sm text-ink-900">{badge.title}</div>
                <div className="text-xs text-ink-700/50">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category filter + cart */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-maroon-600 text-white shadow-md shadow-maroon-600/20'
                    : 'bg-white text-ink-700 border border-cream-200 hover:border-maroon-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-900 text-white font-medium text-sm hover:bg-ink-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, idx) => (
            <div
              key={product.id}
              className="card card-hover group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-saffron-500 text-white text-xs font-bold shadow-md">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full glass-dark flex items-center justify-center transition-all hover:scale-110"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites.has(product.id) ? 'fill-maroon-500 text-maroon-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  <span className="text-xs font-bold text-ink-900">{product.rating}</span>
                  <span className="text-xs text-ink-700/40">({product.reviews})</span>
                  <span className="text-xs text-ink-700/40 ml-auto">{product.category}</span>
                </div>
                <h3
                  className="font-bold text-ink-900 text-sm cursor-pointer hover:text-saffron-600 transition-colors line-clamp-1"
                  onClick={() => setShowProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-ink-700/50 mt-1">{product.artisan} · {product.region}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-ink-900 flex items-center font-display">
                    <IndianRupee className="w-4 h-4" />
                    {product.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-9 h-9 rounded-full bg-saffron-500 text-white flex items-center justify-center hover:bg-saffron-600 active:scale-90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {showProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowProduct(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={showProduct.image} alt={showProduct.name} className="w-full h-72 object-cover" />
              <button
                onClick={() => setShowProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass-dark flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                <span className="font-bold text-sm">{showProduct.rating}</span>
                <span className="text-sm text-ink-700/40">({showProduct.reviews} reviews)</span>
                {showProduct.badge && (
                  <span className="ml-auto px-2.5 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold">
                    {showProduct.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-ink-900 font-display">{showProduct.name}</h3>
              <p className="text-sm text-ink-700/60 mt-1">By {showProduct.artisan} · {showProduct.region}</p>
              <p className="text-ink-700 mt-4">{showProduct.description}</p>
              <div className="flex items-center gap-4 mt-4 p-3 rounded-xl bg-cream-50">
                <div className="flex items-center gap-1 text-sm">
                  <Check className="w-4 h-4 text-teal-600" />
                  {showProduct.inStock} in stock
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Truck className="w-4 h-4 text-teal-600" />
                  Free shipping
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-3xl font-bold text-ink-900 flex items-center font-display">
                  <IndianRupee className="w-6 h-6" />
                  {showProduct.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => {
                    addToCart(showProduct);
                    setShowProduct(null);
                    setShowCart(true);
                  }}
                  className="btn-primary"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-ink-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-cream-200 p-5 flex items-center justify-between z-10">
              <h3 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-saffron-600" />
                Your Cart ({cartCount})
              </h3>
              <button onClick={() => setShowCart(false)} className="p-2 rounded-lg hover:bg-cream-100 transition-colors">
                <X className="w-5 h-5 text-ink-700/60" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-ink-700/30" />
                </div>
                <h4 className="font-semibold text-ink-900 mb-1">Your cart is empty</h4>
                <p className="text-sm text-ink-700/50">Browse the marketplace to find authentic crafts.</p>
              </div>
            ) : (
              <>
                <div className="p-5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 pb-4 border-b border-cream-100 last:border-0">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-ink-900 line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-ink-700/50">{item.product.region}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-cream-100 rounded-full p-1">
                            <button onClick={() => updateQty(item.product.id, -1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-cream-200 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.product.id, 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-cream-200 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-ink-900 flex items-center text-sm">
                            <IndianRupee className="w-3.5 h-3.5" />
                            {(item.product.price * item.qty).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-ink-700/30 hover:text-maroon-600 transition-colors self-start">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-cream-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-ink-700/60">Total</span>
                    <span className="text-2xl font-bold text-ink-900 flex items-center font-display">
                      <IndianRupee className="w-5 h-5" />
                      {cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button className="btn-primary w-full">
                    Proceed to Checkout
                  </button>
                  <p className="text-center text-xs text-ink-700/40 mt-2">Secure payment · Free shipping over ₹2,000</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
