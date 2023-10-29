/**
 * AEM script
 */

const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

window[eventMethod](
  messageEvent,
  e => {
    if (typeof e.data === 'object' && e.data.event) {
      switch (e.data.event) {
        case 'resize-iframe':
          const frameSelector = e.data['frame-id'] ? e.data['frame-id'] : 'iframe';
          $(frameSelector).attr('height', e.data.height);
          break;

        case 'datalayer':
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(e.data.value);
          break;
      }
    }
  },
  false
);
/* postmessage events end */
