import React from 'react';
import { SocialImage } from '../types';
import { useState, useEffect } from 'react';
import "./SocialGallery.css";
import { SlideInFromTop } from './SlideInFromTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { getInstagramFeed } from '@/getData/getInstagramFeed';
import { useData } from '@/context/DataContext';
import { SlideIn } from './SlideIn';

const images: SocialImage[] = [
  {
    id: '2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcoMHTYrDR1AawoW7B8UDofw6bVmBvsMT9ylfCLECwz4siRCGhNzCiBK5ODYc_NW7hSsxGkZH7vsApFy0vH4Mi4KYZ824YRgpPKXmt3__yvRCEqniXnEEscUoRTOzRmaElUn15YreSreyF_mnpCQTj5H8IhGNcItjSMMZk7UnCHzFbFe-MnhSeZTLpGxB3dnTxwd_e-C-NeY67o1WOJg6A1UyopZAnd-4uFPs_R1N8pDeY-n2QRIF8JVGfhQ9Yc01bJ-qYTLP5hf1x',
    alt: 'Social drinks',
  },
  {
    id: '3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1Pds5i49WoGEHvn6TnxDuNnsQcvwGRD8v7iPjGxL9CL9SNlotgVKdcX5rmIn_sf61dt9YbrR7PwIm4HWoQ18DfD5mwULJQ8BCCwGG78lw_1_c-qu35AcYPDXMcYfhDaLgkziFHzvq2PR8aFXPXOtWZbC6xKbgGd6Pi0WTb-zLcnQodXWrlnXzn16q2Y_uBj_YJIPx3AqxAxWZoKnXF-eNLUDO1smRXFbDsM97ebJETnJs2xGgY7UFoSMyj0705zZdrWofs5GN7K1',
    alt: 'Action shot',
    isLarge: true,
  },
  {
    id: '4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3zQ0XM2e4Q8NOm-w91IXEvFcJwkr8DrfQUYppdO745_4p24DA_7Rm8g_i2l-nwxq5xxBtn8PsElxU-XnWVHxjGsfy5QYUFEfgvYeTB1xUggukWKc4e1kTobb2T-8uS80tAswoCJZrECkWHq6kh4-53Yj_Si1O3CuYr_1qfg7bL3JwwW93X7J6gn68qz3p3c__PnZH9YDlmp90-Sode5RkXcP8p_AeZYB-7eHiPCExB4ywJ_Hvzg9J6kvUYI5JGknbXSH1EW07QGM0',
    alt: 'Equipment close up',
  },
  {
    id: '5',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43FmgyOitKmYaD-gAB8iXMTEpUqhL9-hkMoyjxmQhdOVjFRJ9TQ3Uw9PQCAKJuV9mWgrRE1NuWbCSq8yRxqcyPRkdCWosKWJizzb-OlgrJDX2L6GvTI_y6ev4hiNWt9iKT2nFmkXbl-N-1s-Wdhc9PUBk5eQ8pmVocfiGOr0bNt4hy1jrTNs9hLpMlCZRtj5Sri0DddUIj_8QnuGkUeeaGVcyPK1MmEu6fFg7UgU25qQErexAbJv3cWpwZvCIWTEVSturuMetJagg',
    alt: 'Students laughing',
  },
  {
    id: '6',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPGrg6OATeRv9_FIyS55iOR3hRTBilnw80_CS97tCJQgRYUecYMXKR1OiZSXLNZnMhmLNCkMY6Iye0JUzhdaEfmxZjIP44frXjQ5dW15cif_UWx_m_YTGae0QFqausZ4PtlmQbQHsnfALtGBT5bF14KrIJal5deQlG-FDQb9JSDO-5XPE3C2pVtDKkK1bdkZs5748vL_2u6bnVGsXKAtMcFDiFzzarx48v1KyM-Jbu_8Hr1Kk4UtmJ4X4smallvc1USIXoEIu1uA-C',
    alt: 'Logo shirt',
  },

];

const INSTAGRAM_FEED_URL = "https://feeds.behold.so/nffzdaP5NgoNlxst8seZ";

const SocialGallery: React.FC = () => {
  const { instagramPosts, setInstagramPosts } = useData();
  // Initialize loading as false if we already have posts in Context
  const [loading, setLoading] = useState(!instagramPosts);

  useEffect(() => {
    // Only fetch if context is empty
    if (!instagramPosts) {
      const fetchPosts = async () => {
        setLoading(true);
        const data = await getInstagramFeed(INSTAGRAM_FEED_URL);
        setInstagramPosts(data);
        setLoading(false);
      };
      fetchPosts();
    }
  }, [instagramPosts, setInstagramPosts]);

  if (loading) {
    return <div className="text-center text-white py-10">Loading feed...</div>;
  }
  return (
    <section className="py-24 px-4 md:px-10 bg-[#0e1210]">
      <div className="mx-auto max-w-[1200px]">
        <div className="header-social flex items-end mb-10 gap-4 ">
          <SlideIn delay={0.2}>
            <div className="text-container flex flex-col align-center justify-center">
              <h2 className="akris-social-heading text-3xl md:text-4xl font-bold text-white text-left">Akris Social</h2>
              <p className="text-text-secondary mt-2 text-left">
                Catch the latest highlights and social events.
              </p>
            </div>
          </SlideIn>
          <SlideIn delay={0.4}>
            <a className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-background-dark transition-all self-center cursor-pointer" href="https://www.instagram.com/nsttv_akris/" target="_blank">

              <span className="material-symbols-outlined text-lg">add_a_photo</span>
              Follow on Instagram

            </a>
          </SlideIn>
        </div>

        <div className="flex flex-wrap gap-4">
          {instagramPosts.map((img, index) => (
            <SlideIn
              key={img.id}
              delay={0.2 + index * 0.2}
              // MOVED: The layout classes must live on the wrapper!
              className={`
        relative rounded-xl overflow-hidden group 
        aspect-square shrink-0 grow-0
        w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]
        cursor-pointer
      `}
            >
              <a
                href={img.link}// Add your link here
                target="_blank"
                rel="noopener noreferrer"
                // The <a> tag now effectively just needs to fill the wrapper
                className="block w-full h-full"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${img.image}")` }}
                />

                <div
                  className="
    absolute bottom-4 left-4
    text-green-500
    opacity-0 translate-y-2
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-300
  "
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </div>

                {/* Green Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

                {/* Icon */}
                {img.hasOverlayIcon && (
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="material-symbols-outlined text-white drop-shadow-md z-10">
                      open_in_new
                    </span>
                  </div>
                )}
              </a>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;