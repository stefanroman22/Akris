import React from 'react';
import { FOOTER_LINKS } from '@/footer.config';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#050806] pt-16 pb-8 px-6 border-t border-border-dark">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">

              <img src="./images/akris-logo.png" className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">Akris</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              The student table tennis association of Radboud University Nijmegen. Defining spin
              since 1968.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.quickLinks.map(link => (
                <li className="text-text-secondary hover:text-primary text-sm transition-colors cursor-pointer">
                  <a key={link.label} onClick={() => navigate(link.path)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                  location_on
                </span>
                <span className="text-text-secondary text-sm">
                  Heyendaalseweg 141,
                  <br />
                  6525 AJ Nijmegen
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                <a
                  href="mailto:nsttvakris@gmail.com"
                  className="text-text-secondary hover:text-primary text-sm transition-colors"
                >
                  nsttvakris@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/nsttv_akris/"
                target="_blank"
                className="h-10 w-10 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-border-dark pt-8 flex flex-col  md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs self-start">
            © 2026 N.S.T.T.V. Akris. All rights reserved.
          </p>
          {/* Change justify-center and items-center for the vertical stack */}
          <div className="flex flex-col gap-2 justify-center items-center">

            {/* Added text-center here */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent text-xs font-semibold text-center">
              Developed by Stefan Roman
            </div>

            {/* This row handles the icons */}
            <div className="flex items-center gap-3 text-text-secondary text-xs justify-center">
              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/stefan-roman-1911a9211/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-500 transition-colors"
              >
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>

              {/* Email Link */}
              <a
                href="mailto:stefanromanpers@gmail.com"
                className="hover:text-emerald-500 transition-colors"
              >
                <i className="fa-solid fa-envelope text-lg"></i>
              </a>
            </div>
          </div>
          <div className="flex gap-6 self-start">
            <div className="flex flex-col gap-3">
              {/* Row 1: Statutes */}
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-xs">Statutes</span>
                <div className="flex gap-2 items-center">
                  <a
                    href="/docs/Statuten-vertaling.docx.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    EN
                  </a>
                  <span className="text-white/10 text-[10px]">|</span>
                  <a
                    href="/docs/NSTTV-Akris-statuten-officieel - nl.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    NL
                  </a>
                </div>
              </div>

              {/* Row 2: Household Rules */}
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-xs">Household Rules</span>
                <div className="flex gap-2 items-center">
                  <a
                    href="/docs/Huishoudelijk-Reglement-Translated.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    EN
                  </a>
                  <span className="text-white/10 text-[10px]">|</span>
                  <a
                    href="/docs/Huishoudelijk-Reglement_upgedate-op-6-september-2023.docx.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    NL
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-xs">Privacy</span>
                <div className="flex gap-2 items-center">
                  <a
                    href="/docs/Privacy-declaration-AVG_update-16-April-2019.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    EN
                  </a>
                  <span className="text-white/10 text-[10px]">|</span>
                  <a
                    href="/docs/Privacyverklaring-AVG_update-16-april-2019.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    NL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;