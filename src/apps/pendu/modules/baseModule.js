const fs      = require("fs");
const iconv   = require('iconv-lite');
const Game    = require("../models/Game");
const Word    = require("../models/Word");
const Watcher = require("../../../services/slack/models/Watcher");

module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";

  Game.model.findOne({ playing: true, channel: objMessage.channel }, function(err, games) {
    if (err) {
      return console.log(err);
    }
    console.log(games)
    if (games === null) {
      createGame(objMessage, funcOut);
    } else {
      for (let i = 1; i < games.length; i += 1) {
        if (games[i].channel === objMessage.channel) {
          return playGame(arrInput, games[i], funcOut);
        }
      }
      createGame(objMessage, funcOut);
    }
  });
};

function playGame(arrInput, objGame, funcOut) {
  if (arrInput.length !== 1) {
    return;
  }
  const strGuess = arrInput[0];
  if (strGuess.length > 1) {
    if (strGuess.toLowerCase() === objGame.word.toLowerCase()) {
      winGame(objGame, funcOut);
    } else if (!objGame.points - 1) {
      looseGame(objGame, funcOut);
    } else {
      looseRound(objGame, funcOut);
    }
  } else {
    if (objGame.word.toLowerCase().indexOf(strGuess) !== -1) {
      winRound(objGame, funcOut);
    } else {
      looseRound(objGame, funcOut);
    }
  }
  return 0;
}

function createGame(objMessage, funcOut) {
  Word.model.findRandom().limit(1).exec(function (err, word) {
    if (err) {
      return console.log(err);
    }
    if (!word.length) {
      fs.readFile("src/apps/pendu/assets/liste_francais.txt", {encoding: 'binary'}, function(err, file) {
        if (err) {
          return console.log(err);
        }
        const sanitized = iconv.decode(file, "ISO-8859-1")
        sanitized.split("\r").forEach(w => {
          Word.createWord({ word: w.slice(1) });
        });
        funcOut("ok j'ai initilialisé mon dico, veuillez relancer le pendu s'il vous plait :)");
      })
    } else {
      const newWord = word[0].word;
      const toFind = newWord.replace(/./gi, '_');
      Game.createGame({
        channel: objMessage.channel,
        word: newWord,
        current: toFind,
      });
      Watcher.createWatcher({
        channel: objMessage.channel,
        app: "pendu",
      });
      funcOut("ok le mot à trouver contient " + toFind.length + " lettres !\n" + toFind);
    }
  });
}


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