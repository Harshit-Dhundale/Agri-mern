import './shared-styles.css';

export const ResultLayout = ({ title, children }) => (
  <div className="result-layout">
    <h2 className="result-title">{title}</h2>
    <div className="result-content">
      {children}
    </div>
  </div>
);