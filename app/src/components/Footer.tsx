const Footer = () => {
  return (
    <footer className="footer mt-50 bg-gradient-to-b from-[#0C0C0C] to-green-800 flex flex-col items-center justify-center px-6 md:px-20 md:py-5">
      <div className="flex flex-col md:flex-row justify-between w-full md:h-[10vw] leading-8 mt-10">
        <div className="h-full flex flex-col">
          <h1 className="font-[Teko] text-2xl md:text-4xl">BookMyFutsal</h1>
          <p className="md:text-lg">Let’s connect with our socials</p>
          <div className="socials flex gap-5 text-2xl ">
            <a href="" className="hover:text-[#419a9d]">
              <i className="ri-facebook-box-fill"></i>
            </a>
            <a href="" className="hover:text-[#419a9d]">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href="" className="hover:text-[#419a9d]">
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </div>
        </div>
        <div className="h-full my-5 md:my-0">
          <h1 className="font-bold text-lg">COMPANY</h1>
          <ul className="cursor-pointer">
            <li className="hover:text-[#419A9D]">About us</li>
            <li className="hover:text-[#419A9D]">Privacy Policy</li>
            <li className="hover:text-[#419A9D]">Terms & Conditions</li>
          </ul>
        </div>
        <div className="h-full">
          <h1 className="font-bold text-lg">Get in Touch</h1>
          <ul className="cursor-pointer">
            <li className="hover:text-[#419A9D]">
              <a href="">hello@bookmyfutsal.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom text-neutral-content text-center">
        <p className="text-md opacity-100">Copyright © {new Date().getFullYear()}</p>
        <p className="text-md opacity-100">All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
