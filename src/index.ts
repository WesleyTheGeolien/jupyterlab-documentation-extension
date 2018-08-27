import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import {
    Menu
} from '@phosphor/widgets';

import '../style/index.css';


// Names of commands that will be used (fro jupyterlab)
namespace CommandIDs {
    export const addDocumentation = 'helpmenu:addDocumentation';
}

/**
 * Initialization data for the jupyterlab-documentation-extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-documentation-extension',
  autoStart: true,
  requires: [IMainMenu],
  activate : activate,
};

function activate (app: JupyterLab, mainmenu: IMainMenu) {
    console.log('JupyterLab extension jupyterlab-documentation-extension is activated!!');
    const { commands } = app; // Pulling everything out of app
    
    const generatedDocumentationMenu = new Menu({ commands });
    generatedDocumentationMenu.title.label = "Genererated Documentation";
    commands.addCommand(CommandIDs.addDocumentation, {
    label: args => {
    	let title = args['label'] as string;
	return title
     },
        execute: args => {
	const key = args['label'];
	return console.log(key);
        }
    });
    generatedDocumentationMenu.addItem({ command : CommandIDs.addDocumentation, args: {'label' : 'test'}});
    generatedDocumentationMenu.addItem({ command : CommandIDs.addDocumentation, args: {'label' : 'test1'}});
   
  // Add the command to the palette.
  mainmenu.helpMenu.addGroup(
      [
          {type : 'submenu' as Menu.ItemType, submenu : generatedDocumentationMenu}
      ],
      15
  );
}    

export default extension;
