# mcbe-commands-builder
This is a piece of code to create customs commands easier in mcbe.

⚠️ This system is made to create commands using class to get a clean and maintainable code. (One file, one class equal one command)

# How to use

First you need to import the commands handler into your main script file (ex: index.js)
file : ```index.js```
```ts
import './commands-builder/index';
```

Then, create a new file for the command, and make sur you create a new instance of it with the new keyword :
file : ```./commands/ban.command.ts```
```ts
import { Player } from "@minecraft/server";
import Command from "commands-builder/command";

export default class BanCommand extends Command {

    public readonly name : string = 'ban'
    public readonly  description : string = 'This is a ban command!'
    public readonly  alliases : Array<string> = ['b']

    public readonly operatorOnly: boolean = true;

    // TAG NEEDED TO EXECUTE THE COMMAND
    public readonly  permissions : Array<string> = ['admin', 'moderator']

    public onExecute(sender : Player, args : Array<string>) : void {
        sender.sendMessage(`§cYou banned ${args.join(' ')}!`)
    }

}
```

To finish, each time you create a new command in a new file, you need to register the file path like so:
file : ```./commands-builder/commands.register.ts```
```ts
export const REGISTERED_COMMANDS = [
    './ban.command', // path in the curretn directory (ex : "./admin/ban.command" or "/admin/claim-command" or "shop-command")
    '/help.command',
]
```

# Command Settings Explained

### General
In your command class you can set the command name, description, alliases and also permissions. Permissions is an array of tag that the player needed to execute the command.
In the command onExecute function you can use the sender and the command args.

### Prefixes
You can add prefixes you wanted in the commands config file.
By default their is only 2 prefixes '!' and '?'.
file : ```./commands-builder/commands.config.ts```
```ts
export const COMMANDS_CONFIG = {
    prefixes : ['!', '?'],
    helpCommand : ['help', 'aide'],
    helpCommandsByPage : 5
}
```

# Help Commands (!help)
This help show all registered commands.
You can configure how many commands are display each page in the  ```./commands-builder/commands.config.ts```.
This help command is almost the same as vanilla one, so it's translate for each languages (for green text).
![image](https://github.com/AI-Romain/mcbe-commands-builder/assets/127017159/c7688bc9-38a4-404f-b939-4ee004c62298)
