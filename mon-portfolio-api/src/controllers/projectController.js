const Project = require('../models/project.model');

// 🔹 Récupérer tous les projets
exports.list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des projets');
  }
};

// 🔹 Ajouter un projet
exports.create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).send('Erreur lors de l\'ajout du projet');
  }
};

// 🔹 Récupérer un projet spécifique
exports.read = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Projet non trouvé');
    res.json(project);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

// 🔹 Mettre à jour un projet
exports.update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).send('Projet non trouvé');
    res.json(project);
  } catch (err) {
    res.status(400).send('Erreur lors de la mise à jour du projet');
  }
};

// 🔹 Supprimer un projet
exports.remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).send('Projet non trouvé');
    res.json({ message: 'Projet supprimé' });
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression');
  }
};
