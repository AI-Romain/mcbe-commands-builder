import { Player, world } from "@minecraft/server";
import CommandsEventHandler from "./commands.event.handler";

export type TArgs = {
    [argsName : string] : {
        error : (arg : string, args : Array<string>) => string,
        require : (arg : string, args : Array<string>) => boolean,
        map ?: (arg : string, args : Array<string>) => void,
    }
}

export default class Command {

    public name : string
    public description : string
    public alliases : Array<string>

    // TAG NEEDED TO EXECUTE THE COMMAND
    public permissions : Array<string>

    protected args : TArgs

    constructor () {
        CommandsEventHandler.addCommand(this)
    }

    protected onExecute(sender : Player, args : Array<string>) : void {
        
    }

}
