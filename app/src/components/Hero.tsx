type HeroProps = {
  img: string;
  heading1: string;
  paragraph: string;
};
const Hero = ({ img, heading1, paragraph }: HeroProps) => {
  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="hero-overlay bg-black opacity-60"></div>
      <div className="hero-content text-neutral-content text-center px-4">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold font-[Teko]">{heading1}</h1>
          <p className="mb-5 text-lg font-[Roboto]">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
