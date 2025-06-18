<?php

return [
    'required' => 'Le champ :attribute est obligatoire.',
    'string' => 'Le champ :attribute doit être une chaîne de caractères.',
    'email' => 'Le champ :attribute doit être une adresse email valide.',
    'max' => [
        'string' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        'file' => 'Le fichier :attribute ne doit pas dépasser :max kilo-octets.',
    ],
    'unique' => 'Cette valeur de :attribute est déjà utilisée.',
    'confirmed' => 'La confirmation du :attribute ne correspond pas.',
    'min' => [
        'string' => 'Le champ :attribute doit contenir au moins :min caractères.',
    ],
    'lowercase' => 'Le champ :attribute doit être en minuscules.',

    'attributes' => [
        'name' => 'nom',
        'first_name' => 'prénom',
        'email' => 'email',
        'password' => 'mot de passe',
        'remember' => 'se souvenir de moi',
    ],
];
