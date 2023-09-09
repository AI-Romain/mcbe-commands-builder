import { world } from '@minecraft/server';
class CommandsEventHandler {
    static onChat(data) {
        let [sender, message] = [data.sender, data.message];
        if (!CommandsEventHandler.prefixes.some((prefix) => message.startsWith(prefix)))
            return;
        data.cancel = true;
        message = message.replace(new RegExp(`[${CommandsEventHandler.prefixes.join('')}]`, ''), '');
        const [commandName, ...args] = message.split(' ');
        for (const command of CommandsEventHandler.registeredCommands) {
            if (commandName !== command.name)
                continue;
            if (command.permissions && !command.permissions.every(perm => sender.hasTag(perm)))
                sender.sendMessage('§cYou don\'t have the permission to execute this command!');
        }
    }
    static addCommand(command) {
        this.registeredCommands.push(command);
    }
}
CommandsEventHandler.prefixes = ['!', '?'];
CommandsEventHandler.registeredCommands = [];
CommandsEventHandler.event = world.beforeEvents.chatSend.subscribe((data) => CommandsEventHandler.onChat(data));
export default CommandsEventHandler;
