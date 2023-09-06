import { onMount } from 'solid-js';
import { Slider, type SliderRef } from '~/components/slider/slider.component';

export const Slide = () => {
  let sliderRef = null as unknown as SliderRef;

  onMount(() => {
    console.log({ sliderRef });
  });

  return (
    <div>
      <Slider ref={sliderRef} />
    </div>
  );
};

export default Slide;
