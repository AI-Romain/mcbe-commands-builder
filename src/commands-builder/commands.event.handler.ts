import { ChatSendBeforeEvent, ChatSendBeforeEventSignal, Player, world } from '@minecraft/server';
import Command from './command';
import { COMMANDS_CONFIG } from './commands.config';

export default class CommandsEventHandler {
	private static prefixes: Array<string> = COMMANDS_CONFIG.prefixes;
	private static registeredCommands: Array<Command> = [];

	private static event: any = world.beforeEvents.chatSend.subscribe((data) => CommandsEventHandler.onChat(data));

	private static onChat(data: ChatSendBeforeEvent): void {
		let [sender, message] = [data.sender, data.message];

		if (!CommandsEventHandler.prefixes.some((prefix) => message.startsWith(prefix))) return;
		data.cancel = true;

		const [commandName, ...args] = CommandsEventHandler.formatMessage(message).split(' ');

		const command = CommandsEventHandler.getCommand(commandName);

		if (!command) return CommandsEventHandler.errorMessage(sender, 'commands.generic.unknown', commandName);

		if (command.permissions && !command.permissions.every((perm) => sender.hasTag(perm)))
			return CommandsEventHandler.errorMessage(sender, 'commands.tp.permission');

		command.onExecute(sender, args);
	}

	private static getCommand(name: string): Command {
		return CommandsEventHandler.registeredCommands.find(
			(command) => command.name.toLowerCase() === name.toLowerCase() || command.alliases?.includes(name.toLowerCase())
		);
	}

	private static errorMessage(player: Player, translate: string, fill?: string): void {
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

	public static getCommands() : Array<Command> {
		return CommandsEventHandler.registeredCommands
	}

	public static formatMessage(message: string): string {
		return message.replace(new RegExp(`[${CommandsEventHandler.prefixes.join('')}]`, ''), '');
	}

	public static addCommand(command: Command): void {
		CommandsEventHandler.registeredCommands.push(command);
	}
}
