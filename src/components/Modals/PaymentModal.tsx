import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CreditCard, QrCode, Building2, CheckCircle2, ShieldCheck, ArrowRight, Lock, Printer, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PricingPlan, PaymentReceipt } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
  onOpenMemberPortal?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  plan,
  onOpenMemberPortal,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');

  // Customer details for billing
  const [customer, setCustomer] = useState({
    name: 'Karan Malhotra',
    phone: '+91 98765 43210',
    email: 'karan.malhotra@gmail.com',
  });

  // Card details
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8894',
    cardHolder: 'KARAN MALHOTRA',
    expiry: '08/29',
    cvv: '884',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  if (!isOpen || !plan) return null;

  const basePrice = plan.price;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalAmount = basePrice + gstAmount;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      const newReceipt = leadStore.addPayment({
        memberId: `KSG-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        planName: plan.name,
        amount: basePrice,
        gstAmount: gstAmount,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });

      setIsProcessing(false);
      setReceipt(newReceipt);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#EF4444', '#10B981', '#FFFFFF']
        });
      } catch (err) {
        // fallback
      }
    }, 1200);
  };

  const handleClose = () => {
    setReceipt(null);
    onClose();
  };

  const fillTestCard = () => {
    soundManager.playClick();
    setCardData({
      cardNumber: '4532 8894 1234 5678',
      cardHolder: 'KARAN MALHOTRA',
      expiry: '12/28',
      cvv: '392',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-xl rounded-3xl bg-[#101014] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="payment-modal-close-btn"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!receipt ? (
          <div>
            {/* Header */}
            <div className="text-left pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                COMPLETE YOUR <span className="text-[#D4AF37]">SUBSCRIPTION</span>
              </h3>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-base font-black text-white">{plan.name}</h4>
                  <p className="text-xs text-[#EF4444] font-semibold">{plan.discountBadge || 'Monthly Billed'}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Base Price</span>
                  <span className="text-lg font-black text-white">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Membership Duration</span>
                  <span className="text-white font-medium">1 Month (Auto-renews or cancel anytime)</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-white font-medium">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#D4AF37] pt-2 border-t border-white/10">
                  <span>Total Payable Amount</span>
                  <span className="text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="pay-method-upi"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'bg-gradient-to-br from-[#D4AF37]/25 to-[#EF4444]/20 border-2 border-[#D4AF37] text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  id="pay-method-card"
                  onClick={() => setPaymentMethod('Card')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'Card'
                      ? 'bg-gradient-to-br from-[#D4AF37]/25 to-[#EF4444]/20 border-2 border-[#D4AF37] text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#EF4444]" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  id="pay-method-netbanking"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'NetBanking'
                      ? 'bg-gradient-to-br from-[#D4AF37]/25 to-[#EF4444]/20 border-2 border-[#D4AF37] text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Payment Method Body */}
            <form onSubmit={handleProcessPayment} className="space-y-4">
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <p className="text-xs font-semibold text-neutral-300">Instant UPI Payment</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', name: 'Google Pay' },
                      { id: 'phonepe', name: 'PhonePe' },
                      { id: 'paytm', name: 'Paytm' },
                      { id: 'qr', name: 'Show QR' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`p-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                          upiApp === app.id
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-white/5 border-white/10 text-neutral-400'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                    <p className="text-xs text-neutral-300">
                      Merchant VPA: <span className="font-mono text-[#D4AF37] font-bold">ksggym.bangalore@okaxis</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Fast 1-click authorization via UPI deep link
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">Credit / Debit Card</span>
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-[10px] uppercase font-bold text-[#D4AF37] hover:underline"
                    >
                      ⚡ Fill Demo Card
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'NetBanking' && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <p className="text-xs font-semibold text-neutral-300">Popular Banks</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank, i) => (
                      <label key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 cursor-pointer">
                        <input type="radio" name="bank" defaultChecked={i === 0} />
                        <span>{bank}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit / Proceed */}
              <button
                id="submit-payment-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#AA8012] text-black shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PROCEED TO PAYMENT (₹{totalAmount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen / Digital Receipt */
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
              Membership <span className="text-emerald-400">Confirmed!</span>
            </h3>
            <p className="text-xs text-neutral-300 mt-1">
              Welcome to the KSG Elite Circle. Your subscription is activated.
            </p>

            {/* Official Digital Tax Invoice / Pass */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-b from-[#18181F] to-[#0E0E12] border-2 border-[#D4AF37]/50 text-left shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    OFFICIAL MEMBERSHIP RECEIPT
                  </span>
                  <h4 className="text-base font-black text-white">{receipt.planName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block">Member ID</span>
                  <span className="font-mono text-xs font-bold text-white">{receipt.memberId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Payment Ref</span>
                  <span className="font-mono text-white text-[11px]">{receipt.paymentId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Paid Via</span>
                  <span className="text-white font-medium">{receipt.paymentMethod} (₹{receipt.totalAmount})</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400">
                <span className="flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Status: 100% Active
                </span>
                <span className="text-[10px] text-neutral-400">Next billing: in 30 days</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                id="receipt-print-btn"
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              {onOpenMemberPortal && (
                <button
                  id="receipt-member-portal-btn"
                  onClick={() => {
                    handleClose();
                    onOpenMemberPortal();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#AA8012] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Member Portal</span>
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
