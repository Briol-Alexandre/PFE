export const formatRepairDate = (dateString) => {
    if (!dateString) return 'Non planifiée';
    
    const date = new Date(dateString);
    
    return `Le ${date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })} à ${date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(':', 'h')}`;
};
