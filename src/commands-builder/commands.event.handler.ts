import { ChatSendBeforeEvent, ChatSendBeforeEventSignal, world } from '@minecraft/server';
import Command from './command';

export default class CommandsEventHandler {
	private static prefixes: Array<string> = ['!', '?'];
	private static registeredCommands: Array<Command> = [];

	private static event: any = world.beforeEvents.chatSend.subscribe((data) => CommandsEventHandler.onChat(data));

	private static onChat(data: ChatSendBeforeEvent) {
		let [sender, message] = [data.sender, data.message];

		if (!CommandsEventHandler.prefixes.some((prefix) => message.startsWith(prefix))) return;
		data.cancel = true;

		message = message.replace(new RegExp(`[${CommandsEventHandler.prefixes.join('')}]`, ''), '');

		const [commandName, ...args] = message.split(' ');

		for (const command of CommandsEventHandler.registeredCommands) {
			if (commandName !== command.name) continue;

			if (command.permissions && !command.permissions.every(perm => sender.hasTag(perm)))
                sender.sendMessage('§cYou don\'t have the permission to execute this command!')
		}
	}

	public static addCommand(command: Command): void {
		this.registeredCommands.push(command);
	}
}
