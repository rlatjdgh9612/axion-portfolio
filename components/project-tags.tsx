type ProjectTagsProps = {
  categoryLabel: string;
  tags: string[];
};

export function ProjectTags({ categoryLabel, tags }: ProjectTagsProps) {
  return (
    <div className="tag-list">
      <span>{categoryLabel}</span>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}
