import { forwardFocus } from '~/ui/molecules/focus';
import { toFocus } from './signals';

export const FocusInput = forwardFocus<'input'>(
  ({ name }) => name === toFocus()?.name,
)(props => <input {...props} />);
