function SectionHeader({ sectionId, title }) {
  const sectionLabels = {
    A: 'SECCIÓN A',
    B: 'SECCIÓN B',
    C: 'SECCIÓN C',
  };

  return (
    <div className="section-header">
      <span className="section-badge">{sectionLabels[sectionId]}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

export default SectionHeader;
