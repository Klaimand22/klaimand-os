import { writable } from 'svelte/store';

// Commandes disponibles
export const commands = {
    ls: 'Liste les projets',
    cd: 'Entre dans un projet',
    help: 'Affiche cette aide',
    nano: 'Ouvre un fichier à éditer'
};

// Projets disponibles
export const projects = [
    { name: 'Projet 1', description: 'Ceci est le premier projet', files: ['fichier1.txt', 'fichier2.txt'], path: '/home/clement/projet1' },
    { name: 'Projet 2', description: 'Ceci est le deuxième projet', files: ['document.md', 'readme.txt'], path: '/home/clement/projet2' },
    { name: 'Projet 3', description: 'Ceci est le troisième projet', files: ['notes.txt', 'todo.txt'], path: '/home/clement/projet3' }
];

// Variables d'état
export const terminal = writable([]);  // Contenu du terminal
export const content = writable({});   // Contenu du projet actuel
export const currentDirectory = writable('/home/clement');  // Dossier de départ
export const currentPath = writable('/home/clement');      // Chemin courant dans le fil d'Ariane

// Fonction pour gérer les commandes
// Gestion des commandes
export const handleCommand = (event) => {
    if (event.key === 'Enter') {
        const input = event.target.value.trim().toLowerCase();
        event.target.value = ''; // Efface l'entrée

        if (input === 'ls') {
            terminal.update((lines) => [
                ...lines,
                'Liste des projets :',
                ...projects.map((p) => `${p.name}: ${p.description}`)
            ]);

        } else if (input.startsWith('cd ')) {
            const projectName = input.slice(3).trim();
            const project = projects.find((p) => p.name.toLowerCase() === projectName);
            if (project) {
                content.set(project);
                currentDirectory.set(`/home/clement/${projectName}`);
                currentPath.set(`/home/clement/${projectName}`);  // Mise à jour du fil d'Ariane
                terminal.update((lines) => [
                    ...lines,
                    `Vous êtes maintenant dans ${projectName}.`
                ]);
            } else {
                if (projectName === '..') {
                    terminal.update((lines) => [
                        ...lines,
                        'Retour au dossier parent...'
                    ]);
                    content.set({});
                    currentDirectory.set('/home/clement');
                    currentPath.set('/home/clement');  // Mise à jour du fil d'Ariane
                } else {
                    terminal.update((lines) => [
                        ...lines,
                        `Projet introuvable: ${projectName}`
                    ]);
                }
            }
        } else if (input.startsWith('nano ')) {
            const fileName = input.slice(5).trim();
            const project = $content;
            if (project.files.includes(fileName)) {
                terminal.update((lines) => [
                    ...lines,
                    `Ouverture du fichier ${fileName} avec nano...`
                ]);
                // Simule l'affichage du fichier
                content.set({ ...project, fileToEdit: fileName });
            } else {
                terminal.update((lines) => [
                    ...lines,
                    `Fichier ${fileName} introuvable.`
                ]);
            }
        } else if (input === 'help') {
            terminal.update((lines) => [
                ...lines,
                'Commandes disponibles :',
                `ls  - ${commands.ls}`,
                `cd <nom_du_projet>  - ${commands.cd}`,
                `nano <nom_du_fichier>  - ${commands.nano}`,
                `help  - ${commands.help}`
            ]);
        } else {
            terminal.update((lines) => [
                ...lines,
                `Commande inconnue: ${input}`
            ]);
        }
    }
};


// Message de bienvenue
terminal.update((lines) => [
    ...lines,
    '-----------------------------------------',
    '# Bienvenue dans Klaimand-os             #',
    '----------------------------------------',
    'Le système d\'exploitation de Clément,',
    'où vous pouvez naviguer dans ses projets.',
    '',
    'Tapez "help" pour afficher les commandes disponibles.'
]);
