import { Player } from '@minecraft/server';
import Command from '../commands-builder/command';
import { COMMANDS_CONFIG } from '../commands-builder/commands.config';
import CommandsEventHandler from '../commands-builder/commands.event.handler';

export default class HelpCommand extends Command {
	public readonly name: string = 'help';
	public readonly alliases: Array<string> = COMMANDS_CONFIG.helpCommand;

	public onExecute(sender: Player, args: Array<string>): void {
		let commandsByPage = this.sliceIntoChunks(
			CommandsEventHandler.getCommands().filter((command: Command) => command.name !== this.name),
			COMMANDS_CONFIG.helpCommandsByPage
		);

		const pages = commandsByPage.length || 0;
		let currentPage = (Number(args[0]) > pages ? pages : Number(args[0])) || 1;

		const helpMessage = [
			{
				rawtext: [
					{
						text: '§2',
					},
					{
						translate: 'commands.help.header',
						with: [`${currentPage}`, `${pages}`],
					},
				],
			},
			commandsByPage[currentPage - 1 || 0]?.map(
				(command: Command) => `${COMMANDS_CONFIG.prefixes[0]}${command.name} - ${command.description ?? 'None'}\n`
			),
		];

		helpMessage.forEach((msg) => {
			if (!!msg) sender.sendMessage(msg);
		});
	}

	private sliceIntoChunks(arr: Array<any>, chunkSize: number) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}
}
