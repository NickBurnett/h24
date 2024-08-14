import { useState } from 'react';
import Image from 'next/image';
import MLH_Sticker from '../../public/assets/mlh-2025.png';
import hero from '../../public/assets/hero.png';
import HackUTDTitle from '../../public/assets/HackUTD 2024 Title.png';
import Duck from '../../public/assets/duck.png';
import mascotLifeRing from '../../public/assets/mascot_life_ring.png';
import styles from './HomeHero2.module.css';

export default function HomeHero2() {
  const [isShort, setIsShort] = useState(false);

  return (
    <section
      className={`${styles.container} min-h-screen bg-center relative bg-white flex flex-col-reverse md:flex-col`}
      style={{
        backgroundImage: `url(${hero.src})`,
        backgroundSize: '100% 101%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
      }}
    >
      {/* Top banner */}
      <div className="font-dmSans w-full flex justify-center bg-[#40B7BA] text-white h-[1.75rem] text-nowrap overflow-hidden sm:hidden absolute top-0">
        <p className="text-lg">
          HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24 •
          HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24 • HACKUTD 24
        </p>
      </div>

      <div className="flex-grow flex h-full w-full relative">
        <div className="relative z-10 shrink-0 w-full flex">
          {/* MLH sticker */}
          <div className="absolute top-[1.75rem] sm:top-0 right-4 z-20 transition-all">
            <Image
              src={MLH_Sticker.src}
              height={MLH_Sticker.height}
              width={MLH_Sticker.width / 7}
              alt="MLH sticker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Big welcome */}
          <div className="w-full flex flex-col gap-2 justify-center items-center h-full">
            {/* Duck image */}
            <div
              className="w-30 md:w-40 lg:w-60 mb-4"
              style={{ position: 'absolute', top: '15%', right: '25%' }}
            >
              <Image
                src={Duck.src}
                alt="Duck"
                layout="responsive"
                width={Duck.width}
                height={Duck.height}
              />
            </div>

            {/* Container to manage the positioning of welcome, title, and date */}
            <div
              className="relative flex flex-col items-center gap-2"
              style={{ paddingTop: isShort ? '30vh' : '0' }}
            >
              {!isShort && (
                <p
                  className="font-montserrat text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl"
                  style={{ marginRight: '10rem' }}
                >
                  WELCOME TO
                </p>
              )}

              {/* Title */}
              <div
                className="w-[60vw] md:w-[40vw] lg:w-[30vw]"
                style={{
                  maxWidth: '600px',
                }}
              >
                <Image
                  src={HackUTDTitle.src}
                  alt="HackUTD Title"
                  layout="responsive"
                  width={HackUTDTitle.width}
                  height={HackUTDTitle.height}
                />
              </div>

              {!isShort && (
                <p
                  className="font-montserrat text-[#FFFFFF] text-xl md:text-xl lg:text-2xl"
                  style={{ marginLeft: '10rem' }}
                >
                  Nov 16 - Nov 17
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10vh] left-0 md:left-10 lg:bottom-5 z-20">
        <div className="w-40 md:w-60 lg:w-80">
          <Image
            src={mascotLifeRing.src}
            alt="Mascot Life Ring"
            layout="responsive"
            width={mascotLifeRing.width}
            height={mascotLifeRing.height}
          />
        </div>
      </div>

      {/* Learn More Text and Arrow */}
      <div className="absolute bottom-5 w-full flex flex-col items-center z-20">
        <p className="font-montserrat text-white text-lg md:text-xl">Learn More</p>
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6 md:w-8 md:h-8 mt-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
