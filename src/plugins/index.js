import { input } from './input';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { placeholders } from './placeholders';
import { history, customizeHistory } from './history';
import { buildKeymap } from './keymap';
import { navKeymap } from './navigation';
import { menuPlugin } from './menu';
import { spaces } from './spaces';


export function plugins(schema, options) {
  let plugins = [
    input(schema),
    keymap(navKeymap(options)),
    keymap(buildKeymap(schema)),
    keymap(baseKeymap),
    placeholders(options.placeholder),
    customizeHistory(),
    history({
      depth: 400, // number of history items to keep (default is 100)
      newGroupDelay: 3000, // ms since last edit before breaking history, the customizeHistory plugin breaks it usually
      preserveItems: true // must be true when using collab plugin
    }),
    spaces(),
    menuPlugin(),
    dropCursor(),
    gapCursor()
  ];

  return plugins;
}
