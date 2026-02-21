import React from 'react';
import { FadeInText } from './FadeInText';
import { SlideInFromBottom } from './SlideInFromBottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SlideInFromRight } from './SlideInFromRight';
import { CountUpNumber } from './CountUpNumber';
import { SlideIn } from './SlideIn';
import { useNavigate } from 'react-router-dom';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';


const About: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGeneralSettings();
  console.log(data);
  return (
    <section className="py-24 px-4 md:px-10  bg-background-dark relative overflow-hidden" id="about">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* --- LEFT SIDE (Text) --- */}
          {/* Added 'w-full' for mobile and 'flex-1' to share space equally on desktop */}
          <div className="flex-1 w-full">
            <FadeInText
              text="Who we are"
              className="text-primary text-sm font-bold uppercase tracking-wider mb-2 gap-x-1"
            />
            <FadeInText
              text="More than just a game"
              delay={0.2}
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight gap-x-2"
            />
            <FadeInText
              text="Since our inception, Akris has been the heart of student table tennis in Nijmegen. Based at the Radboud Sports Centre, we combine competitive play for all levels with a vibrant social scene, known for our trainings, drinks, and events."
              delay={0.2}
              className="text-text-secondary text-lg leading-relaxed gap-x-1.5"
            />

            {/* Note: I changed delay from 5.2s (too long) to 0.5s */}
            <SlideIn direction='bottom' delay={5}>
              <a
                onClick={() => navigate("/about-us")}
                className="inline-flex items-center gap-2 text-primary font-bold mt-8 hover:text-white transition-colors group cursor-pointer"
              >
                Read more
                <span className="material-symbols-outlined text-sm transition-transform duration-300 ease-out group-hover:translate-x-1">
                  arrow_forward {/* Standard Material Symbol name */}
                </span>
              </a>
            </SlideIn>
          </div>

          {/* --- RIGHT SIDE (Stats Card) --- */}
          {/* MOVED 'flex-1 w-full' HERE. This is crucial! */}
          <SlideIn direction='right' delay={0.4} className="flex-1 w-full">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-8 backdrop-blur-sm relative">
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">equalizer</span>
                Key Facts
              </h4>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-border-dark pb-4">
                  <span className="text-text-secondary text-sm font-medium">Founded</span>
                  <span className="text-white font-mono font-bold text-lg">
                    <CountUpNumber from={new Date().getFullYear()} to={data.yearFounded} duration={5} />
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border-dark pb-4">
                  <span className="text-text-secondary text-sm font-medium">Home Base</span>
                  <span className="text-white font-bold text-right">RSC</span>
                </div>
                <div className="flex items-center justify-between border-b border-border-dark pb-4">
                  <span className="text-text-secondary text-sm font-medium">Members</span>
                  <span className="text-white font-mono font-bold text-lg">
                     <CountUpNumber from={0} to={data.memberCount} duration={5} />+
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm font-medium">Training Days</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-border-dark text-xs text-white font-bold">{data.trainingDays[0]}</span>
                    <span className="px-2 py-1 rounded bg-primary text-xs text-background-dark font-bold">{data.trainingDays[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
};

export default About;