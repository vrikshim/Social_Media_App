import * as React from 'react';
import { ListContextValue } from '../useList/ListContext';
import { SelectOption } from '../useOption/useOption.types';
import { CompoundComponentContextValue } from '../utils/useCompound';
export type SelectProviderValue<Value> = CompoundComponentContextValue<Value, SelectOption<Value>> & ListContextValue<Value>;
export interface SelectProviderProps<Value> {
    value: SelectProviderValue<Value>;
    children: React.ReactNode;
}
/**
 * Sets up the contexts for the underlying Option components.
 *
 * @ignore - do not document.
 */
export default function SelectProvider<Value>(props: SelectProviderProps<Value>): React.JSX.Element;
