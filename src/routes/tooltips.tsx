import { onCleanup, onMount } from 'solid-js';

var tooltip_marginBlock_CssVar = '--tooltip_margin-block' as const;
var tooltip_marginInline_CssVar = '--tooltip_margin-inline' as const;

var tooltips = (element: any, accessor: () => any) => {
  var option = accessor();

  onMount(() => {
    // ======================================================================
    var tooltipableRect = element.getBoundingClientRect();
    var tooltipableRectTop = `${tooltipableRect.top + window.scrollY}px`;
    var tooltipableRectLeft = `${tooltipableRect.left + window.scrollX}px`;

    element.setProperty('--tooltipable-width', tooltipableRect.width);
    element.setProperty('--tooltipable-height', tooltipableRect.height);

    element.setProperty(tooltip_marginBlock_CssVar, '0px');
    element.setProperty(tooltip_marginInline_CssVar, '0px');

    element.setProperty(
      '--tooltip_top-left-corner_translate_tx',
      `calc(-100% + var(${tooltip_marginBlock_CssVar}))`
    );
    element.setProperty(
      '--tooltip_top-left-corner_translate_ty',
      `calc(-100% - var(${tooltip_marginInline_CssVar}))`
    );

    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_tx',
    //   `calc(-100% + var(${tooltip_marginBlock_CssVar}))`
    // );
    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_ty',
    //   `calc(-100% - var(${tooltip_marginInline_CssVar}))`
    // );
    // ======================================================================

    console.log({
      element,
      option,
      rect: {
        value: tooltipableRect,
        top: tooltipableRectTop,
        left: tooltipableRectLeft,
      },
    });
  });

  onCleanup(() => {
    //
  });
};

const Tooltips = () => {
  return (
    <main>
      <section>
        <h1>What is Lorem Ipsum?</h1>
        <p>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the <b use:tooltips={[]}>1960s</b> with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </section>
    </main>
  );
};

export default Tooltips;
