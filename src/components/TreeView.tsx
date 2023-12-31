import { cn } from "@/utils/cn";

import { nanoid } from "nanoid";
import { useState } from "react";

import { HiOutlineChevronRight, HiOutlineChevronDown } from "react-icons/hi";
import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFile,
} from "react-icons/ai";

interface TreeViewProps {
  /**
   * Name of the item.
   */
  label: string;
  /**
   * Should this item appear expanded?
   */
  isExpanded?: boolean;
  /**
   * Is this the root element of the treeview? If so, don't show it, just show its children.
   */
  isRoot?: boolean;
  /**
   * Recursive list of TreeView item children
   */
  items?: TreeViewProps[];
}

/**
 * Recursive tree view component.
 */
export const TreeView = (props: TreeViewProps) => {
  const {
    items,
    label,
    isRoot,
    isExpanded: defaultExpandedState = false,
  } = props;

  const [isExpanded, setIsExpanded] = useState(defaultExpandedState);

  const hasChildren = items && items.length > 0;

  return isRoot ? (
    <div className="flex h-full w-full flex-col">
      {items?.map((item) => (
        <div key={nanoid()}>
          <TreeView {...item} />
        </div>
      ))}
    </div>
  ) : hasChildren ? (
    <div className="flex w-full flex-col text-sm dark:text-white">
      <button
        className="group flex items-center pb-1 pt-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm border border-transparent group-hover:border-primary-500 group-hover:bg-primary-500/20 group-hover:text-primary-500">
          {isExpanded ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
        </div>
        <div className="mr-2 text-xl">
          {items && items.length > 0 && isExpanded && <AiOutlineFolderOpen />}
          {items && items.length > 0 && !isExpanded && <AiOutlineFolder />}
        </div>

        {label}
      </button>
      <div className={cn(`hidden pl-4`, isExpanded && `block`)}>
        {items?.map((item) => (
          <div key={nanoid()}>
            <TreeView {...item} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-col text-sm text-neutral-600 dark:text-neutral-300">
      <div className="flex items-center pb-1 pt-1">
        <div className="ml-4 mr-2 text-xl">
          <AiOutlineFile />
        </div>
        {label}
      </div>
    </div>
  );
};
