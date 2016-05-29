import { SendMessage } from "../../../services/slack/types/types";

export default function(funcOut: SendMessage): void {
  const help: string =  "hello !\n" +
                "alors pour jouer c'est hyper simple il suffit de faire `botazar pendu`\n" +
                "vazi essaye ! :D";

  funcOut(help);
};
