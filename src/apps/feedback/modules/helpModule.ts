import { SendMessage } from "../../../services/slack/types/types";

export default function(out: SendMessage) {
  const help =  "Salut caca alors comme ça tu veux feedback?\n" +
                "Comme on est free du body ici tu peux aussi utiliser `feedback|fdb [type] [msg]`\n" +
                "Tu peux enregistrer des ​_idea_ / _bug_ / _msg_\n" +
                "Exemple : `botazar feedback bug 'le bot raconte n'importe quoi c'est embarassant'`";

  out(help);
};
