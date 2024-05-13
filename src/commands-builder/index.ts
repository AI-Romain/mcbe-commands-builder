import { REGISTERED_COMMANDS } from 'commands/commands.register';
import './commands.event.handler';
import CommandsEventHandler from './commands.event.handler';



async function registeredCommandsLoader() {
	for (let path of REGISTERED_COMMANDS) {
		try {

            if (path.startsWith('./')) path = path.substring(2, path.length)
            if (path.startsWith('/')) path = path.substring(1, path.length)
            
			const module = await import(`../commands/${path}`);
            const command = module.default
			CommandsEventHandler.addCommand(new command())
		} catch (error) {
			console.warn(`§c[CommandBuilder] : ERROR -> Command ../commands/${path} failed to load correcly !`);
		}
	}
}

registeredCommandsLoader();
