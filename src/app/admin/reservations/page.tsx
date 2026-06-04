"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Phone, Mail, Filter, Download, Plus, X, Save } from "lucide-react";
import { excursions } from "@/data/excursions";

interface Reservation {
  id: string; excursionTitle: string; date: string;
  adults: number; children: number; infants: number;
  totalPrice: number; depositAmount: number; paymentType: string; status: string;
  isPaid: boolean; customerName: string; customerEmail: string;
  customerPhone: string; notes?: string; createdAt: string; source?: string;
}

const emptyCreate = () => ({
  excursionSlug: excursions[0]?.slug ?? "",
  date: new Date().toISOString().split("T")[0],
  adults: 2, children: 0, infants: 0,
  customerName: "", customerEmail: "", customerPhone: "",
  paymentType: "full" as "full" | "deposit",
  isPaid: true, status: "confirmed", notes: "",
});

const inputCls = "w-full bg-[#111111] border border-white/10 focus:border-tiki-gold rounded-xl px-3 py-2.5 text-white placeholder-white/20 outline-none transition-colors text-sm";
const labelCls = "block text-white/40 text-xs font-medium mb-1";

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmé",    cls: "bg-green-500/15 text-green-400 border-green-500/20" },
  pending:   { label: "En attente", cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
  cancelled: { label: "Annulé",     cls: "bg-red-500/15 text-red-400 border-red-500/20" },
};

export default function ReservationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreate());
  const [creating, setCreating] = useState(false);

  const selectedExc = excursions.find(e => e.slug === createForm.excursionSlug);
  const calcTotal = () => selectedExc
    ? createForm.adults * selectedExc.priceAdult + createForm.children * selectedExc.priceChild
    : 0;

  const submitCreate = async () => {
    setCreating(true);
    const total = calcTotal();
    await fetch("/api/admin/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...createForm,
        excursionId:    selectedExc?.id ?? "",
        excursionTitle: selectedExc?.title ?? "",
        totalPrice:     total,
        depositAmount:  Math.round(total * 0.3 * 100) / 100,
      }),
    });
    await fetchReservations();
    setShowCreate(false);
    setCreateForm(emptyCreate());
    setCreating(false);
  };

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login"); }, [status, router]);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const url = filter === "all" ? "/api/admin/reservations" : `/api/admin/reservations?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setReservations(data);
    setLoading(false);
    // Auto-sélectionne la première réservation si rien n'est sélectionné
    setSelected(prev => prev ?? (data.length > 0 ? data[0] : null));
  }, [filter]);

  useEffect(() => { if (session) fetchReservations(); }, [session, fetchReservations]);

  const updateStatus = async (id: string, newStatus: string) => {
    setSaving(true);
    await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    await fetchReservations();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
    setSaving(false);
  };

  const markPaid = async (id: string, isPaid: boolean) => {
    setSaving(true);
    await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isPaid }),
    });
    await fetchReservations();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, isPaid } : null);
    setSaving(false);
  };

  const exportCSV = () => {
    const headers = ["Nom","Email","Téléphone","Excursion","Date","Adultes","Enfants","Total","Statut","Payé"];
    const rows = reservations.map(r => [
      r.customerName, r.customerEmail, r.customerPhone, r.excursionTitle,
      r.date, r.adults, r.children, r.totalPrice,
      r.status, r.isPaid ? "Oui" : "Non",
    ]);
    const csv = [headers, ...rows].map(r => r.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "reservations.csv"; a.click();
  };

  if (status === "loading" || !session) return <div className="p-8 text-white/30">Chargement...</div>;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-black text-white text-2xl">Réservations</h1>
          <p className="text-white/40 text-sm mt-0.5">{reservations.length} résultat{reservations.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => { setShowCreate(v => !v); setCreateForm(emptyCreate()); }}
            className="flex items-center gap-2 bg-tiki-gold hover:bg-tiki-gold-dark text-tiki-ocean font-bold py-2.5 px-5 rounded-xl text-sm transition-colors">
            <Plus size={15} /> Nouvelle réservation
          </button>
          {/* Filtre */}
          <div className="flex items-center gap-2 bg-tiki-ocean-mid border border-white/10 rounded-xl px-3 py-2">
            <Filter size={14} className="text-white/40" />
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="bg-transparent text-white/70 text-sm outline-none cursor-pointer"
              style={{ backgroundColor: "#0F2A3D" }}>
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmés</option>
              <option value="cancelled">Annulés</option>
            </select>
          </div>
          <button onClick={exportCSV}
            className="flex items-center gap-2 bg-tiki-ocean-mid border border-white/10 hover:border-tiki-gold/30 rounded-xl px-4 py-2 text-white/60 hover:text-tiki-gold text-sm transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Formulaire création manuelle */}
      {showCreate && (
        <div className="bg-[#1A1A1A] border border-tiki-gold/30 rounded-2xl mb-5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="font-bold text-white text-sm">Nouvelle réservation manuelle (téléphone / physique)</h2>
            <button onClick={() => setShowCreate(false)} className="text-white/30 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Excursion */}
            <div>
              <label className={labelCls}>Excursion *</label>
              <select value={createForm.excursionSlug}
                onChange={e => setCreateForm(p => ({ ...p, excursionSlug: e.target.value }))}
                className={inputCls}>
                {excursions.filter(e => !e.pricePrivate).map(e => (
                  <option key={e.slug} value={e.slug}>{e.title}</option>
                ))}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className={labelCls}>Date *</label>
              <input type="date" value={createForm.date}
                onChange={e => setCreateForm(p => ({ ...p, date: e.target.value }))}
                className={inputCls} />
            </div>
            {/* Passagers */}
            <div className="grid grid-cols-3 gap-2">
              {([["Adultes", "adults"], ["Enfants", "children"], ["Bébés", "infants"]] as [string, keyof typeof createForm][]).map(([label, key]) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input type="number" min={key === "adults" ? 1 : 0} value={createForm[key] as number}
                    onChange={e => setCreateForm(p => ({ ...p, [key]: +e.target.value }))}
                    className={inputCls} />
                </div>
              ))}
            </div>
            {/* Nom */}
            <div>
              <label className={labelCls}>Nom complet *</label>
              <input value={createForm.customerName} placeholder="Jean Dupont"
                onChange={e => setCreateForm(p => ({ ...p, customerName: e.target.value }))}
                className={inputCls} />
            </div>
            {/* Email */}
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" value={createForm.customerEmail} placeholder="jean@email.com"
                onChange={e => setCreateForm(p => ({ ...p, customerEmail: e.target.value }))}
                className={inputCls} />
            </div>
            {/* Téléphone */}
            <div>
              <label className={labelCls}>Téléphone *</label>
              <input type="tel" value={createForm.customerPhone} placeholder="+590 690 00 00 00"
                onChange={e => setCreateForm(p => ({ ...p, customerPhone: e.target.value }))}
                className={inputCls} />
            </div>
            {/* Statut paiement */}
            <div>
              <label className={labelCls}>Paiement</label>
              <select value={createForm.paymentType}
                onChange={e => setCreateForm(p => ({ ...p, paymentType: e.target.value as "full" | "deposit" }))}
                className={inputCls}>
                <option value="full">Paiement total</option>
                <option value="deposit">Acompte 30%</option>
              </select>
            </div>
            {/* Total calculé */}
            <div>
              <label className={labelCls}>Total estimé</label>
              <div className={`${inputCls} text-tiki-gold font-bold`}>{calcTotal()} €</div>
            </div>
            {/* Payé */}
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="isPaid" checked={createForm.isPaid}
                onChange={e => setCreateForm(p => ({ ...p, isPaid: e.target.checked }))}
                className="w-4 h-4 accent-tiki-gold" />
              <label htmlFor="isPaid" className="text-white/60 text-sm cursor-pointer">Déjà encaissé</label>
            </div>
            {/* Notes — pleine largeur */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className={labelCls}>Notes internes</label>
              <textarea rows={2} value={createForm.notes} placeholder="Remarques, demandes spécifiques..."
                onChange={e => setCreateForm(p => ({ ...p, notes: e.target.value }))}
                className={`${inputCls} resize-none`} />
            </div>
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5">
            <button onClick={() => setShowCreate(false)}
              className="px-5 py-2.5 border border-white/10 text-white/50 hover:text-white rounded-xl text-sm transition-colors">
              Annuler
            </button>
            <button onClick={submitCreate} disabled={creating || !createForm.customerName || !createForm.date || !createForm.customerEmail}
              className="flex items-center gap-2 bg-tiki-gold hover:bg-tiki-gold-dark text-tiki-ocean font-bold py-2.5 px-6 rounded-xl text-sm transition-colors disabled:opacity-50">
              <Save size={15} /> {creating ? "Enregistrement..." : "Créer la réservation"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Liste */}
        <div className="xl:col-span-2 space-y-5">
          {loading ? (
            <div className="bg-tiki-ocean-mid border border-white/8 rounded-2xl p-8 text-center text-white/30 text-sm">Chargement...</div>
          ) : reservations.length === 0 ? (
            <div className="bg-tiki-ocean-mid border border-white/8 rounded-2xl p-8 text-center text-white/30 text-sm">Aucune réservation trouvée</div>
          ) : (() => {
            const today = new Date(new Date().toDateString());
            const upcoming = reservations.filter(r => new Date(r.date) >= today);
            const past     = reservations.filter(r => new Date(r.date) <  today);

            const ReservationCard = (r: Reservation, isPast: boolean) => {
              const s = STATUS_MAP[r.status] ?? STATUS_MAP.pending;
              const isSelected = selected?.id === r.id;
              return (
                <button key={r.id} onClick={() => setSelected(r)} className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-150 ${
                  isSelected
                    ? "bg-tiki-ocean-mid border-tiki-gold shadow-lg shadow-tiki-gold/10"
                    : isPast
                    ? "bg-[#111820] border-white/5 hover:border-white/15"
                    : "bg-tiki-ocean-mid border-white/8 hover:border-white/20"
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`font-bold text-sm ${isSelected ? "text-tiki-gold" : isPast ? "text-white/45" : "text-white"}`}>
                          {r.customerName}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>
                        {r.isPaid
                          ? <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle2 size={11} /> Soldé</span>
                          : <span className="text-xs text-yellow-400 flex items-center gap-1"><Clock size={11} /> Acompte</span>}
                      </div>
                      <div className={`text-xs ${isPast ? "text-white/30" : "text-white/45"}`}>
                        {r.excursionTitle} &nbsp;·&nbsp;
                        {new Date(r.date).toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" })}
                      </div>
                      <div className="text-white/25 text-xs mt-0.5">{r.adults + r.children} pers.</div>
                    </div>
                    <div className={`font-black text-lg shrink-0 ${isSelected ? "text-tiki-gold" : isPast ? "text-white/25" : "text-white/70"}`}>
                      {r.totalPrice} €
                    </div>
                  </div>
                </button>
              );
            };

            return (
              <>
                {/* Réservations à venir */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">À venir</span>
                    <span className="text-xs bg-tiki-gold/15 text-tiki-gold border border-tiki-gold/25 px-2 py-0.5 rounded-full font-bold">{upcoming.length}</span>
                  </div>
                  {upcoming.length === 0 ? (
                    <div className="bg-tiki-ocean-mid border border-white/8 rounded-2xl p-5 text-center text-white/25 text-sm">
                      Aucune réservation à venir
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {upcoming.map(r => ReservationCard(r, false))}
                    </div>
                  )}
                </div>

                {/* Réservations passées */}
                {past.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Passées</span>
                      <span className="text-xs bg-white/5 text-white/30 border border-white/10 px-2 py-0.5 rounded-full font-bold">{past.length}</span>
                    </div>
                    <div className="space-y-2">
                      {past.map(r => ReservationCard(r, true))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Détail */}
        <div className="bg-tiki-ocean-mid border border-white/8 rounded-2xl p-5">
          {!selected ? (
            <div className="text-center text-white/25 text-sm py-12">
              Sélectionnez une réservation
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-white mb-4">{selected.customerName}</h2>

              {/* Contacts */}
              <div className="space-y-2 mb-5">
                <a href={`tel:${selected.customerPhone}`}
                  className="flex items-center gap-2 text-tiki-lagon-light text-sm hover:underline">
                  <Phone size={13} /> {selected.customerPhone}
                </a>
                <a href={`mailto:${selected.customerEmail}`}
                  className="flex items-center gap-2 text-tiki-lagon-light text-sm hover:underline">
                  <Mail size={13} /> {selected.customerEmail}
                </a>
              </div>

              {/* Infos résa */}
              <div className="space-y-2 text-sm mb-5 border-y border-white/8 py-4">
                {[
                  ["Excursion", selected.excursionTitle],
                  ["Date", new Date(selected.date).toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" })],
                  ["Adultes", selected.adults],
                  ["Enfants", selected.children],
                  ["Total", `${selected.totalPrice} €`],
                  ["Acompte", `${selected.depositAmount} €`],
                  ["Paiement", selected.paymentType === "deposit" ? "Acompte 30%" : "Total réglé"],
                  ["Réservé le", new Date(selected.createdAt).toLocaleDateString("fr-FR")],
                ].map(([l, v]) => (
                  <div key={String(l)} className="flex justify-between gap-2">
                    <span className="text-white/40">{l}</span>
                    <span className="text-white text-right">{String(v)}</span>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <div className="bg-white/5 rounded-xl p-3 text-white/50 text-xs mb-5">
                  <div className="text-white/30 text-xs mb-1">Notes</div>
                  {selected.notes}
                </div>
              )}

              {/* Actions statut */}
              <div className="space-y-2">
                <p className="text-white/30 text-xs font-medium uppercase tracking-wide mb-2">Statut</p>
                {[
                  { val: "confirmed", label: "✓ Confirmer",   cls: "bg-green-600 hover:bg-green-700 text-white" },
                  { val: "pending",   label: "⏳ En attente", cls: "bg-yellow-600 hover:bg-yellow-700 text-white" },
                  { val: "cancelled", label: "✗ Annuler",     cls: "bg-red-600 hover:bg-red-700 text-white" },
                ].map(({ val, label, cls }) => (
                  <button key={val}
                    disabled={saving || selected.status === val}
                    onClick={() => updateStatus(selected.id, val)}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-40 ${
                      selected.status === val ? "opacity-40 cursor-default " : ""
                    }${cls}`}>
                    {label}
                  </button>
                ))}

                <button
                  disabled={saving}
                  onClick={() => markPaid(selected.id, !selected.isPaid)}
                  className="w-full py-2.5 rounded-xl text-sm font-medium border border-tiki-gold/30 text-tiki-gold hover:bg-tiki-gold/10 transition-colors disabled:opacity-40 mt-2">
                  {selected.isPaid ? "Marquer comme non soldé" : "Marquer comme soldé"}
                </button>

                <a href={`https://wa.me/${selected.customerPhone.replace(/\s+/g, "").replace("+", "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2 mt-1">
                  Contacter sur WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
