import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import {
    Menu
} from '@phosphor/widgets';
import { JSONObject } from '@phosphor/coreutils';

import '../style/index.css';


// Names of commands that will be used (fro jupyterlab)
namespace CommandIDs {
    export const test = 'helpmenu:test';
    export const test2 = 'helpmenu:test2';
}

/**
 * Initialization data for the jupyterlab-documentation-extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-documentation-extension',
  autoStart: true,
  requires: [IMainMenu],
  activate : activateTEST,
};

function activateTEST (app: JupyterLab, mainmenu: IMainMenu) {
    console.log('JupyterLab extension jupyterlab-documentation-extension is activated!');
    const { commands } = app; // Pulling everything out of app
    
    const testMenu = new Menu({ commands });
    commands.addCommand(CommandIDs.test, {
        label : 'test',
        caption : 'This is a test item',
        execute: () => {
            console.log("1");
        }
    });
    commands.addCommand(CommandIDs.test2, {
        execute: () => {
            console.log("2");
        }
    });
    testMenu.title.label = "Genererated Documentation";
    let command = 'helpMenu:test';
    let args: JSONObject = {
        name : 'Add',
        label : 'add',
    }
   testMenu.addItem({ command, args   });
       testMenu.addItem({
       command : CommandIDs.test2,
       args: {name : 'Add2', label : 'add2'}
   });
  // Add the command to the palette.
  mainmenu.helpMenu.addGroup(
      [
          {type : 'submenu' as Menu.ItemType, submenu : testMenu}
      ],
      15
  );
}    

export default extension;