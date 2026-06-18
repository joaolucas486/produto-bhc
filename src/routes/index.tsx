import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, User, ShoppingBag, Menu, X, Shield, Truck,
  CreditCard, Headphones, ChevronDown, MessageCircle, Sparkles, Heart,
} from "lucide-react";
import img1 from "@/assets/img1.jpg.asset.json";
import img2 from "@/assets/img2.jpg.asset.json";
import img3 from "@/assets/img3.jpg.asset.json";
import img4 from "@/assets/img4.jpg.asset.json";
import img5 from "@/assets/img5.jpg.asset.json";
import img6 from "@/assets/img6.jpg.asset.json";
import img7 from "@/assets/img7.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHC — Beleza, cuidado e confiança em cada detalhe" },
      { name: "description", content: "Loja oficial BHC: suplementos, cosméticos e cuidados premium para sua beleza e bem-estar." },
      { property: "og:title", content: "BHC — Beleza, cuidado e confiança" },
      { property: "og:description", content: "Loja oficial BHC: suplementos, cosméticos e cuidados premium." },
      { property: "og:image", content: img1.url },
    ],
  }),
  component: Home,
});

type Product = {
  id: string; name: string; tagline: string; price: number; oldPrice?: number;
  image: string; badge?: "Mais vendido" | "Promoção" | "Novo"; category: string;
};

const products: Product[] = [
  { id: "silicone", name: "BHC Silicone em Pó", tagline: "Termogênico • Creatina • Pré-treino", price: 197, oldPrice: 247, image: img1.url, badge: "Mais vendido", category: "Silicone em Pó" },
  { id: "tonico", name: "BHC Tônico Capilar", tagline: "Cuidado intensivo para os fios", price: 89, image: img2.url, category: "Tônico Capilar" },
  { id: "bumbum", name: "BHC Bum Bum Beauty", tagline: "Creme firmador corporal", price: 149, oldPrice: 179, image: img3.url, badge: "Promoção", category: "Bumbum Beauty" },
  { id: "hair", name: "BHC Hair", tagline: "Suplemento em cápsulas", price: 129, image: img4.url, badge: "Novo", category: "Hair" },
  { id: "power", name: "BHC Power UP 3x", tagline: "Creatina • Colágeno • Silício", price: 219, image: img5.url, badge: "Mais vendido", category: "Power UP 3x" },
  { id: "gummies", name: "BHC Night Gummies", tagline: "Gomas com pectina, sabor maracujá", price: 99, image: img6.url, category: "Night Gummies" },
  { id: "meta", name: "BHC MetaBody", tagline: "Colágeno • Laranja Moro • Café Verde", price: 159, oldPrice: 189, image: img7.url, badge: "Promoção", category: "MetaBody" },
  { id: "serum", name: "BHC Sérum Facial", tagline: "Hidratação e viço diário", price: 139, image: img3.url, badge: "Novo", category: "Sérum Facial" },
];

const categories = [
  "Silicone em Pó", "Hair", "Bumbum Beauty", "MetaBody",
  "Tônico Capilar", "Power UP 3x", "Night Gummies", "Sérum Facial",
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#produtos", label: "Produtos" },
  { href: "#mais-vendidos", label: "Mais Vendidos" },
  { href: "#kits", label: "Kits" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

function brl(v: number) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#home" className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary shadow-soft">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="leading-none">
        <div className="font-display text-xl font-bold tracking-tight text-foreground">BHC</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Beauty</div>
      </div>
    </a>
  );
}

function Header({ cartCount, onCart }: { cartCount: number; onCart: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 z-50 w-full transition-all ${scrolled ? "bg-background/85 backdrop-blur-md shadow-card" : "bg-background/60 backdrop-blur"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex justify-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <button aria-label="Buscar" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-primary"><Search className="h-4 w-4" /></button>
          <button aria-label="Conta" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-primary"><User className="h-4 w-4" /></button>
          <button onClick={onCart} aria-label="Carrinho" className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-primary">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{cartCount}</span>}
          </button>
          <a href="#produtos" className="ml-1 hidden md:inline-flex items-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.03] hover:shadow-glow">
            Comprar agora
          </a>
          <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 lg:hidden hover:bg-secondary">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-foreground/80 hover:text-primary">{l.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" /> Linha Premium BHC
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Beleza, cuidado <br />
            <span className="text-primary">e confiança</span>
            <br />em cada detalhe.
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
            Suplementos e cosméticos formulados para realçar a sua beleza natural, com qualidade premium.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#produtos" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.03] hover:shadow-glow">
              Ver produtos
            </a>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 px-7 py-3.5 text-sm font-semibold text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl sm:h-96 sm:w-96" />
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-gold/10 blur-xl" />
            <img src={img1.url} alt="BHC Silicone em Pó" className="relative h-auto w-72 sm:w-96 drop-shadow-2xl" />
          </div>
          <div className="absolute -right-2 top-10 hidden rounded-2xl bg-background/90 px-4 py-3 shadow-glow backdrop-blur sm:flex sm:items-center sm:gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10"><Heart className="h-4 w-4 text-primary" /></div>
            <div className="text-xs"><div className="font-semibold">Mais vendido</div><div className="text-muted-foreground">Top 1 da loja</div></div>
          </div>
          <div className="absolute -left-2 bottom-10 hidden rounded-2xl bg-background/90 px-4 py-3 shadow-glow backdrop-blur sm:flex sm:items-center sm:gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/20"><Sparkles className="h-4 w-4 text-gold" /></div>
            <div className="text-xs"><div className="font-semibold">Fórmula premium</div><div className="text-muted-foreground">Resultados visíveis</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Coleções</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Explore por categoria</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c, i) => (
            <a key={c} href="#produtos" className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-primary opacity-10 transition group-hover:scale-150 group-hover:opacity-20" />
              <div className="relative">
                <div className="text-xs text-muted-foreground">0{i+1}</div>
                <div className="mt-3 font-display text-lg font-semibold">{c}</div>
                <div className="mt-1 text-xs text-primary opacity-0 transition group-hover:opacity-100">Ver produtos →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onView, onBuy }: { p: Product; onView: (p: Product) => void; onBuy: (p: Product) => void }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition hover:-translate-y-1.5 hover:shadow-soft">
      {p.badge && (
        <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
          p.badge === "Mais vendido" ? "bg-gradient-gold text-gold-foreground" :
          p.badge === "Promoção" ? "bg-primary text-primary-foreground" :
          "bg-foreground text-background"
        }`}>{p.badge}</span>
      )}
      <button aria-label="Favoritar" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/60 backdrop-blur transition hover:text-primary">
        <Heart className="h-4 w-4" />
      </button>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blush via-background to-secondary">
        <img src={p.image} alt={p.name} className="absolute inset-0 m-auto h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
        </div>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">{brl(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{brl(p.oldPrice)}</span>}
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={() => onView(p)} className="flex-1 rounded-full border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5">Ver detalhes</button>
          <button onClick={() => onBuy(p)} className="flex-1 rounded-full bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow">Comprar</button>
        </div>
      </div>
    </article>
  );
}

function Grid({ onView, onBuy, items, id, title, eyebrow }: { onView: (p: Product) => void; onBuy: (p: Product) => void; items: Product[]; id: string; title: string; eyebrow: string }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
          </div>
          <a href="#produtos" className="text-sm font-semibold text-primary hover:underline">Ver tudo →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(p => <ProductCard key={p.id} p={p} onView={onView} onBuy={onBuy} />)}
        </div>
      </div>
    </section>
  );
}

function Featured({ onBuy }: { onBuy: (p: Product) => void }) {
  const p = products[0];
  const benefits = [
    "Sabor morango suave e refrescante",
    "Fórmula em pó de fácil dissolução",
    "Ideal para o seu momento de cuidado diário",
    "Embalagem prática de 225g",
    "Linha premium BHC, beleza por dentro e por fora",
  ];
  return (
    <section className="bg-gradient-to-br from-blush via-background to-secondary py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-80 w-80 rounded-full bg-gradient-primary opacity-15 blur-3xl" />
          </div>
          <img src={p.image} alt={p.name} className="relative mx-auto h-auto w-80 sm:w-[26rem] animate-float drop-shadow-2xl" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Produto em destaque</p>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{p.name}</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            O queridinho da nossa coleção. Um ritual de beleza completo em uma fórmula premium.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map(b => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold">{brl(p.price)}</div>
              {p.oldPrice && <div className="text-xs text-muted-foreground line-through">{brl(p.oldPrice)}</div>}
            </div>
            <button onClick={() => onBuy(p)} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.03] hover:shadow-glow">
              Quero esse agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: Shield, t: "Compra segura", d: "Ambiente protegido e criptografado" },
    { icon: Headphones, t: "Suporte rápido", d: "Atendimento humanizado todos os dias" },
    { icon: Truck, t: "Envio rápido", d: "Despacho em até 24h úteis" },
    { icon: CreditCard, t: "Pagamento facilitado", d: "Pix, boleto e cartão em até 12x" },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold">{t}</div>
            <div className="mt-1 text-xs text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <button onClick={() => setOpen(v => !v)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "Como faço para comprar?", a: "Escolha o produto, clique em Comprar e finalize o checkout em poucos minutos." },
    { q: "Quais formas de pagamento?", a: "Aceitamos Pix, boleto e cartão de crédito em até 12x." },
    { q: "Qual o prazo de envio?", a: "Despachamos em até 24h úteis. A entrega varia conforme a sua região." },
    { q: "Como acompanho meu pedido?", a: "Você recebe o código de rastreio por e-mail e WhatsApp assim que o pedido é postado." },
  ];
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
        </div>
        <div className="mt-10 space-y-3">
          {items.map(i => <FAQItem key={i.q} {...i} />)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="border-t border-border bg-gradient-to-b from-background to-blush/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Beleza, cuidado e confiança em cada detalhe.</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Loja</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navLinks.map(l => <li key={l.href}><a href={l.href} className="hover:text-primary">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Contato</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>contato@bhcbeauty.com</li>
            <li>WhatsApp: (00) 00000-0000</li>
            <li>Seg a Sex, 9h às 18h</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Redes sociais</div>
          <div className="mt-3 flex gap-2">
            {["IG", "TT", "FB"].map(s => (
              <a key={s} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border text-xs font-bold transition hover:border-primary hover:text-primary">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BHC Beauty. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function ProductDrawer({ product, onClose, onBuy }: { product: Product | null; onClose: () => void; onBuy: (p: Product) => void }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[100] flex">
      <div onClick={onClose} className="flex-1 bg-foreground/40 backdrop-blur-sm" />
      <aside className="flex h-full w-full max-w-md flex-col bg-background shadow-glow animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="font-display text-lg font-semibold">Detalhes do produto</div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-foreground/60 hover:bg-secondary"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="aspect-square bg-gradient-to-br from-blush via-background to-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8" />
          </div>
          <div className="space-y-4 p-6">
            {product.badge && <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">{product.badge}</span>}
            <h3 className="font-display text-2xl font-bold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.tagline}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{brl(product.price)}</span>
              {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{brl(product.oldPrice)}</span>}
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              Produto premium da linha BHC. Apresentação cuidadosa, fórmula desenvolvida para ritualizar seu momento de beleza e bem-estar.
            </p>
            <ul className="space-y-2 text-sm">
              {["Embalagem premium", "Linha BHC original", "Garantia da loja"].map(b => (
                <li key={b} className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-primary text-[9px] font-bold text-primary-foreground">✓</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border p-5">
          <button onClick={() => { onBuy(product); onClose(); }} className="w-full rounded-full bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow">
            Adicionar ao carrinho
          </button>
        </div>
      </aside>
    </div>
  );
}

function Cart({ open, onClose, items }: { open: boolean; onClose: () => void; items: Product[] }) {
  if (!open) return null;
  const total = items.reduce((s, p) => s + p.price, 0);
  return (
    <div className="fixed inset-0 z-[100] flex">
      <div onClick={onClose} className="flex-1 bg-foreground/40 backdrop-blur-sm" />
      <aside className="flex h-full w-full max-w-md flex-col bg-background shadow-glow animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="font-display text-lg font-semibold">Seu carrinho</div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-foreground/60 hover:bg-secondary"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="py-20 text-center text-sm text-muted-foreground">Seu carrinho está vazio.</div>
          ) : (
            <ul className="space-y-3">
              {items.map((p, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-border p-3">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-blush to-secondary p-1"><img src={p.image} className="h-full w-full object-contain" alt="" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.tagline}</div>
                    <div className="mt-1 text-sm font-bold">{brl(p.price)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-5">
          <div className="mb-3 flex justify-between text-sm"><span>Total</span><span className="font-bold">{brl(total)}</span></div>
          <button className="w-full rounded-full bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow">Finalizar compra</button>
        </div>
      </aside>
    </div>
  );
}

function Home() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const handleBuy = (p: Product) => { setCart(c => [...c, p]); setCartOpen(true); };
  const bestSellers = products.filter(p => p.badge === "Mais vendido" || p.badge === "Promoção").slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.length} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Categories />
        <Grid id="produtos" eyebrow="Catálogo" title="Nossos produtos" items={products} onView={setSelected} onBuy={handleBuy} />
        <Featured onBuy={handleBuy} />
        <Grid id="mais-vendidos" eyebrow="Top vendas" title="Mais vendidos" items={bestSellers} onView={setSelected} onBuy={handleBuy} />
        <Trust />
        <FAQ />
      </main>
      <Footer />

      <ProductDrawer product={selected} onClose={() => setSelected(null)} onBuy={handleBuy} />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} />

      <a href="#produtos" className="fixed bottom-4 left-4 right-4 z-40 rounded-full bg-gradient-primary py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-glow md:hidden">
        Comprar agora
      </a>
    </div>
  );
}
