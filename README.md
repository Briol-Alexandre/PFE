# PFE

### Application de suivi de maintenance et d’entretien des montres

**Description générale :**

L'application vise à aider les propriétaires de montres (de luxe ou standards) à mieux gérer l'entretien et la maintenance de leurs garde-temps. L'entretien régulier des montres est essentiel pour prolonger leur durée de vie et maintenir leur précision. Cette application permettra aux utilisateurs de suivre l'historique des entretiens et réparations, de recevoir des rappels pour les révisions et d'accéder à des services de réparation près de chez eux.

### Fonctionnalités principales :

1. **Gestion du profil utilisateur :**
    - Les utilisateurs doivent créer un compte où ils peuvent enregistrer et suivre leurs différentes montres.
    - Possibilité de se connecter via Google ou un simple e-mail/mot de passe.
    - Personnalisation du profil avec les informations de contact, adresses préférées, et préférences de notifications.
2. **Ajout et gestion des montres :**
    - Les utilisateurs peuvent ajouter plusieurs montres à leur compte en renseignant les détails comme :
        - Marque
        - Modèle
        - Numéro de série
        - Type de mouvement (mécanique, quartz, automatique)
        - Date d’achat
        - Garantie (et durée restante)
        - Preuves d’achat ou documents scannés (optionnel)
    - Photo de la montre pour un suivi visuel.
3. **Suivi des entretiens et réparations :**
    - L’utilisateur peut enregistrer chaque événement de maintenance :
        - Changement de batterie.
        - Révision complète.
        - Nettoyage.
        - Changement de bracelet.
        - Ajustement du mouvement (pour les montres mécaniques).
    - Pour chaque événement, l’utilisateur pourra indiquer la date de l’entretien, la prestation effectuée, et l’horloger qui a effectué le service + ajout dans le calendrier.
    - Téléchargement des factures ou des reçus pour chaque intervention.
    - Historique de maintenance affiché sous forme de timeline.
4. **Notifications et rappels :**
    - En fonction des intervalles de temps définis par les marques ou les utilisateurs, l’application envoie des rappels pour :
        - Les révisions régulières (tous les 3 à 5 ans par exemple).
        - Les changements de batterie (tous les 2 à 3 ans).
        - Les nettoyages ou entretiens divers.
    - Notifications personnalisées : L’utilisateur peut choisir de recevoir les notifications via e-mail ou notifications push.
5. **Localisation des horlogers :**
    - Une carte intégrée permettra de localiser les horlogers ou réparateurs agréés les plus proches. Les utilisateurs pourront filtrer les résultats en fonction des services offerts, ou lister les horlogerie des marques des montres que l’utilisateur possède (réparation de mouvements mécaniques, changement de piles, etc.).
    - Intégration avec Google Maps ou une API de géolocalisation pour fournir des itinéraires et des informations détaillées sur les horlogers.
6. **Gestion des garanties :**
    - L’application permet de suivre la durée de validité de la garantie de chaque montre. Un rappel est envoyé avant l'expiration de la garantie.
    - Possibilité d'enregistrer les contrats de garantie en ligne (sous forme de documents PDF ou images).
7. **Section éducative :**
    - Tutoriels sur l’entretien des montres : vidéos et articles sur le nettoyage des bracelets, la protection contre l'eau, la manière de remonter une montre mécanique, etc.
    - Conseils sur la manière de stocker correctement les montres pour les préserver.
8. **Intégration avec des services de réparation :**
    - Possibilité de réserver directement des services d’entretien via l’application, avec des horlogers partenaires (redirection vers site de SAV).

### Technologies à utiliser :

- **Frontend :**
    - Vue.js ou React pour créer une interface utilisateur interactive et réactive.
    - Intégration de Google Maps API ou autre service de géolocalisation pour la localisation des horlogers.
    - Notifications push via Firebase ou une autre solution pour les rappels de maintenance.
- **Backend :**
    - Laravel pour gérer la logique serveur, les utilisateurs, les montres enregistrées, et l’historique des entretiens.
    - Base de données relationnelle (MySQL ou PostgreSQL) pour stocker les informations sur les utilisateurs, montres, réparations, et horlogers.
- **Fonctionnalités supplémentaires potentielles :**
    - **Module de statistiques :** Pour visualiser des statistiques telles que la fréquence des révisions, le coût total des réparations sur une certaine période, ou encore le nombre d’utilisations avant une intervention technique.
