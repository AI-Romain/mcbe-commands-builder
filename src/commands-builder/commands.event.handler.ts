import { ChatSendBeforeEvent, Player, system, world } from '@minecraft/server';
import Command from './command';
import { COMMANDS_CONFIG } from './commands.config';

export default class CommandsEventHandler {
	private static prefixes: Array<string> = COMMANDS_CONFIG.prefixes;
	private static registeredCommands: Array<Command> = [];

	private static event: (data: ChatSendBeforeEvent) => void = world.beforeEvents.chatSend.subscribe((data) => CommandsEventHandler.onChat(data));

	private static onChat(data: ChatSendBeforeEvent): void {
		const { sender, message } = data;

		if (!CommandsEventHandler.prefixes.some((prefix) => message.startsWith(prefix))) return;
		data.cancel = true;

		const [commandName, ...args] = CommandsEventHandler.formatMessage(message).split(' ');
		const command = CommandsEventHandler.getCommand(commandName);

		if (!command) return CommandsEventHandler.errorMessage(sender, 'commands.generic.unknown', commandName);

		if ((command.permissions && !command.permissions.every((perm: string) => sender.hasTag(perm))) || (command.operatorOnly && !sender.isOp()))
			return CommandsEventHandler.errorMessage(sender, 'commands.tp.permission');

		system.run(() => command.onExecute(sender, args))
	}

	private static formatMessage(message: string): string {
		return message.replace(new RegExp(`[${CommandsEventHandler.prefixes.join('')}]`, ''), '');
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

	public static getCommands(): Array<Command> {
		return CommandsEventHandler.registeredCommands;
	}

	private static getCommand(name: string): Command {
		return CommandsEventHandler.registeredCommands.find(
			(command: Command) => command.name.toLowerCase() === name.toLowerCase() || command.alliases?.includes(name.toLowerCase())
		);
	}

	public static addCommand(command: Command): void {
		CommandsEventHandler.registeredCommands.push(command);
	}
}
