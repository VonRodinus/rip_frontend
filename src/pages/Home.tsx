// src/pages/Home.tsx
import './Home.css';

export const Home = () => {
  return (
    <>
      {/* HERO С ИЗОБРАЖЕНИЕМ */}
      <section className="home-hero">
        <img
          src={`${import.meta.env.BASE_URL}assets/main_picture.jpg`}
          alt="Chronus"
          className="home-hero-image"
        />
        <div className="home-hero-overlay">
          <h1 className="home-hero-title">
            Раскройте прошлое<br />вместе с <span className="chronus">Chronus</span>
          </h1>
        </div>
      </section>

      {/* БЕЛЫЙ БЛОК ОПИСАНИЯ */}
      <section className="home-description">
        <div className="home-description-inner">
          <p className="home-description-text">
            Веб-приложение <strong>Chronus</strong>&nbsp;разработано для точного определения времени строительства исторических объектов с помощью археологического метода&nbsp;<em>terminus post quem</em>.
            <br /><br />
            В основе сервиса лежит использование оцифрованных каталогов массовых артефактов — керамики и монет с уже установленными датировками. Пользователь выбирает находки, обнаруженные в фундаменте, а система автоматически анализирует их, определяя самую позднюю дату среди них. Эта дата и становится отправной точкой, указывающей на самый ранний возможный период возведения studied конструкции.
            <br /><br />
            <strong>Chronus</strong>&nbsp;предназначен для исследователей, археологов и реставраторов, предлагая им современный инструмент для формализации и ускорения процесса исторической датировки.
          </p>
        </div>
      </section>
    </>
  );
};