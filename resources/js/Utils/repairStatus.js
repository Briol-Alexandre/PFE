export const repairStatusTranslations = {
    asked: 'Demandée',
    pending: 'En attente de la validation du devis',
    accepted: 'Acceptée et planifiée',
    modified: 'Devis modifié',
    in_progress: 'En cours de réparation',
    completed: 'Réparation terminée',
    rejected: 'Rejetée'
};

export const repairStatusColors = {
    asked: '#3498db',       // bleu clair
    pending: '#f1c40f',     // jaune
    accepted: '#0080ff',    // bleu
    modified: '#9b59b6',    // violet
    in_progress: '#e67e22', // orange
    completed: '#27ae60',   // vert
    rejected: '#e74c3c'     // rouge
};

export const repairStatusOrder = [
    'asked',
    'pending',
    'accepted',
    'modified',
    'in_progress',
    'completed'
];

export const getRepairStatusInFrench = (status) => {
    return repairStatusTranslations[status] || status;
};

export const getRepairStatusColor = (status) => {
    return repairStatusColors[status] || '#95a5a6'; // gris par défaut
};

export const getRepairProgress = (status) => {
    if (status === 'rejected') {
        return 100;
    }
    const index = repairStatusOrder.indexOf(status);
    if (index === -1) { return 0; }
    return ((index + 1) / repairStatusOrder.length) * 100;
};