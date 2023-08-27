import { cn } from "~/utils/cn";

import { nanoid } from "nanoid";

interface TreeViewProps {
  items: TreeViewItem[];
}

interface TreeViewItem {
  label: string;
  children?: TreeViewItem[];
}

/**
 * Simple Tree View
 */
export const TreeView = (props: TreeViewProps) => {
  const { items } = props;

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <div key={nanoid()}>
          {item.label}
          {item.children && (
            <div className="ml-4">
              <TreeView items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
