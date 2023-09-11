import Command from '../commands-builder/command';
import { COMMANDS_CONFIG } from '../commands-builder/commands.config';
import CommandsEventHandler from '../commands-builder/commands.event.handler';
export default class HelpCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'help';
        this.alliases = COMMANDS_CONFIG.helpCommand;
    }
    onExecute(sender, args) {
        let commandsByPage = this.sliceIntoChunks(CommandsEventHandler.getCommands().filter((command) => command.name !== this.name), COMMANDS_CONFIG.helpCommandsByPage);
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
            commandsByPage[currentPage - 1 || 0]?.map((command) => `${COMMANDS_CONFIG.prefixes[0]}${command.name} - ${command.description ?? 'None'}\n`),
        ];
        helpMessage.forEach((msg) => {
            if (!!msg)
                sender.sendMessage(msg);
        });
    }
    sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
}
new HelpCommand();
