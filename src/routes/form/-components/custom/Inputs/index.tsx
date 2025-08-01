import { context } from '#service';
import { deepEqual } from '#utils';
import { createMemo, For, type Component } from 'solid-js';
import { Input } from './Input';

export const Inputs: Component = () => {
  const each = createMemo(() => {
    const first = context(c => c.fields, deepEqual);
    return first()?.map((value, _id) => {
      const id = _id + 1;
      return {
        ...value,
        id,
      };
    });
  });

  return (
    <div class='w-full divide-y-2 divide-slate-300 flex flex-col'>
      <For each={each()} children={Input} />
    </div>
  );
};
