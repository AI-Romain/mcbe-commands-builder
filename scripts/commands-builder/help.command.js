import Command from './command';
import { COMMANDS_CONFIG } from './commands.config';
import CommandsEventHandler from './commands.event.handler';
export default class HelpCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'help';
        this.alliases = COMMANDS_CONFIG.helpCommand;
    }
    onExecute(sender, args) {
        const commands = CommandsEventHandler.getCommands().filter((command) => command.name !== this.name);
        let commandsByPage = this.sliceIntoChunks([
            {
                description: 'This is a ban command',
                name: 'ban',
            },
            {
                description: 'This is a warn command',
                name: 'warn',
            },
            {
                description: 'This command teleport you to the spawn',
                name: 'spawn',
            },
            {
                description: 'This command send a teleportation request to the mentionned player',
                name: 'tpa',
            },
            {
                description: 'This command enable fly',
                name: 'fly',
            },
            {
                description: '7',
                name: '7',
            },
            {
                description: '8',
                name: '8',
            },
            {
                description: '9',
                name: '9',
            },
            {
                description: '10',
                name: '10',
            },
            {
                description: '11',
                name: '11',
            },
            {
                description: '12',
                name: '12',
            },
            {
                description: '13',
                name: '13',
            },
            {
                description: '14',
                name: '14',
            },
        ], COMMANDS_CONFIG.helpCommandsByPage);
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
