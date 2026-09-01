import { useState } from "react";
import { X, Download, Printer, Eye, CheckCircle } from "lucide-react";
import { Modal } from "./ui";
import { formatPrice } from "../data/mock";
import type { Order } from "../types";

interface InvoiceProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

function InvoiceDocument({ order }: { order: Order }) {
  const invoiceNumber = `DJOULIA-${order.id.toUpperCase()}-2026`;
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const discount = order.originalPrice - order.finalPrice;
  const hasDiscount = discount > 0;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden text-sm" id="invoice-doc">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-base">D</span>
          </div>
          <div>
            <p className="font-black text-white text-lg font-display tracking-tight leading-none">DJOULIA</p>
            <p className="text-zinc-500 text-[10px]">Marketplace de services · Bamako, Mali</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-base font-display">FACTURE</p>
          <p className="text-zinc-400 text-xs">#{invoiceNumber}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-zinc-50 border-b border-zinc-200">
        <div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Prestataire</p>
          <p className="font-semibold text-zinc-900">{order.providerName}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-3 h-3 text-orange-500 fill-orange-500" strokeWidth={0} />
            <span className="text-xs text-orange-600 font-medium">Prestataire vérifié</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Client</p>
          <p className="font-semibold text-zinc-900">{order.clientName}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Date d'émission</p>
          <p className="text-zinc-700">{date}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Date de service</p>
          <p className="text-zinc-700">{order.scheduledDate || order.createdAt}</p>
        </div>
      </div>

      {/* Items */}
      <div className="px-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left pb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Service</th>
              <th className="text-right pb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Prix</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-3">
                <p className="font-semibold text-zinc-900">{order.serviceName}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{order.description}</p>
                <p className="text-xs text-zinc-400 mt-1">📍 {order.location}</p>
              </td>
              <td className="py-3 text-right">
                <p className="font-semibold text-zinc-900">{formatPrice(order.originalPrice)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-6 pb-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Sous-total</span>
            <span className="text-zinc-700">{formatPrice(order.originalPrice)}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Remise négociée</span>
              <span className="text-green-600 font-medium">−{formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">TVA</span>
            <span className="text-zinc-400">Non applicable</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-zinc-200 pt-3 mt-2">
            <span className="text-zinc-900">TOTAL</span>
            <span className="text-orange-500 font-black font-display text-lg">{formatPrice(order.finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mx-6 mb-5 rounded-xl border border-zinc-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-50">
          <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">Statut du paiement</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            order.status === "terminee"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {order.status === "terminee" ? "✓ Payé" : "En attente"}
          </span>
        </div>
        <div className="px-4 py-3 flex items-center gap-3">
          <span className="text-xl">💵</span>
          <div>
            <p className="text-sm font-medium text-zinc-900">Espèces</p>
            <p className="text-xs text-zinc-400">Paiement en personne</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-zinc-950 text-center">
        <p className="text-zinc-500 text-xs">
          Cette facture a été générée automatiquement par DJOULIA.
        </p>
        <p className="text-zinc-600 text-xs mt-1">
          djoulia.ml · contact@djoulia.ml · Bamako, Mali
        </p>
      </div>
    </div>
  );
}

export function InvoiceModal({ order, open, onClose }: InvoiceProps) {
  const [preview, setPreview] = useState(true);

  return (
    <Modal open={open} onClose={onClose} title="Facture" size="lg">
      <div className="space-y-4">
        {/* Toggle */}
        <div className="flex items-center gap-2 bg-zinc-50 rounded-xl p-1">
          <button
            onClick={() => setPreview(true)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${preview ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Aperçu
          </button>
          <button
            onClick={() => setPreview(false)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${!preview ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"}`}
          >
            <Download className="w-3.5 h-3.5" />
            Télécharger
          </button>
        </div>

        {preview ? (
          <InvoiceDocument order={order} />
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto">
              📄
            </div>
            <div>
              <p className="font-bold text-zinc-900 font-display">Télécharger la facture</p>
              <p className="text-sm text-zinc-500 mt-1">
                DJOULIA-{order.id.toUpperCase()}-2026.pdf
              </p>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white rounded-xl py-3 text-sm font-bold hover:bg-orange-600 transition-colors">
                <Download className="w-4 h-4" />
                Télécharger PDF
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-xl py-3 text-sm font-semibold hover:bg-zinc-100 transition-colors">
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
