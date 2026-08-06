import { Cloud } from './Cloud';

type CloudSectionProps = {
  sectionBgColor?: string;
};

export const CloudSection = ({
  sectionBgColor = 'var(--color-background)',
}: CloudSectionProps) => {
  return (
    <div style={{ marginBottom: '-1px' }}>
      <Cloud
        height='337px'
        scaleY={337 / 357}
        layers={[
          {
            color: 'var(--color-cloud-500)',
          },
          {
            color: 'var(--color-cloud-300)',
          },
          {
            color: sectionBgColor,
          },
        ]}
      />
    </div>
  );
};
