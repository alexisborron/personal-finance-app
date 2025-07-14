import { useState } from "react";
import SectionCard from "../../components/SectionCard";
import CardHeader from "../../components/CardHeader";
import PotCardContent from "../Savings/PotCardContent";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { themes } from "../../data/themeOptions";
import PotModalContent from "../Savings/PotModalContent";

export default function PotsPage({ data }) {
  const pots = data.pots;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenChange = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <main>
        <div className="mb-400 flex items-center justify-between">
          <h1 className="text-heading">Pots</h1>
          <Button
            buttonStyles="primary-button"
            buttonText="+ Add New Pot"
            onClick={handleOpenChange}
          />
        </div>
        {pots.map((pot, index) => (
          <SectionCard key={`${pot}-${index}`}>
            <CardHeader
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

      <Modal
        dialogTitle={"Add New Pot"}
        isOpen={isModalOpen}
        onClose={handleOpenChange}
        buttonText="Add Pot"
        paragraphText="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
      >
        <PotModalContent themeItems={themes} />
      </Modal>
    </>
  );
}
