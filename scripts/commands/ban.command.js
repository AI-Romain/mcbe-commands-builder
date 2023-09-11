import Command from 'commands-builder/command';
export default class BanCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'ban';
        this.alliases = ['b'];
        // TAG NEEDED TO EXECUTE THE COMMAND
        this.permissions = ['admin', 'moderator'];
    }
    onExecute(sender, args) {
        sender.sendMessage(`§cYou banned ${args.join(' ')}!`);
    }
}
new BanCommand();
