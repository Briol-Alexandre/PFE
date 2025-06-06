# Col&MacArthur - Maintenance : Interface de suivi, de maintenance et d’entretien des montres Col&MacArthur

**Description générale :**
Le site vise à aider la maison horlogère Col&MacArthur à faciliter la gestion des réparations de leurs créations. En fournissant un accès au site à leurs clients, ils peuvent en un endroit voir quel client à besoin d’attention pour une de ses montres. 

L'application vise aussi à aider les propriétaires de leurs montres à mieux gérer leurs entretiens et leurs maintenances. L'entretien régulier des montres est essentiel pour prolonger leur durée de vie et maintenir leur précision. Cette application permettra aux utilisateurs de suivre l'historique des entretiens et réparations, de recevoir des rappels pour les révisions.

### Fonctionnalités principales :

1. **Gestion du profil utilisateur :**
- Un horloger reçois un accès créateur lui permettant de profiter du services.
    - Il peut créer des accès pour ces clients, on ne peut pas se connecter sans accès.
- Personnalisation du profil avec les informations de contact, adresses et préférences de notifications.
1. **Ajout et gestion des montres :**
    - Les horlogers peuvent ajouter plusieurs montres à leur compte en renseignant les détails comme :
        - Modèle ;
        - Type de mouvement (quartz, automatique) ;
        - Les bracelets disponibles pour cette montre ;
        - Les tailles de cadran disponibles ;
        - Photo de la montre.
    - Les utilisateurs peuvent eux ajouter une montre à leur collection en renseignant :
        - La montre en question ;
        - La date d’achat ;
        - La date de fin de garantie (avec une preuve photo du document) ;
        - Le bracelet de leur montre ;
        - La taille du cadran.
2. **Suivi des entretiens et réparations :**
    - L'horloger peut :
        - Ajouter une possibilité de réparation ;
        - Modifier un type de réparation déjà existant ;
        - Supprimer une instance d'une réparation.      
    - L’utilisateur peut demander une réparation / entretien pour l’une de ses montres :
        - Changement de batterie (pour les montres quartz).
        - Révision complète.
        - Nettoyage.
        - Changement de bracelet.
        - Réaiguillage complet
        - Ajustement du mouvement (pour les montres mécaniques).
        - Autres révisions que l'horloger aura ajoutée ;
    - Pour chaque chaque réparation demandées, l’horloger reçoit une notification et peut :
        - Indiquer plusieurs dates possibles à laquelle la révision est possible ;
        - Ainsi qu’un prix en fonction de la garantie ;
        - L’entretien est donc enregistrée dans un calendrier.
    - L’utilisateur peut voir l’état d’avancement de la réparation (`en attente`, `acceptée`, `en cours`, `terminée`, `refusée)` ;
    - L’utilisateur peut refuser la réparation de sa montre en fonction du prix proposé par l’horloger
    - Une fois la réparation acceptée et réalisée, un historique y est gardé dans la page de la montre.
4. **Notifications et rappels :**
    - Dès qu'un changement de statut de la réparation est effectué, un mail est envoyé à la personne concernée ;
5. **Gestion des utilisateurs :**
    - L'horloger peut ajouter un client à son interface ou ajouter un administrateur :
        - Si l'utilisateur ajouté est un client :
            - L'horloger pourra directement lui ajouter une montre à sa collection (utile quand un compte est crée suite à l'achat d'une montre sur leur site ou dans leur showroom).  
