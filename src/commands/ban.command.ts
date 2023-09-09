import { Player, world } from "@minecraft/server";
import Command, { TArgs } from "commands-builder/command";

export default class BanCommand extends Command {

    public name : string = 'ban'
    public description : string
    public alliases : Array<string>

    // TAG NEEDED TO EXECUTE THE COMMAND
    public permissions : Array<string> = ['admin', 'admin1']

    protected args : TArgs = {
        targetName : {
            require : (arg : string, args : Array<string>) => {
                return !!world.getPlayers().find(player => player.name === arg)
            },
            error : (arg : string, args : Array<string>) => {
                return "Acces Restricted!"
            },
            map : (arg : string) => {
                return world.getPlayers().find(player => player.name === arg)
            }
        },
        message : {
            require : (arg : string, args : Array<string>) => {
                return arg.length < 20
            },
            error : (arg : string, args : Array<string>) => {
                return "Unvalid message!"
            },
        }
    } 


    protected onExecute(sender : Player, args : object) : void {
        sender.sendMessage(`§cYou banned !`) // ${args.targetPlayer.name}
    }

}

new BanCommand()
