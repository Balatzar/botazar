module.exports = function(funcOut) {
  "use strict";
  const res = "Slack > Youtube\n" +
              "App qui met tous les liens youtube d'un channel dans une playlist dédiée, plus pratique pour tout écouter et garder une trace\n" +
              "Commandes dispo:\n" +
              "> Init pour initialiser l'app dans un channel\n" +
              "> create pour donner le code d'accès au bot (temporaire)\n" +
              "> list pour lister toutes les chansons d'un channel\n" +
              "et voila !\n";

  funcOut(res);
};
