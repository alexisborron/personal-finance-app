import SectionCard from "../../components/SectionCard";
import CategoryCardHeader from "../../components/CategoryCardHeader";
import PotCardContent from "../Savings/PotCardContent";
import Button from "../../components/Button";

export default function PotsPage({ data }) {
  const pots = data.pots;

  return (
    <main>
      <div className="mb-400 flex items-center justify-between">
        <h1 className="text-heading">Pots</h1>
        <Button buttonStyles="primary-button" buttonText="+ Add New Pot" />
      </div>
      {pots.map((pot, index) => (
        <SectionCard key={`${pot}-${index}`}>
          <CategoryCardHeader
            headingText={pot.name}
            theme={pot.theme}
            menuItems={["Edit Pot", "Delete Pot"]}
            ariaLabelText="Open Edit Pot Menu"
          />
          <PotCardContent
            target={pot.target}
            total={pot.total}
            theme={pot.theme}
          />
        </SectionCard>
      ))}
    </main>
  );
}
