import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '#components/select';
import { lang, setLang } from '#signals/lang';
import { onCleanup, type Component } from 'solid-js';
import type { Lang } from '~/utils/types';
import { LANGS } from '../constants/strings';

export const LangSwitcher: Component = () => {
  onCleanup(setLang.cancel);
  return (
    <_Select
      options={LANGS as unknown as Lang[]}
      defaultValue={lang()}
      placeholder="Votre choix"
      onChange={value => {
        if (value) setLang(value);
      }}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger class="w-20 mx-auto overflow-hidden cursor-pointer">
        <div class="w-11/12 text-left truncate">
          <SelectValue<string>>
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class="" />
    </_Select>
  );
};
