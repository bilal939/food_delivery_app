import { MenuItem } from './menu-item.model';

export interface GroupedMenuCategory {
  categoryId: number;
  categoryName: string;
  icon: string;
  items: MenuItem[];
}
