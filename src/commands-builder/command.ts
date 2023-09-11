import { Player, system, world } from '@minecraft/server';
import CommandsEventHandler from './commands.event.handler';

export default class Command {
	public readonly name: string;
	public readonly description: string;
	public readonly alliases: Array<string>;

	constructor() {
		this.register();
	}

	// TAG NEEDED TO EXECUTE THE COMMAND
	public readonly permissions: Array<string>;

	public onExecute(sender: Player, args: Array<string>): void {}

	private register() {
		CommandsEventHandler.addCommand(this);
	}
}
