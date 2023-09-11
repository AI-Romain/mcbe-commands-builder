import CommandsEventHandler from './commands.event.handler';
export default class Command {
    constructor() {
        this.register();
    }
    onExecute(sender, args) { }
    register() {
        CommandsEventHandler.addCommand(this);
    }
}
