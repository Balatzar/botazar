const fs      = require("fs");
const iconv   = require("iconv-lite");
const Game    = require("../models/Game");
const Word    = require("../models/Word");
const Watcher = require("../../../services/slack/models/Watcher");

// const accents = {
//   é: "e",
//   è: "e",
//   ë: "e",
//   ê: "e",
//   à: "a",
//   ù: "u",
//   ö: "o",
//   ô: "o",
//   î: "i",
//   ï: "i",
// };

module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";

  Game.model.findOne({ playing: true, channel: objMessage.channel }, function(err, game) {
    if (err) {
      return console.log(err);
    }
    console.log(game);
    if (game === null) {
      createGame(objMessage, funcOut);
    } else {
      playGame(arrInput, objMessage, game, funcOut);
      
    }
  });
};

function playGame(arrInput, objMessage, objGame, funcOut) {
  "use strict";
  if (arrInput.length !== 1) {
    return;
  }
  let strGuess = arrInput[0];

  // if (accents.keys().indexOf(strGuess) !== -1) {
  //   strGuess = accents[strGuess];
  // }

  if (strGuess.length > 1) {
    if (strGuess.length !== objGame.word.length) {
      return;
    }
    else if (strGuess.toLowerCase() === objGame.word.toLowerCase()) {
      winGame(objGame, objMessage, funcOut);
    } else {
      looseGame(objGame, objMessage, funcOut);
    }
  } else {
    if (objGame.played.indexOf(strGuess) !== -1) {
      return funcOut("vous avez deja joué cette lettre");
    }
    if (objGame.word.toLowerCase().indexOf(strGuess) !== -1) {
      winRound(objGame, strGuess, objMessage, funcOut);
    } else {
      looseRound(objGame, strGuess, objMessage, funcOut);
    }
  }
  return 0;
}

function winGame(objGame, objMessage, funcOut) {
  "use strict";
  const participants = objGame.participants;
  let winners = "";
  let plural = participants[0] !== objMessage.userName ? " et " + objMessage.userName : objMessage.userName;
  let gagner = participants[0] !== objMessage.userName ? " gagnent " : " gagne ";
  const add = participants.indexOf(objMessage.userName) ? plural : "";

  for (let i = 0; i < participants.length; i += 1) {
    if (i === participants.length - 1) {
      if (add) {
        winners += add;
      } else {
        winners += " et " + participants[i];
      }
    } else {
      winners += participants[i] + " ";
    }
  }

  const res = "yes c'est gagné !\n" +
          "le mot était *" + objGame.word + "*\n\n" +
          winners + gagner + objGame.points + " points !";

  funcOut(res);

  endGame(objGame, objMessage, { playing: false, });
  
}

function looseGame(objGame, objMessage, funcOut) {
  "use strict";

  funcOut("nop c'est raté :/\nle mot était _" + objGame.word + "_");

  endGame(objGame, objMessage, { playing: false, points: 0});
  
}

function endGame(objGame, objMessage, set) {
  "use strict";

  Game.model.findByIdAndUpdate(objGame._id, { $set: set, $addToSet: { participants: objMessage.userName }}, function(err) {
    if (err) {
      console.log(err);
    }
  });

  Watcher.model.findOneAndUpdate( { activated: true, channel: objMessage.channel, app: "pendu" },
                                  { $set: { activated: false, }},
                                  function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function winRound(objGame, strGuess, objMessage, funcOut) {
  "use strict";
  const strWord       = objGame.word.toLowerCase();
  const strCurrent    = objGame.current;
  let newCurrent      = "";
  let win             = true;

  for (let i = 0; i < strWord.length; i += 1) {
    if (strWord[i] === strGuess) {
      newCurrent += strGuess;
    } else {
      newCurrent += strCurrent[i];
      if (strCurrent[i] === "_") {
        win = false;
      }
    }
  }

  if (win) {
    winGame(objGame, objMessage, funcOut);
  } else {

    funcOut("yes !\n" + newCurrent);

    Game.model.findByIdAndUpdate( objGame._id, { $set: { current: newCurrent }, $addToSet: { participants: objMessage.userName, played: strGuess }},
                                  function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  
}

function looseRound(objGame, strGuess, objMessage, funcOut) {
  "use strict";
  const intPoints = objGame.points - 1;

  if (!intPoints) {
    looseGame(objGame, objMessage, funcOut);
  } else {

    funcOut("nope !\nil vous reste " + intPoints + " points\n" + objGame.current);

    Game.model.findByIdAndUpdate(objGame._id, { $inc: { points: -1 }, $push: { played: strGuess }}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

}

function createGame(objMessage, funcOut) {
  "use strict";
  Word.model.findRandom().limit(1).exec(function (err, word) {
    if (err) {
      return console.log(err);
    }
    if (!word.length) {
      fs.readFile("src/apps/pendu/assets/liste_francais.txt", { encoding: "binary" }, function(err, file) {
        if (err) {
          return console.log(err);
        }
        const sanitized = iconv.decode(file, "ISO-8859-1");
        sanitized.split("\r").forEach(w => {
          Word.createWord({ word: w.slice(1) });
        });
        funcOut("ok j'ai initialisé mon dico, veuillez relancer le pendu s'il vous plait :)");
      });
    } else {
      const newWord = word[0].word;
      const toFind = newWord.replace(/./gi, "_");
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