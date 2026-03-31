import { Link } from "react-router-dom";

type NavItem = {
  route: string;
  label: string;
};

type DocsButtonBarProps = {
  next?: NavItem;
  previous?: NavItem;
  prev?: NavItem;
};

const DocsButtonBar = ({ next, previous, prev }: DocsButtonBarProps) => {
  const backItem = previous || prev;

  return (
    <div className="docs-button-bar">
      {backItem ? (
        <Link to={backItem.route} className="docs-button docs-button-primary">
          FaArrowLeft
          <span>{backItem.label}</span>
        </Link>
      ) : null}

      {next ? (
        <Link to={next.route} className="docs-button docs-button-secondary">
          <span>{next.label}</span>
          FaArrowRight
        </Link>
      ) : null}
    </div>
  );
};

export default DocsButtonBar;
