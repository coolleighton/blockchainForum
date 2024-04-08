import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="bg-black w-[100vw] px-10 pt-10 flex flex-col sm:flex-row justify-between">
      <div>
        <img src={logo} alt="logo" className="h-12 mb-8"></img>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="mr-12 md:mr-20 mb-8">
          <p className="text-white bold mb-8">CREATOR</p>
          <a href="https://leightonjcoughlin.netlify.app/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              PORTFOLIO
            </p>
          </a>
          <a href="https://leightonjcoughlin.netlify.app/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              GITHUB
            </p>
          </a>
        </div>
        <div className="mr-12 md:mr-20 mb-8">
          <p className="text-white bold mb-8">OTHER PROJECTS</p>
          <a href="https://gameify-game-library.netlify.app/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              GAMEIFY
            </p>
          </a>
          <a href="https://leightonslibrary.netlify.app/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              BOOK LIBRARY
            </p>
          </a>
          <a href="https://leightonjcoughlin.netlify.app/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              PERSONAL WEBSITE
            </p>
          </a>
        </div>
        <div className="mb-8">
          <p className="text-white bold mr-12 md:mr-20 mb-8">ATTRIBUTION</p>
          <a href="https://forum.squarespace.com/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              DESIGN INSPIRATION
            </p>
          </a>
          <a href="https://react.dev/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              REACT
            </p>
          </a>
          <a href="https://tailwindcss.com/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              TAILWIND
            </p>
          </a>
          <a href="https://nodejs.org/en">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              NODEJS
            </p>
          </a>
          <a href="https://expressjs.com/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              EXPRESSJS
            </p>
          </a>
          <a href="https://www.mongodb.com/">
            <p className="text-gray-400 bold mb-2 hover:text-white duration-150">
              MONGODB
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
