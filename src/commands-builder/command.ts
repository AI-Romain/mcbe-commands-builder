import { Player, world } from '@minecraft/server';
import CommandsEventHandler from './commands.event.handler';

export type Tcommand = {
	name: string;
	description?: string;
	alliases?: Array<string>;
	permissions: Array<string>;
	onExecute: (sender: Player, args: Array<string>) => void;
};

export default class Command implements Tcommand {
	public readonly name: string;
	public readonly description: string;
	public readonly alliases: Array<string>;

	// TAG NEEDED TO EXECUTE THE COMMAND
	public readonly permissions: Array<string>;

	constructor() {
		CommandsEventHandler.addCommand(this);
	}

	public onExecute(sender: Player, args: Array<string>): void {}
}
