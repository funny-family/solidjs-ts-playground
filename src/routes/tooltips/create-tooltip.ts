import { Dynamic } from 'solid-js/web';


export var createTooltip = () => {
  return Dynamic;
};


// {...attrs}
// data-is-tooltip={true}
// data-tooltip-sr-notification={
//   attrs?.['data-tooltip-sr-notification'] || '; Has tooltip: '
// }
// class={`${attrs?.class || ''} solid-js-tooltip`}
// role={attrs?.role || labelName}
// tabindex={attrs?.tabindex || -1}
// aria-label={attrs?.['aria-label'] || labelName}
// aria-labelledby={attrs?.['aria-labelledby'] || labelName}
// aria-hidden={attrs?.['aria-hidden'] == null ? true : attrs['aria-hidden']}
// inert={attrs?.inert == null ? true : attrs.inert}