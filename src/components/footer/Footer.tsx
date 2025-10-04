import { TiHeart } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="fixed left-0 right-0 bg-blue-200 border-b border-black">
      <div className="flex flex-row justify-end items-center pb-2 pt-2 px-4">
        <h1 className="text px-1">
          made by daniel park • mirabelle feng • sai pendekanti • elisha
          rahardja • lili trinh
        </h1>
        <TiHeart></TiHeart>
      </div>
    </footer>
  );
};

export default Footer;
