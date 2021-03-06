import { IconType } from '@/components/Icon';
import { action, computed, makeObservable, observable } from 'mobx';

interface PreferenceItem {
  icon: IconType;
  label: string;
}

interface PreferenceListItem extends PreferenceItem {
  id: number;
}

const predefinedItems: PreferenceItem[] = [
  { label: 'General', icon: 'settings' },
  { label: 'Account', icon: 'user' },
  { label: 'Appearance', icon: 'themes' },
  { label: 'Security', icon: 'security' },
  { label: 'Listed', icon: 'listed' },
  { label: 'Shortcuts', icon: 'keyboard' },
  { label: 'Accessibility', icon: 'accessibility' },
  { label: 'Get a free month', icon: 'star' },
  { label: 'Help & feedback', icon: 'help' },
];

export class Preferences {
  private readonly _items: PreferenceListItem[];
  private _selectedId = 0;

  constructor(items: PreferenceItem[] = predefinedItems) {
    makeObservable<Preferences, '_selectedId'>(this, {
      _selectedId: observable,
      selectedItem: computed,
      items: computed,
      selectItem: action,
    });

    this._items = items.map((p, idx) => ({ ...p, id: idx }));
    this._selectedId = this._items[0].id;
  }

  selectItem(id: number) {
    this._selectedId = id;
  }

  get items(): (PreferenceListItem & { selected: boolean })[] {
    return this._items.map((p) => ({
      ...p,
      selected: p.id === this._selectedId,
    }));
  }

  get selectedItem(): PreferenceListItem {
    return this._items.find((item) => item.id === this._selectedId)!;
  }
}
