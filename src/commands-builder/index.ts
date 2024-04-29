import { REGISTERED_COMMANDS } from 'commands/commands.register';
import './commands.event.handler';

async function registeredCommandsLoader() {
	for (const path of REGISTERED_COMMANDS) {
		try {
			const module = await import(`../commands/${path}`);
            const command = module.default
			new command()
		} catch (error) {
			console.warn(`§c[CommandBuilder] : ERROR -> Command ../commands/${path} failed to load correcly !`);
		}
	}
}

registeredCommandsLoader();
