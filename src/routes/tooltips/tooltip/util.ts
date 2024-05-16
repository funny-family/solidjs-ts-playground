export var pipe = <
  TFn extends (element: HTMLElement, accessor: () => any) => void
>(
  fns: TFn[]
): TFn => {
  return (element: HTMLElement, accessor: () => any) => {
    return fns.reduce((acc, fn) => {
      return fn();
    }, null);
  };
};

/*
  tooltip = pipe([
    withPositions(positions),
    withLogging,
  ]) // -> ((element, accessor) => void)
*/

// var compose =
//   (...fns) =>
//   (arg, ...restArgs) =>
//     fns.reduce((acc, func) => func(acc, ...restArgs), arg);

// =========================

/*
  var tooltip = (element, accessor) => {
    createTooltip(element, accessor)
  };

  ...

  var tooltip = (element, accessor) => {
    withLogging(
      element,
      accessor,
    )(
      withPositions(
        element,
        accessor,
      )(
        createTooltip(element, accessor),
        positions,
      )
    )
  };

    var tooltip = (element, accessor) => {
    return (
      withPositions(
        element,
        accessor,
      )(
        withLogging(
          element,
          accessor,
        )(
          createTooltip(element, accessor),
        )
        positions,
      )
    );
  };
*/

export var isElementInViewport = <T extends HTMLElement>(element: T) => {
  var elementRect = element.getBoundingClientRect();
  var documentElement = document.documentElement;

  return (
    elementRect.top >= 0 &&
    elementRect.left >= 0 &&
    elementRect.bottom <=
      (window.innerHeight || documentElement.clientHeight) &&
    elementRect.right <= (window.innerWidth || documentElement.clientWidth)
  );
};
