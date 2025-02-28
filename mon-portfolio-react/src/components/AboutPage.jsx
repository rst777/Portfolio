import React from 'react';
import '../styles/AboutPage.css';
const AboutPage = () => {
  return (
    <main>
      <section className="about">
        <h2>À Propos de Nous</h2>
        <p>
          Bienvenue sur notre site "Un Don Pour Ma Maison". Nous sommes une organisation dédiée à aider les personnes dans le besoin en collectant des dons pour diverses causes importantes.
        </p>
        <p>
          Notre mission est de faire une différence dans la vie des gens en facilitant les dons et en assurant que chaque contribution a un impact significatif.
        </p>
        <p>
          Nous croyons en la puissance de la communauté et en la capacité de chacun à apporter un changement positif. Rejoignez-nous dans cette aventure et faites partie de notre histoire.
        </p>
      </section>

      <section className="team">
        <h2>Notre Équipe</h2>
        <p>
          Notre équipe est composée de personnes passionnées et engagées, travaillant sans relâche pour atteindre nos objectifs communs.
        </p>
        {/* Vous pouvez ajouter des photos et des descriptions des membres de l'équipe ici */}
      </section>

      <section className="contact">
        <h2>Contactez-Nous</h2>
        <p>
          Si vous avez des questions ou souhaitez en savoir plus sur notre organisation, n'hésitez pas à nous contacter.
        </p>
        <p>Email : contact@undonpourmamaison.com</p>
        <p>Téléphone : +33 1 23 45 67 89</p>
      </section>
    </main>
  );
};

export default AboutPage;
