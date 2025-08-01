import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionTriggerProps,
} from '@kobalte/core/accordion';
import { Accordion as AccordionPrimitive } from '@kobalte/core/accordion';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import {
  type ParentProps,
  type ValidComponent,
  splitProps,
} from 'solid-js';
import { cn } from '~/globals/ui/cn/utils';

export function Accordion<T extends ValidComponent = 'div'>(
  props: Parameters<typeof AccordionPrimitive<T>>[0],
) {
  return <AccordionPrimitive {...props} />;
}

// #region Item
type accordionItemProps<T extends ValidComponent = 'div'> =
  AccordionItemProps<T> & {
    class?: string;
  };

const AccordionItem = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, accordionItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as accordionItemProps, ['class']);

  return (
    <AccordionPrimitive.Item
      class={cn('border-b', local.class)}
      {...rest}
    />
  );
};
// #endregion

// #region Trigger
type accordionTriggerProps<T extends ValidComponent = 'button'> =
  ParentProps<
    AccordionTriggerProps<T> & {
      class?: string;
    }
  >;

const AccordionTrigger = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, accordionTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as accordionTriggerProps, [
    'class',
    'children',
  ]);

  return (
    <AccordionPrimitive.Header class='flex' as='div'>
      <AccordionPrimitive.Trigger
        class={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-shadow hover:underline focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring [&[data-expanded]>svg]:rotate-180',
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          class='h-4 w-4 text-muted-foreground transition-transform duration-200'
        >
          <path
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m6 9l6 6l6-6'
          />
          <title>Arrow</title>
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};
// #endregion

// #region Content
type accordionContentProps<T extends ValidComponent = 'div'> = ParentProps<
  AccordionContentProps<T> & {
    class?: string;
  }
>;

const AccordionContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, accordionContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as accordionContentProps, [
    'class',
    'children',
  ]);

  return (
    <AccordionPrimitive.Content
      class={cn(
        'animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down',
        local.class,
      )}
      {...rest}
    >
      <div class='pb-4 pt-0'>{local.children}</div>
    </AccordionPrimitive.Content>
  );
};
// #endregion

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
