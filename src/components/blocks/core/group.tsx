import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { cn } from '@src/lib/helpers/helper';

export const Group = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  const TagName = block.attrs?.tagName
    ? (block.attrs.tagName as keyof JSX.IntrinsicElements)
    : ('div' as keyof JSX.IntrinsicElements);

  if (!block.innerBlocks) return null;

  return (
    <TagName className={cn(className, block?.id, 'core-group')}>
      <Content content={block.innerBlocks} />
    </TagName>
  );
};
