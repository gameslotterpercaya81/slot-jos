'use babel';

import SlotJosView from './slot-jos-view';
import { CompositeDisposable } from 'atom';

export default {

  slotJosView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotJosView = new SlotJosView(state.slotJosViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotJosView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-jos:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotJosView.destroy();
  },

  serialize() {
    return {
      slotJosViewState: this.slotJosView.serialize()
    };
  },

  toggle() {
    console.log('SlotJos was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
