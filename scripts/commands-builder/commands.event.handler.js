import { world } from '@minecraft/server';
import { COMMANDS_CONFIG } from './commands.config';
class CommandsEventHandler {
    static onChat(data) {
        let [sender, message] = [data.sender, data.message];
        if (!CommandsEventHandler.prefixes.some((prefix) => message.startsWith(prefix)))
            return;
        data.cancel = true;
        const [commandName, ...args] = CommandsEventHandler.formatMessage(message).split(' ');
        const command = CommandsEventHandler.getCommand(commandName);
        if (!command)
            return CommandsEventHandler.errorMessage(sender, 'commands.generic.unknown', commandName);
        if (command.permissions && !command.permissions.every((perm) => sender.hasTag(perm)))
            return CommandsEventHandler.errorMessage(sender, 'commands.tp.permission');
        command.onExecute(sender, args);
    }
    static getCommand(name) {
        return CommandsEventHandler.registeredCommands.find((command) => command.name.toLowerCase() === name.toLowerCase() || command.alliases?.includes(name.toLowerCase()));
    }
    static errorMessage(player, translate, fill) {
        player.sendMessage({
            rawtext: [
                {
                    text: '§c',
                },
                {
                    translate: translate,
                    with: [`§c${fill}§c`],
                },
            ],
        });
    }
    static getCommands() {
        return CommandsEventHandler.registeredCommands;
    }
    static formatMessage(message) {
        return message.replace(new RegExp(`[${CommandsEventHandler.prefixes.join('')}]`, ''), '');
    }
    static addCommand(command) {
        CommandsEventHandler.registeredCommands.push(command);
    }
}
CommandsEventHandler.prefixes = COMMANDS_CONFIG.prefixes;
CommandsEventHandler.registeredCommands = [];
CommandsEventHandler.event = world.beforeEvents.chatSend.subscribe((data) => CommandsEventHandler.onChat(data));
export default CommandsEventHandler;
