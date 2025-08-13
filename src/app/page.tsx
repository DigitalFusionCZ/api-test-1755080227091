'use client';

import React, { useState, useEffect } from 'react';

// Prop types for components
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface SkillCardProps {
  icon: string;
  name: string;
}

interface ContactInfoProps {
  icon: string;
  label: string;
  value: string;
  href: string;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => (
  <a href={href} onClick={onClick} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
    {children}
  </a>
);

const SkillCard = ({ icon, name }: SkillCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
    <img src={icon} alt={`${name} icon`} className="h-12 w-12 mb-4 text-indigo-500" />
    <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
  </div>
);

const ContactInfo = ({ icon, label, value, href }: ContactInfoProps) => (
  <a href={href} className="flex items-center p-4 bg-gray-100 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-indigo-50 group">
      <img src={icon} alt={`${label} icon`} className="h-8 w-8 mr-4 text-indigo-600 group-hover:text-indigo-700"/>
      <div>
        <p className="text-sm text-gray-500 group-hover:text-gray-600">{label}</p>
        <p className="font-medium text-gray-900 group-hover:text-indigo-800">{value}</p>
      </div>
  </a>
);

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const companyName = "Jan Novák";
  const pageTitle = "Jan Novák | Web Developer & UI/UX Designer";

  useEffect(() => {
    document.title = pageTitle;

    const faviconSvg = `
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#4f46e5"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32px" font-weight="bold" fill="#ffffff">JN</text>
      </svg>
    `;
    const faviconUrl = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;
    
    let link: HTMLLinkElement | null = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '4rem';

    return () => {
        document.documentElement.style.scrollBehavior = '';
        document.documentElement.style.scrollPaddingTop = '';
    };
  }, [pageTitle]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '#about', label: 'O mně' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-2xl font-bold text-gray-900 tracking-tight">{companyName}</a>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
            </nav>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2" aria-label="Otevřít menu">
              <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/menu-2.svg" alt="Menu" className="h-6 w-6 text-gray-800"/>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'bg-black/60 opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        <div 
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={closeMenu} className="p-2" aria-label="Zavřít menu">
              <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/x.svg" alt="Zavřít" className="h-6 w-6 text-gray-800"/>
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="px-3 py-2 text-lg rounded-md text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <main>
        <section id="home" className="min-h-screen flex items-center pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900">
              <span className="block">Jan Novák</span>
              <span className="block text-indigo-600 mt-2 sm:mt-4">Web Developer</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-600">
              Transformuji myšlenky v poutavé digitální zážitky. Specializuji se na tvorbu rychlých, responzivních a intuitivních webových aplikací.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#contact" className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Kontaktujte mě
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">O mně</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Vášeň pro kód, oko pro design.</p>
            </div>
            <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed space-y-6">
              <p>S odhodláním pro čistý kód a pixel-perfect design vytvářím weby a aplikace, které nejen skvěle vypadají, ale jsou především funkční, rychlé a uživatelsky přívětivé. Mým hlavním cílem je pomáhat firmám a jednotlivcům uspět v digitálním světě prostřednictvím kvalitních a na míru šitých řešení.</p>
              <p>Proces mé práce pokrývá celý životní cyklus projektu – od prvotního nápadu, přes návrh uživatelského rozhraní (UI) a zážitku (UX), až po finální vývoj a nasazení.</p>
            </div>
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Technologie, se kterými pracuji</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                 <SkillCard name="React" icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brand-react.svg" />
                 <SkillCard name="Next.js" icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brand-nextjs.svg" />
                 <SkillCard name="TypeScript" icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brand-typescript.svg" />
                 <SkillCard name="Tailwind CSS" icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brand-tailwind.svg" />
                 <SkillCard name="Figma" icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brand-figma.svg" />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Spojme se</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Máte projekt nebo nápad? Rád si o něm poslechnu. Neváhejte mě kontaktovat.</p>
            </div>
            <div className="max-w-md mx-auto space-y-6">
              <ContactInfo 
                  label="Email"
                  value="jan.novak@priklad.cz"
                  href="mailto:jan.novak@priklad.cz"
                  icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/mail.svg"
              />
              <ContactInfo 
                  label="Telefon"
                  value="+420 123 456 789"
                  href="tel:+420123456789"
                  icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/phone.svg"
              />
              <ContactInfo 
                  label="Lokalita"
                  value="Praha, Česká republika"
                  href="#"
                  icon="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/map-pin.svg"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center">
             <p className="text-sm text-gray-500 mb-2 sm:mb-0">&copy; {new Date().getFullYear()} {companyName}. Všechna práva vyhrazena.</p>
             <p className="text-sm text-gray-500">
                Vytvořeno s láskou od <a href="https://digitalfusion.cz" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">DigitalFusion</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
