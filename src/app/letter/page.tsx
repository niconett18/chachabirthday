import { HandwrittenScroll } from '../../components/HandwrittenScroll';

const letterContent = [
  "Dear Chacha,",
  "",
  "Happy 19th birthday sayanggg semoga panjang umur, sehat terusss, terus making seneng sama i hehe",
  "",
  "thankyou uda mau jadi pacar yang baik buat i, i sayang banget sama u.",
  "",
  "semoga yang u semogakan tahun ini terwujud semuaa yaahhhhhh i loveyouuuu.",
  "",
  "Love,",
  "— coleta."
];

export default function LetterPage() {
  return (
    <main className="min-h-dvh bg-[linear-gradient(135deg,#FFF5FA,#FFE3F0)] py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[420px] px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#37243B] mb-4 leading-tight text-balance">
            A Letter for You
          </h1>
          <p className="text-base sm:text-lg text-[#37243B]/70">
            Written with all my love
          </p>
        </div>

        <HandwrittenScroll content={letterContent} />

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-[#37243B]/70 mb-6 sm:mb-8 leading-relaxed">
            &ldquo;With you, ordinary days feel like celebrations.&rdquo;
          </p>
          <a 
            href="/surprise"
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-[#FF66A3] text-white text-base font-medium shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF9EC7] focus:ring-offset-2 inline-flex items-center justify-center"
          >
            See Your Surprise
          </a>
        </div>
      </div>
    </main>
  );
}