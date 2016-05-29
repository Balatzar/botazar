const iconv     = require("iconv-lite");
const fs        = require("fs");
const Game      = require("../models/Game");
const Word      = require("../models/Word");
const Player = require("../models/Player");
import Watcher from "../../../services/slack/models/Watcher";
import { SendMessage, Message } from "../../../services/slack/types/types";

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

export default function(arrInput: string, objMessage: Message, funcOut: SendMessage) {

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

function playGame(arrInput: string, objMessage: Message, objGame, funcOut: SendMessage): void {
  if (arrInput.length !== 1) {
    return;
  }
  let strGuess: string = arrInput[0].toLowerCase();

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
  return;
}

function winGame(objGame, objMessage: Message, funcOut: SendMessage): void {
  const arrParticipants: string[] = objGame.participants;
  let hashFinalScore: Object = {};
  let strWinners: string = "";

  arrParticipants.forEach(p => {
    hashFinalScore[p] ? hashFinalScore[p] += 1 : hashFinalScore[p] = 1;
  });

  console.log(hashFinalScore)

  for (let player in hashFinalScore) {
    if (hashFinalScore.hasOwnProperty(player)) {
      Player.winGame({ username: player, points: hashFinalScore[player] });
      strWinners += player + " gagne " + hashFinalScore[player] + " points\n";
    }
  }

  const res: string = "yes c'est gagné !\n" +
          "le mot était *" + objGame.word + "*\n\n" +
          strWinners;

  funcOut(res);

  endGame(objGame, objMessage, { playing: false, });

}

function looseGame(objGame, objMessage: Message, funcOut: SendMessage): void {

  funcOut("nop c'est raté :/\nle mot était _" + objGame.word + "_");

  endGame(objGame, objMessage, { playing: false, points: 0 });

}

function endGame(objGame, objMessage: Message, set: Object) {

  Game.model.findByIdAndUpdate(objGame._id, { $set: set, $addToSet: { participants: objMessage.userName }}, function(err) {
    if (err) {
      console.log(err);
    }
  });

  Watcher.model.findOneAndUpdate( { activated: true, channel: objMessage.channel, app: "pendu" },
    { $set: { activated: false, }}, function(err) {
      if (err) {
        console.log(err);
      }
  });
}

function winRound(objGame, strGuess: string, objMessage: Message, funcOut: SendMessage): void {
  const strWord: string       = objGame.word.toLowerCase();
  const strCurrent: string    = objGame.current;
  let newCurrent: string      = "";
  let win: boolean            = true;

  for (let i = 0; i < strWord.length; i += 1) {
    if (strWord[i] === strGuess) {
      newCurrent += strGuess;
    } else {
      newCurrent += strCurrent[i];
      if (strCurrent[i] === ".") {
        win = false;
      }
    }
  }

  Game.model.findByIdAndUpdate( objGame._id, { $set: { current: newCurrent }, $push: { participants: objMessage.userName, played: strGuess }},
                                { new: true },
                                function(err, newGame) {
    if (err) {
      console.log(err);
    }
    console.log(newGame)
    if (win) {
      winGame(newGame, objMessage, funcOut);
    } else {
      funcOut("yes !\n" + newCurrent);
    }
  });

}

function looseRound(objGame, strGuess: string, objMessage: Message, funcOut: SendMessage): void {
  const intPoints: number = objGame.points - 1;

  if (!intPoints) {
    looseGame(objGame, objMessage, funcOut);
  } else {

    let res: string = "nope !\nil vous reste " + intPoints + " points\n" + objGame.current;

    if (intPoints === 3) {
      res += "\n*attention les accents comptent !*";
    }

    funcOut(res);

    Game.model.findByIdAndUpdate(objGame._id, { $inc: { points: -1 }, $push: { played: strGuess }}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

}

function createGame(objMessage: Message, funcOut: SendMessage): void {
  Word.model.findRandom().limit(1).exec(function (err, word) {
    if (err) {
      return console.log(err);
    }
    if (!word.length) {
      fs.readFile("src/apps/pendu/assets/liste_francais.txt", { encoding: "binary" }, function(err, file) {
        if (err) {
          return console.log(err);
        }
        funcOut("veuillez patienter quelques instants j'initialise mon dico");
        const sanitized: string = iconv.decode(file, "ISO-8859-1");
        sanitized.split("\r").forEach(w => {
          Word.createWord({ word: w.slice(1) });
        });
        setTimeout(function() {
          funcOut("ok j'ai initialisé mon dico, veuillez relancer le pendu s'il vous plait :)");
        }, 20000);
      });
    } else {
      const newWord: string = word[0].word;
      const toFind: string = newWord.replace(/./gi, ".");
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
