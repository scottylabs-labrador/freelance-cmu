import { TiHeart } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="fixed left-0 right-0 bg-blue-200 border-b border-black">
      <div className="flex flex-row justify-end items-center pb-2 pt-2">
        <h1 className="text px-1">
          made w my husband chatgpt and my divorced wife notebooklm
        </h1>
        <TiHeart></TiHeart>
      </div>
    </footer>
  );
};

export default Footer;
