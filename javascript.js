//** Variables Globales **//
var canvas = document.getElementById("canvas"); // Localisation du canvas
canvas.height = 400; // Hauteur du canvas
canvas.width = 1000; // Largeur du canvas
var context = canvas.getContext("2d"); // Context du canvas
var Interval_Unite_X = 1; // Interval des unités de la grille sur l'axe horizontal
var Interval_Unite_Y = 10; // Interval des unités de la grille sur l'axe vertical
var Val_max_X; // Valeur maximale sur l'axe X
var Val_min_X = -1; // Valeur minimale sur l'axe X
var Nb_colonnes; // Nombre de colonnes
var Val_max_Y; // Valeur maximale sur l'axe Y
var Val_min_Y = -1; // Valeur minimale sur l'axe Y
var Nb_lignes; // Nombre de lignes
var Espace_haut_canvas = 5; // Espace en haut du graphique
var Espace_bas_canvas = 10; // Espace en bas du graphique
var Espace_gauche_canvas = 20; // Espace à gauche du graphique
var Espace_droite_canvas = 15; // Espace à droite du graphique
var Marge_unites_X = 3; // Marge entre les unités de mesures et la grille sur l'axe horizontal
var Marge_unites_Y = 0; // Marge entre les unités de mesures et la grille sur l'axe vertical   
var Espace_grille_X; // Espace entre les lignes horizontales de la grille
var Espace_grille_Y; // Espace entre les lignes verticales de la grille
var valeur_N;

//** Tableaux **//
var trace_A = [];
var trace_B = [];
var trace_C = [];

function refresh() {
    calcul();
}

function calcul() {;
    valeur_N = parseInt(document.getElementById("input_N").value);

    //** Suite de Fibonacci **//
    var x = 1;
    var y = 1;
    var z = 1;

    for (i = 0; i <= valeur_N; i++) //-- tant que inférieur à la valeur de N saisie
    {
        trace_A[i] = z;

        z = x + y;

        if (i % 2 == 0) {
            y = z; // Tous les nombres pairs
        } else {
            x = z; // Tous les nombres impairs
        }
    }

    trace_B = [2, , , , , , , , , , 2];
    trace_C = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5];


    //** Calcum de PI **//
    //var sn = 1;
    //var snm1 = 0;
    //var tn = 0;
    //var signe = 1;
    //var k = 2*Math.sqrt(3);

    //for (i = 0; i <= valeur_N; i++) //-- tant que inférieur à la valeur de N saisie
    //{
    //tn = 1/(2*(n+2))/Math.pow(3,n+1);
    //signe = -signe;
    //snm1 = sn;
    //sn = sn+tn*signe;
    //trace_C[i] = k*sn;
    //}
    grille();
}

function grille() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000"; // Couleur des unités de la grille
    context.lineWidth = 1; // Epaisseur des tracés
    context.strokeStyle = "#999"; // Couleur des lignes de la grille

    //** Dessine les lignes verticales de la grille et écrit les valeurs **//
    Val_max_X = valeur_N + 1;
    Nb_colonnes = (Val_max_X - Val_min_X) / Interval_Unite_X;
    Espace_grille_X = (canvas.width - Espace_gauche_canvas - Espace_droite_canvas) / Nb_colonnes;
    var compteur = 0;
    var x;

    for (i = Val_min_X; i <= Val_max_X; i = i + Interval_Unite_X) {
        x = Espace_gauche_canvas + (Espace_grille_X * compteur);
        context.fillText("N+" + (i), x - 10, canvas.height);
        context.moveTo(x, Espace_haut_canvas - 1)
        context.lineTo(x, canvas.height - Espace_bas_canvas - 9)
        compteur++;
    }

    //** Dessine les lignes horizontales de la grille et écrit les valeurs **//
    Val_max_Y = (Math.ceil(trace_A[trace_A.length - 1] / Interval_Unite_Y)) * Interval_Unite_Y;
    Nb_lignes = (Val_max_Y - Val_min_Y) / Interval_Unite_Y;
    Espace_grille_Y = (canvas.height - Espace_haut_canvas - Espace_bas_canvas - 10) / Nb_lignes;
    var compteur2 = 0;
    var y;

    for (i = Val_max_Y; i >= Val_min_X; i = i - Interval_Unite_Y) {
        y = Espace_haut_canvas + (Espace_grille_Y * compteur2);
        context.fillText(i, Marge_unites_Y, y + Espace_haut_canvas);
        context.moveTo(Espace_gauche_canvas, y)
        context.lineTo(canvas.width - Espace_droite_canvas - 1, y)
        compteur2++;
    }
    context.stroke();

    //** Initialisation des des plotdata **//	
    context.strokeStyle = "#f00";
    context.lineWidth = 2;
    plotData(trace_A);
    context.strokeStyle = "#0f0";
    context.lineWidth = 2;
    plotData(trace_B);
    context.strokeStyle = "#00f";
    context.lineWidth = 2;
    plotData(trace_C);
    context.strokeStyle = "#00f";
    context.lineWidth = 2;
    plotData(trace_C);
}

function plotData(dataSet) {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(Espace_gauche_canvas, ((dataSet[i] - 0 - Val_min_Y) * -1 * Espace_grille_Y) + (Espace_grille_Y * (Nb_lignes - 2)) + Espace_haut_canvas);
    for (i = 0; i < Nb_colonnes; i++) {
        context.lineTo((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)));
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 1, 0, 2 * Math.PI, true);
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 1, 0, 2 * Math.PI, true);
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 1, 0, 2 * Math.PI, true);
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 2, 0, 2 * Math.PI, true);
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 2, 0, 2 * Math.PI, true);
        context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas * 2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 2, 0, 2 * Math.PI, true);
        //context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas*2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 3, 0, 2 * Math.PI, true);context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas*2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 3, 0, 2 * Math.PI, true);context.arc((i * Espace_grille_X / Interval_Unite_X) + Espace_gauche_canvas + (Espace_grille_X / Interval_Unite_X), canvas.height - Espace_bas_canvas*2 - ((dataSet[i] - 0 - Val_min_Y) * (Espace_grille_Y / Interval_Unite_Y)), 2, 0, 2 * Math.PI, true);
    }
    context.stroke();
}

function augmente_N() {
    valeur_N = parseInt(document.getElementById("input_N").value);
    document.getElementById("input_N").value = valeur_N + 1;
}

function diminue_N() {
    valeur_N = parseInt(document.getElementById("input_N").value);
    document.getElementById("input_N").value = valeur_N - 1;
}