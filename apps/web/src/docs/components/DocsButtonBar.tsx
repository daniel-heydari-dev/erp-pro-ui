import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, Button } from "erp-pro-ui";

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
  const navigate = useNavigate();

  return (
    <div className="docs-button-bar">
      {backItem ? (
        <Button
          primary
          onClick={() => navigate(backItem.route)}
          className="min-w-[12rem] justify-between"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          <span>{backItem.label}</span>
        </Button>
      ) : null}

      {next ? (
        <Button
          onClick={() => navigate(next.route)}
          className="min-w-[12rem] justify-between"
        >
          <span>{next.label}</span>
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
};

export default DocsButtonBar;
