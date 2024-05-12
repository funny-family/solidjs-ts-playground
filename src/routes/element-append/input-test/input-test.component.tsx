import {
  InputContainer,
  dataIsForwardElementAttrName,
} from '../components/input-container/input-container.component';
import { InputWithLabel } from '../components/input-with-label/input-with-label.component';
import { InputWithHelperText } from '../components/input-with-helper-text/input-with-helper-text.component';
import { TextInput } from '../components/text-input/text-input.component';
import { Label } from '../components/label/label.component';
import { HelperText } from '../components/helper-text/helper-text.component';
import { SelectInput } from '../components/select-input/select-input.component';
import styles from './input-test.module.css';
import { DateInput } from '../components/date-input/date-input.component';
import { VoidButton } from '../components/void-button/void-button.component';
import { InputWithResetButton } from '../components/input-with-reset-button/input-with-reset-button.component';
import resetButtonIconPath from '../images/reset-button.icon.svg';

export const InputTest = () => {
  const ResetButton = () => {
    return (
      <img
        style={/* @once */ { display: 'flex' }}
        src={/* @once */ resetButtonIconPath}
        alt={/* @once */ 'Reset button.'}
      />
    );
  };

  return (
    <div style={/* @once */ { margin: '2em' }}>
      <InputWithLabel label={/* @once */ <Label>Name</Label>}>
        <InputWithHelperText
          helperText={/* @once */ <HelperText>Bla, bla, bla...</HelperText>}
        >
          <InputContainer class={/* @once */ styles.input}>
            <TextInput />
          </InputContainer>
        </InputWithHelperText>
      </InputWithLabel>

      <hr />

      <InputWithLabel label={/* @once */ <Label>Choice</Label>}>
        <InputContainer class={/* @once */ styles.input}>
          <SelectInput name="choice" id="__sjhgf6873t4__">
            <option value="first">First Value</option>
            <option value="second" selected>
              Second Value
            </option>
            <option value="third">Third Value</option>
          </SelectInput>
        </InputContainer>
      </InputWithLabel>

      <hr />

      <InputWithLabel label={/* @once */ <Label>Select date</Label>}>
        <InputContainer class={/* @once */ styles.input}>
          <DateInput />
        </InputContainer>
      </InputWithLabel>

      <hr />

      <InputWithResetButton
        resetButton={
          /* @once */
          <VoidButton
            onClick={() => {
              const forwardElement = document.getElementById(
                '__uadh378465__'
              ) as HTMLInputElement | null;

              if (forwardElement != null) {
                forwardElement.value = '';
              }
            }}
          >
            <ResetButton />
          </VoidButton>
        }
      >
        <InputWithHelperText
          helperText={/* @once */ <HelperText>With reset button ;)</HelperText>}
        >
          <InputContainer class={/* @once */ styles.input}>
            <TextInput id="__uadh378465__" />
          </InputContainer>
        </InputWithHelperText>
      </InputWithResetButton>

      <hr />

      <InputWithResetButton
        resetButton={
          /* @once */
          <VoidButton
            onClick={() => {
              const forwardElement = document.getElementById(
                '__a7345jjfd__'
              ) as HTMLInputElement | null;

              if (forwardElement != null) {
                forwardElement.value = '';
              }
            }}
          >
            <ResetButton />
          </VoidButton>
        }
      >
        <InputContainer class={/* @once */ styles.input}>
          <DateInput id="__a7345jjfd__" />
        </InputContainer>
      </InputWithResetButton>
    </div>
  );
};
