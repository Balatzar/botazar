export interface Command {
  syntax: string,
  description: string
}

interface HashTableCommand {
  [key: string]: Command
}

export interface App {
  strName: string,
  strEntry: string,
  regex: string,
  emitter: boolean,
  arrAliases: string,
  boolNamed: boolean,
  description: string,
  commands: HashTableCommand,
}