import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab-documentation-extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-documentation-extension',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab-documentation-extension is activated!');
  }
};

export default extension;
