import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    discount,
    applyCoupon,
    couponCode
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(inputCoupon);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 3000);
    } else {
      setInputCoupon('');
    }
  };

  const handleWhatsAppCheckout = () => {
    const text = cart
      .map((item) => `• ${item.product.name} (100g) x${item.quantity} = ₹${item.product.price * item.quantity}`)
      .join('%0A');
    const url = `https://wa.me/918488971879?text=Hi%20NuttyBitez!%20I%20would%20like%20to%20place%20an%20order:%0A%0A${text}%0A%0ATotal:%20₹${totalPrice}`;
    window.open(url, '_blank');
    setIsCheckoutSubmitted(true);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-brand-espresso border-l border-brand-gold/30 text-brand-cream shadow-2xl flex flex-col justify-between relative"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-goldLight" />
                <h3 className="font-serif text-2xl font-bold tracking-wide">
                  Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-brand-roast text-brand-cream/70 hover:text-brand-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-3 bg-brand-dark/60 border-b border-brand-gold/15 text-xs">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-400 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> You unlocked FREE Delivery across India!
                </span>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-brand-cream/80">
                    Add <strong className="text-brand-goldLight font-serif text-sm">₹{amountNeeded}</strong> more for <span className="text-brand-gold font-bold">FREE Shipping</span>
                  </p>
                  <div className="w-full h-1.5 bg-brand-roast rounded-full overflow-hidden">
                    <div className="bg-gold-gradient h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4 text-brand-cream/60">
                  <ShoppingBag className="w-12 h-12 mx-auto text-brand-goldLight/40" />
                  <p className="font-serif text-xl font-light">Your cart is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-gold-gradient text-brand-dark font-bold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-xl bg-brand-dark/60 border border-brand-gold/20 flex gap-4 items-center"
                  >
                    <img
                      src={item.product.images.poster}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-brand-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base font-bold text-brand-cream truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-brand-goldLight uppercase tracking-wider">
                        100g Jar
                      </p>
                      <span className="font-serif text-sm font-bold text-brand-gold text-gold-gradient mt-1 block">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-brand-cream/40 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-brand-roast border border-brand-gold/30 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="hover:text-brand-gold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="hover:text-brand-gold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Coupon & Total Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-gold/20 bg-brand-dark/95 space-y-4">

                {/* Coupon Input */}
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-brand-goldLight" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. NUTTY10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-brand-espresso border border-brand-gold/30 text-xs uppercase text-brand-cream placeholder:normal-case placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-brand-roast border border-brand-gold/30 text-xs font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponCode && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Code <strong>{couponCode}</strong> applied ({discount > 0 ? `Saved ₹${discount}` : ''})
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400">Invalid coupon code. Try 'NUTTY10' or 'FOUNDER10'</p>
                )}

                {/* Subtotal Breakdown */}
                <div className="space-y-1.5 text-xs text-brand-cream/80 pt-2 border-t border-brand-gold/15">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-serif font-bold text-brand-cream pt-2 border-t border-brand-gold/15">
                    <span>Total Amount</span>
                    <span className="text-brand-goldLight text-xl">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Checkout via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('Redirecting to secure online payment gateway...');
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 transition-all"
                  >
                    <span>Pay Online (UPI / Card)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
