

module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";



};


/*

regarder si des games existent
  si oui regarder si un existe pour le channel émettant le message
    si oui vérifier les arguments
      - s'il n'y en pas exactement 1 sortir
      - autrement :
        regarder si c'est un mot
          - si oui regarder si c'est le bon
            si oui faire gagner
            sinon faire perdre un point et regarder si la game est perdue
              - si oui faire perdre
              - sinon envoyer le dessin
          - sinon regarder si le char est présent
            si oui ajouter la réponse
              - regarder si la reponse est complete
                si oui faire gagner
                sinon regarder si la game est perdue
                - si oui faire perdre
                - sinon envoyer le dessin

  sinon tenter de récupérer un mot random
    si aucun n'est trouvé lancer la fonction createDictionnary, en trouver un et passer à la suite
    créer un game avec le mot trouvé et générer un mot a trouver composé de _
    envoyer le mot à trouver et sa taille
    créer un watcher pour ce channel


*/