import CommandsEventHandler from './commands.event.handler';
export default class Command {
    constructor() {
        CommandsEventHandler.addCommand(this);
    }
    onExecute(sender, args) { }
}
