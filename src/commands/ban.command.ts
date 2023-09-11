import { Player, system } from '@minecraft/server';
import Command from 'commands-builder/command';

export default class BanCommand extends Command {
	public readonly name: string = 'ban';
	public readonly description: string;
	public readonly alliases: Array<string> = ['b'];

	// TAG NEEDED TO EXECUTE THE COMMAND
	public readonly permissions: Array<string> = ['admin', 'moderator'];

	public onExecute(sender: Player, args: Array<string>): void {
		sender.sendMessage(`§cYou banned ${args.join(' ')}!`);
	}
}

new BanCommand();
