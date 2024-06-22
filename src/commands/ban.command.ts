import { Player, system } from '@minecraft/server';
import Command from 'commands-builder/command';

export default class BanCommand extends Command {
	public readonly name: Command['name'] = 'ban';
	public readonly description: string = 'This is a ban command!';
	public readonly alliases: Array<string> = ['b'];

	public readonly operatorOnly: boolean = true;

	// TAG NEEDED TO EXECUTE THE COMMAND
	public readonly permissions: Array<string> = ['admin', 'moderator'];

	public onExecute(sender: Player, args: Array<string>): void {
		sender.sendMessage(`§cYou banned ${args.join(' ')}!`);
	}
}
