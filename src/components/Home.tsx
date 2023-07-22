import image from "../assets/undraw_welcoming_re_x0qo.svg";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="logo-box">
          <img src={image} className="logo" alt="logo" />
        </div>

        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">TEXT</span>
            <span className="heading-primary-sub">Some Text</span>
          </h1>

          <a href="#section-tours" className="btn btn-white btn-animated">
            Discover our products
          </a>
        </div>
      </header>
    </>
  );
};

export default Home;
