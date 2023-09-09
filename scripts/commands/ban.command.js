import { world } from "@minecraft/server";
import Command from "commands-builder/command";
export default class BanCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'ban';
        // TAG NEEDED TO EXECUTE THE COMMAND
        this.permissions = ['admin', 'admin1'];
        this.args = {
            targetName: {
                require: (arg, args) => {
                    return !!world.getPlayers().find(player => player.name === arg);
                },
                error: (arg, args) => {
                    return "Acces Restricted!";
                },
                map: (arg) => {
                    return world.getPlayers().find(player => player.name === arg);
                }
            },
            message: {
                require: (arg, args) => {
                    return arg.length < 20;
                },
                error: (arg, args) => {
                    return "Unvalid message!";
                },
            }
        };
    }
    onExecute(sender, args) {
        sender.sendMessage(`§cYou banned !`); // ${args.targetPlayer.name}
    }
}
new BanCommand();
