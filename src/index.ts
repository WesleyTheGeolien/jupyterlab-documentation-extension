import {
  JupyterLab, JupyterLabPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  IFrame,
  InstanceTracker,
  MainAreaWidget,
} from '@jupyterlab/apputils';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import {
    Menu
} from '@phosphor/widgets';

import { URLExt } from '@jupyterlab/coreutils';

import '../style/index.css';


// Names of commands that will be used (fro jupyterlab)
namespace CommandIDs {
    export const addDocumentation = 'help:addDocumentation';
    export const open = 'customhelp:open';
}

/**
 * A flag denoting whether the application is loaded over HTTPS.
 */
const LAB_IS_SECURE = window.location.protocol === 'https:';

/**
 * The class name added to the help widget.
 */
const HELP_CLASS = 'jp-Help';

/**
 * Initialization data for the jupyterlab-documentation-extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-documentation-extension',
  autoStart: true,
  requires: [IMainMenu],
  activate : activate,
};

function activate (app: JupyterLab, mainmenu: IMainMenu, restorer: ILayoutRestorer) {
    let counter = 0;  
    const namespace = 'help-doc';
    console.log('JupyterLab extension jupyterlab-documentation-extension is activated!!');
    const { commands, shell } = app; // Pulling everything out of app
    const tracker = new InstanceTracker<MainAreaWidget>({ namespace });

 

    /**
     * Create a new HelpWidget widget.
     */
    function newHelpWidget(url: string, text: string): MainAreaWidget {
      let content = new IFrame();
      content.url = url;
      content.addClass(HELP_CLASS);
      content.title.label = text;
      content.id = `${namespace}-${++counter}`;
      let widget = new MainAreaWidget({ content });
      widget.addClass('jp-Help');
      return widget;
    }

    
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
    
      commands.addCommand(CommandIDs.open, {
    label: args => args['text'] as string,
    execute: args => {
      const url = args['url'] as string;
      const text = args['text'] as string;

      // If help resource will generate a mixed content error, load externally.
      if (LAB_IS_SECURE && URLExt.parse(url).protocol !== 'https:') {
        window.open(url);
        return;
      }

      let widget = newHelpWidget(url, text);
      tracker.add(widget);
      shell.addToMainArea(widget);
    }
  });
  
    generatedDocumentationMenu.addItem({ command : CommandIDs.addDocumentation, args: {'label' : 'test'}});
    generatedDocumentationMenu.addItem({ command : CommandIDs.open, args: {'text' : 'test1', 'url':'https://matplotlib.org/contents.html'}});
   
  // Add the command to the palette.
  mainmenu.helpMenu.addGroup(
      [
          {type : 'submenu' as Menu.ItemType, submenu : generatedDocumentationMenu}
      ],
      15
  );
}    

export default extension;
