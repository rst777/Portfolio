import React from 'react';
import '../styles/AboutPage.css';
import '../styles/Responsive.css';

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-section">
        <h2>À Propos de Nous</h2>
        <div className="content-box">
          <p>
            Bienvenue sur "Un Don Pour Ma Maison". Notre organisation est dédiée à aider les personnes dans le besoin en collectant des dons pour diverses causes essentielles.
          </p>
          <p>
            Notre mission est de faire une réelle différence dans la vie des gens en facilitant les dons et en garantissant que chaque contribution a un impact significatif.
          </p>
          <p>
            Nous croyons fermement en la puissance de la communauté et en la capacité de chacun à apporter un changement positif. Rejoignez-nous dans cette aventure et devenez acteur de notre histoire commune.
          </p>
        </div>
      </section>

      <section className="team-section">
        <h2>Notre Équipe</h2>
        <div className="content-box">
          <p>
            Notre équipe est composée de personnes passionnées et engagées, travaillant sans relâche pour atteindre nos objectifs communs et faire une différence dans la vie des autres.
          </p>
          {/* Vous pouvez ajouter des photos et des descriptions des membres de l'équipe ici */}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contactez-Nous</h2>
        <div className="content-box">
          <p>
            Vous avez des questions ou souhaitez en savoir plus sur notre organisation ? N'hésitez pas à nous contacter, nous sommes à votre écoute.
          </p>
          <p><strong>Email :</strong> contact@undonpourmamaison.com</p>
          <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
