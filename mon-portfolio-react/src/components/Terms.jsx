// src/components/Terms.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Terms.css';
import '../styles/Responsive.css';

const Terms = () => {
  return (
  <div className="terms-policy">
    <h1>Conditions Générales d’Utilisation (CGU)</h1>
    <p>Dernière mise à jour : 12 mai 2025</p>
    <h2>1. Préambule</h2>
    <p>
      Les présentes Conditions Générales d’Utilisation (CGU) s’appliquent à tout utilisateur du site Un Don Pour Ma Maison accessible à l’adresse https://undonpourmamaison.fr.
      En naviguant sur ce site, vous acceptez sans réserve les présentes conditions.
    </p>
    <h2>2. Objet du site</h2>
    <p>
      Le site Un Don Pour Ma Maison permet de collecter des dons en ligne pour soutenir des projets de rénovation ou de construction de logements. Le site met en relation des porteurs de projets et des donateurs.
    </p>
    <h2>3. Accès au site</h2>
    <p>
      Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet. Certaines fonctionnalités (création de campagne, don) peuvent nécessiter la création d’un compte.
    </p>
    <h2>4. Inscription</h2>
    <p>
      Pour créer une campagne ou effectuer un don, l’utilisateur doit s’inscrire en fournissant des informations exactes et à jour. L’utilisateur est responsable de la confidentialité de ses identifiants.
    </p>
    <h2>5. Utilisation du site</h2>
    <p>
      L’utilisateur s’engage à utiliser le site dans le respect de la loi et des présentes CGU. Il est interdit de publier des contenus illicites, offensants ou portant atteinte aux droits d’autrui.
    </p>
    <h2>6. Dons</h2>
    <p>
      Les dons effectués sur le site sont définitifs et ne peuvent pas être remboursés, sauf cas particulier prévu par la loi. Le site ne garantit pas la réussite des projets financés.
    </p>
    <h2>7. Propriété intellectuelle</h2>
    <p>
      Tous les contenus présents sur le site (textes, images, logos, etc.) sont protégés par le droit d’auteur. Toute reproduction ou utilisation sans autorisation est interdite.
    </p>
    <h2>8. Données personnelles</h2>
    <p>
      Les données personnelles sont collectées et traitées conformément à la <a href="/privacy-policy">Politique de confidentialité</a> du site et à la réglementation en vigueur (RGPD). Vous disposez d’un droit d’accès, de rectification et de suppression de vos données en contactant : contact@undonpourmamaison.fr.
    </p>
    <h2>9. Responsabilité</h2>
    <p>
      Le site met tout en œuvre pour assurer la fiabilité des informations publiées, mais ne saurait être tenu responsable des erreurs, omissions ou indisponibilités. Le site décline toute responsabilité concernant les contenus publiés par les utilisateurs.
    </p>
    <h2>10. Liens externes</h2>
    <p>
      Le site peut contenir des liens vers d’autres sites. Un Don Pour Ma Maison n’est pas responsable du contenu de ces sites externes.
    </p>
    <h2>11. Modification des CGU</h2>
    <p>
      Le site se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site.
    </p>
    <h2>12. Loi applicable</h2>
    <p>
      Les présentes CGU sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.
    </p>
    <h2>13. Contact</h2>
    <p>
      Pour toute question concernant les CGU, vous pouvez écrire à : contact@undonpourmamaison.fr
    </p>
	{/* Back to home button */}
	<Link to="/" className="back-home-button">Retour à l'accueil</Link>
  </div>
  );
};
export default Terms;
