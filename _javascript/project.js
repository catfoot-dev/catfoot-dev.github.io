import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initClipboard,
  toc
} from './modules/plugins';

initSidebar();
initTopbar();
loadImg();
imgPopup();
initClipboard();
toc();
basic();
