import { Button, SunToMoonButton } from "@erp-pro/ui";
import { useSearch } from "../context/SearchContext/useSearch";

interface HeaderProps {

}

const Header = ({ }: HeaderProps) => {
  const { toggleSearch } = useSearch();
  return (
    <div className=' z-10 flex justify-end p-4 gap-4 items-center' >
      <div className="w-10 ">
        <SunToMoonButton showLabelAndImage={false} />
      </div>
      <div>
        <Button primary onClick={toggleSearch} >  Search</Button>
      </div>
    </div>
  )
}

export default Header;
