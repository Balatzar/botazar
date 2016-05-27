export default function(out: (msg: string) => any) {
  "use strict";
  const help =  "Salut caca alors comme ça tu veux feedback?\n" +
                "Comme on est free du body ici tu peux aussi utiliser `feedback|fdb [type] [msg]`\n" +
                "Tu peux enregistrer des ​_idea_ / _bug_ / _msg_\n" +
                "Exemple : `botazar feedback bug 'le bot raconte n'importe quoi c'est embarassant'`";

  out(help);
};
