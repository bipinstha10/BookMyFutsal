const Footer = () => {
  return (
    <footer
      className="footer hero min-h-[5vh] bg-green-800"
      // style={{
      //   backgroundImage:
      //     "url(https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg)",
      //   backgroundSize: "150%",
      //   backgroundPosition: "left bottom",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="hero-overlay bg-black opacity-60 flex items-center justify-center">
        <div className="hero-content text-neutral-content text-center">
          <p className="text-tiny opacity-100">
            Copyright © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
