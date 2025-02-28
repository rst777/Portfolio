const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// définition du modèle contact
const contact = function(contact) {
  this.name = contact.name;
  this.email = contact.email;
  this.message = contact.message;
}

// Créer un nouveau contact
contact.create = (newContact, result) => {
  connection.query("INSERT INTO contact_info SET ?", newContact, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contact: ", { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  }
  );
}

// Trouver un contact par ID
contact.findById = (contactId, result) => {
  connection.query(`SELECT * FROM contact_info WHERE id = ${contactId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contact: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Contact non trouvé avec l'ID
    result({ kind: "not_found" }, null);
  });
}

// Obtenir tous les contacts
contact.getAll = result => {
  connection.query("SELECT * FROM contact_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("contacts: ", res);
    result(null, res);
  });
};

// Mettre à jour un contact par ID
contact.updateById = (id, contact, result) => {
  connection.query(
    "UPDATE contact_info SET name = ?, email = ?, message = ? WHERE id = ?",
    [contact.name, contact.email, contact.message, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Contact non trouvé avec l'ID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contact: ", { id: id, ...contact });
      result(null, { id: id, ...contact });
    }
  );
};

// Supprimer un contact par ID
contact.remove = (id, result) => {
  connection.query("DELETE FROM contact_info WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Contact non trouvé avec l'ID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contact with id: ", id);
    result(null, res);
  });
};

module.exports = contact;

