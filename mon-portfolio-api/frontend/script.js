// URL de l'API
const API_URL = 'http://localhost:3000/api';

console.log("✅ script.js chargé !");

// Fonction pour récupérer les campagnes
async function fetchCampaigns() {
    console.log("📡 Récupération des campagnes...");

    try {
        const response = await fetch(`${API_URL}/donation-campaigns`);
        const campaigns = await response.json();

        console.log("📋 Campagnes récupérées :", campaigns); // Vérifier si les données sont reçues

        const campaignList = document.getElementById('campaignList');
        const campaignSelect = document.getElementById('campaignId');

        // Vérifie si les éléments HTML existent
        if (!campaignList || !campaignSelect) {
            console.error("❌ Éléments HTML introuvables !");
            return;
        }

        // Vider la liste avant d'ajouter de nouvelles campagnes
        campaignList.innerHTML = "";
        campaignSelect.innerHTML = "";

        campaigns.forEach(campaign => {
            console.log("➕ Ajout de la campagne :", campaign.title);

            // Ajouter à la liste UL
            const li = document.createElement('li');
            li.textContent = `${campaign.title} - ${campaign.raisedAmount}€ / ${campaign.targetAmount}€`;
            campaignList.appendChild(li);

            // Ajouter au select
            const option = document.createElement('option');
            option.value = campaign._id;
            option.textContent = campaign.title;
            campaignSelect.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Erreur lors du chargement des campagnes :", error);
    }
}

// Fonction pour envoyer un don
async function makeDonation(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const campaignId = document.getElementById('campaignId').value;
    const amount = document.getElementById('amount').value;
    const donorName = document.getElementById('donorName').value;
    const donorEmail = document.getElementById('donorEmail').value;

    const donation = { campaignId, amount, donorName, donorEmail };

    // Validation du montant
    if (amount <= 0) {
        document.getElementById('message').textContent = '❌ Le montant du don doit être positif.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donation),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').textContent = '✅ Votre don a été effectué avec succès !';
            console.log("🎉 Don effectué :", result);
        } else {
            document.getElementById('message').textContent = '❌ Erreur lors du don. Essayez à nouveau.';
        }
    } catch (error) {
        console.error("❌ Erreur lors du don :", error);
        document.getElementById('message').textContent = '❌ Erreur de connexion avec le serveur. Veuillez réessayer plus tard.';
    }
}

// Charger les campagnes au démarrage
fetchCampaigns();

// Écouter la soumission du formulaire
document.getElementById('donation-form').addEventListener('submit', makeDonation);
