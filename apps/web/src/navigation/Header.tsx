import { Button, SunToMoonButton } from "erp-pro-ui";

import { useSearch } from "@/hooks/useSearch";

const Header = () => {
  const { toggleSearch } = useSearch();

  return (
    <div className="z-10 flex items-center justify-end gap-4 p-4">
      <div className="w-10">
        <SunToMoonButton showLabelAndImage={false} />
      </div>
      <div>
        <Button primary onClick={toggleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Header;
