import { Player } from "@minecraft/server";

export default class Command {

    public name : string
    public description : string
    public alliases : Array<string>

    // TAG NEEDED TO EXECUTE THE COMMAND
    protected permission : Array<string>

    protected permission : Array<string>


    protected onExecute(sender : Player, args : Array<string>) : void {

    }

}
