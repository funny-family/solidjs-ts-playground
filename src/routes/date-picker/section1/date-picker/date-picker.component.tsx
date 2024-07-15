import './date-picker.styles.scss';

export var DatePicker = () => {
  return (
    <div style={{ border: '1px solid red', display: 'inline-block' }}>
      <input type="date" />

      <hr />

      <input type="text" />

      <hr />

      <div>
        <span
          role="spinbutton"
          aria-placeholder="mm"
          aria-label="Month"
          aria-valuemin="1"
          aria-valuemax="12"
        >
          mm
        </span>
        <span>/</span>
        <span
          role="spinbutton"
          aria-placeholder="dd"
          aria-label="Day"
          aria-valuemin="1"
          aria-valuemax="31"
        >
          dd
        </span>
        <span>/</span>
        <span
          role="spinbutton"
          aria-placeholder="yyyy"
          aria-label="Year"
          aria-valuemin="1"
          aria-valuemax="275760"
        >
          yyyy
        </span>
      </div>
    </div>
  );
};
