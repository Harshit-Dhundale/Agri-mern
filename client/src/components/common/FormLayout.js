import './shared-styles.css';

export const FormLayout = ({ title, description, children }) => (
  <div className="form-layout">
    <div className="form-header">
      <h1>{title}</h1>
      {description && <p className="form-description">{description}</p>}
    </div>
    <div className="form-content">
      {children}
    </div>
  </div>
);