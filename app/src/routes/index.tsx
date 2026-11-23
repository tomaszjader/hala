import { t, isEnglish } from "@/i18n";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Mountain, Wind, Menu, X } from "lucide-react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { assetUrl } from "@/assets";
import "./index.css";



// Keep scene identity stable and let the existing chapter pin the CTA with copy.
const landingScenes = scrollScrubScenes.map(scene => ({
  ...scene,
  actions: <a className="hero-cta" href="#o-zawodzie">{t("Odkryj tę drogę")} <ArrowDownRight size={21}/></a>,
}));

function Brand() {
  return <a className="brand" href="#start" aria-label={t("Hala. Strona główna")}><span className="brand-icon"><Mountain size={24} strokeWidth={1.6}/></span><span>HALA<span className="brand-dot">.</span></span></a>;
}
function PastureFilm() {
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    let target = 0;
    let current = 0;
    const measure = () => {
      const rect = frame.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      target = Math.max(0, Math.min(1, -rect.top / distance));
    };
    const tick = () => {
      current += (target - current) * 0.16;
      if (video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0 && !video.seeking) {
        const seconds = Math.min(video.duration - 0.03, current * video.duration);
        if (Math.abs(video.currentTime - seconds) > 0.04) {
          try { video.currentTime = seconds; } catch { /* older browsers keep the poster */ }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const prime = () => {
      if (video.paused) {
        const promise = video.play();
        promise?.then(() => video.pause()).catch(() => {});
      }
    };
    measure();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("touchstart", prime);
    };
  }, []);
  return <section className="film-journey" ref={frameRef} aria-label={t("Film o życiu na tatrzańskiej hali")}>
    <div className="film-journey-stage" style={{ "--film-poster": `url("${assetUrl("assets/world/pasture-film-poster.jpg")}")` } as CSSProperties}>
      <video ref={videoRef} muted playsInline preload="auto" poster={assetUrl("assets/world/pasture-film-poster.jpg")} aria-hidden="true">
        <source src={assetUrl("assets/world/pasture-film.mp4")} type="video/mp4"/>
      </video>
      <div className="film-journey-shade"/>
      <div className="film-journey-copy">
        <span>{t("POCZUJ TĘ PRZESTRZEŃ")}</span>
        <h2>{t("Każdy krok")}<br/>{t("bliżej ")}<em>{t("natury.")}</em></h2>
      </div>
      <span className="film-journey-caption">{t("Lato na hali. W rytmie stada.")}</span>
    </div>
  </section>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const [prepared,setPrepared] = useState(false);
  const composeMessage = () => {
    if (!name.trim()) {setError(t("Podaj imię, aby przygotować wiadomość."));return;}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {setError(t("Podaj poprawny adres e-mail."));return;}
    setError("");
    setPrepared(true);
    const subject = encodeURIComponent(t("Zainteresowanie pasterstwem w Tatrach"));
    const body = encodeURIComponent(isEnglish ? `Hello,\n\nMy name is ${name.trim()} and I am interested in shepherding in the Tatras.\nMy email: ${email.trim()}\n\n${message.trim()}\n\nPlease send me information about opportunities to learn about a shepherd’s work.` : `Dzień dobry,\n\nMam na imię ${name.trim()} i interesuje mnie pasterstwo w Tatrach.\nMój e-mail: ${email.trim()}\n\n${message.trim()}\n\nProszę o informacje o możliwości poznania pracy pasterza.`);
    if(typeof window !== "undefined") window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  return <main id="start" className="hala-site">
    <header className="site-nav"><Brand/><nav className={menuOpen?"nav-links nav-open":"nav-links"} aria-label={t("Nawigacja główna")}><a onClick={()=>setMenuOpen(false)} href="#o-zawodzie">{t("O zawodzie")}</a><a onClick={()=>setMenuOpen(false)} href="#codziennosc">{t("Codzienność")}</a><a onClick={()=>setMenuOpen(false)} href="#droga">{t("Jak zacząć")}</a></nav><a className="nav-contact" href="#dolacz">{t("Dołącz do nas")} <ArrowUpRight size={17}/></a><button className="mobile-toggle" aria-label={menuOpen?t("Zamknij menu"):t("Otwórz menu")} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></header>
    <div className="hero-journey">
      <ScrollScrub scenes={landingScenes} theme={scrollScrubTheme}/>
      <span className="hero-side-note">{t("TATRY / PODHALE / TRADYCJA")}</span>
    </div>
    <section id="o-zawodzie" className="intro-section section-wrap">
      <div className="intro-index"><span className="dot-mark">✳</span> {t("Więcej niż praca")}</div>
      <div className="intro-content"><h2>{t("Nie każdy dzień musi wyglądać ")}<em>{t("tak samo.")}</em></h2><p>{t("Poranki z widokiem na szczyty. Stado, które znasz po głosie. Wiedza przekazywana przez pokolenia. Pasterstwo to życie bliżej tego, co naprawdę ważne.")}</p><a className="text-link" href="#codziennosc">{t("Zobacz, jak wygląda dzień")} <ArrowUpRight size={20}/></a></div>
    </section>
    <section id="codziennosc" className="life-section">
      <div className="life-photo"><img src={assetUrl("assets/photography/shepherd.webp")} alt={t("Ilustracyjny kadr pasterza w stroju podhalańskim przy owcach na słonecznej letniej hali")} loading="lazy"/><div className="photo-label">{t("01 / CODZIENNOŚĆ NA HALI")}</div></div>
      <div className="life-panel"><span className="tiny-title">{t("TWÓJ NOWY RYTM")}</span><h2>{t("Życie, które czuć wszystkimi zmysłami.")}</h2><p>{t("Świeże powietrze o świcie, dźwięk dzwonków, smak tradycji. Każdy dzień stawia nowe wyzwania i daje coś, czego nie znajdziesz za biurkiem.")}</p><div className="life-points"><div><Wind size={25}/><span>{t("Praca na świeżym powietrzu")}</span></div><div><Mountain size={25}/><span>{t("Bliskość gór i przyrody")}</span></div><div><Check size={25}/><span>{t("Rzemiosło z pokolenia na pokolenie")}</span></div></div></div>
    </section>
    <section className="quote-section"><div className="quote-insignia">✳</div><p>{t("Tu rytm dnia")}<br/>{t("wyznacza ")}<em>{t("stado.")}</em></p><span>{t("WYPAS. OPIEKA. CODZIENNA OBECNOŚĆ.")}</span></section>
    <PastureFilm/>
    <section id="droga" className="steps-section section-wrap"><div className="steps-heading"><span className="tiny-title">{t("OD CIEKAWOŚCI DO PIERWSZEJ HALI")}</span><h2>{t("Każda przygoda ma swój początek.")}</h2><p>{t("Nie musisz znać wszystkich tajników wypasu. Najważniejsze są ciekawość, szacunek do zwierząt i gotowość do nauki.")}</p></div><div className="steps-list"><div className="step"><span>01</span><div><h3>{t("Odkryj pasterstwo")}</h3><p>{t("Poznaj rytm sezonu, górskie zwyczaje i realia codziennej pracy.")}</p></div><ArrowUpRight/></div><div className="step"><span>02</span><div><h3>{t("Porozmawiaj z praktykami")}</h3><p>{t("Zapytaj o wymagania, doświadczenie i możliwości przyuczenia.")}</p></div><ArrowUpRight/></div><div className="step"><span>03</span><div><h3>{t("Postaw pierwszy krok")}</h3><p>{t("Poszukaj sezonowej okazji do nauki u doświadczonego bacy.")}</p></div><ArrowUpRight/></div></div></section>
    <section id="dolacz" className="join-section"><div className="join-visual"><img src={assetUrl("assets/photography/join-summer-2b19a1fa.webp")} alt={t("Ilustracyjny widok słonecznej letniej hali ze ścieżką, owcami i drewnianą bacówką")} loading="lazy"/><span className="photo-credit">{t("Lato na Podhalu / wizualizacja")}</span><span>{t("HALA. / BLISKO TEGO, CO WAŻNE")}</span></div><div className="join-content"><span className="tiny-title">{t("MOŻE TO TWOJA DROGA?")}</span><h2>{t("Góry czekają.")}<br/><em>{t("A Ty?")}</em></h2><p>{t("Przygotuj wiadomość wyrażającą zainteresowanie pasterstwem. Otworzymy ją w Twoim programie pocztowym.")}</p><form onSubmit={e=>{e.preventDefault();composeMessage()}} noValidate><label htmlFor="name">{t("Twoje imię")}</label><input id="name" autoComplete="given-name" placeholder={t("Jak masz na imię?")} value={name} onChange={e=>setName(e.target.value)}/><label htmlFor="email">{t("Adres e-mail")}</label><input id="email" type="email" autoComplete="email" placeholder={t("twoj@email.pl")} value={email} onChange={e=>setEmail(e.target.value)}/><label htmlFor="message">{t("Kilka słów o sobie")} <span>{t("(opcjonalnie)")}</span></label><textarea id="message" placeholder={t("Co przyciąga Cię do życia w górach?")} rows={3} value={message} onChange={e=>setMessage(e.target.value)}/>{error&&<p className="form-error" role="alert">{error}</p>}<button className="submit-button" type="submit">{prepared?t("Otwórz ponownie e-mail"):t("Przygotuj wiadomość")} <ArrowUpRight size={20}/></button><p className="form-note">{prepared?t("Wiadomość została przygotowana w programie pocztowym. Wybierz odbiorcę i wyślij ją samodzielnie."):t("To demonstracyjna strona informacyjna, nie oficjalna rekrutacja. Nie zapisujemy Twoich danych.")}</p></form></div></section>
    <footer><Brand/><div><span>{t("Góry. Owce. Tradycja.")}</span><small>{t("Projekt koncepcyjny. Wizualizacje i filmy AI. © ")}{new Date().getFullYear()} HALA.</small></div><a href="#start">{t("Powrót na górę")} <ArrowRight size={17}/></a></footer>
  </main>
}
