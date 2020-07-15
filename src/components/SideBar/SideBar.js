import React from 'react';
import { MdLightbulbOutline, MdLabelOutline } from 'react-icons/md';
import { BsBell, BsTrash } from 'react-icons/bs';
import { FaArchive } from 'react-icons/fa';
import TitledButton from './../../UI/TitledButton/TitledButton';

const SideBar = ({ classes, isExpanded }) => {
  return (
    <div className={classes}>
      <div className="flex flex-col h-screen h-full bg-white">
        <div>
          <TitledButton label="Note" isExpanded={isExpanded} isActive>
            <MdLightbulbOutline size="1.5em" />
          </TitledButton>
          <TitledButton label="Rappels" isExpanded={isExpanded}>
            <BsBell size="1.5em" />
          </TitledButton>
          <TitledButton label="javascript" isExpanded={isExpanded}>
            <MdLabelOutline size="1.5em" />
          </TitledButton>
          <TitledButton label="Projects" isExpanded={isExpanded}>
            <MdLabelOutline size="1.5em" />
          </TitledButton>
          <TitledButton label="Modifier les libellés" isExpanded={isExpanded}>
            <MdLabelOutline size="1.5em" />
          </TitledButton>
          <TitledButton label="Archive" isExpanded={isExpanded}>
            <FaArchive size="1.5em" />
          </TitledButton>

          <TitledButton label="Cordbeille" isExpanded={isExpanded}>
            <BsTrash size="1.5em" />
          </TitledButton>
        </div>
        {isExpanded && (
          <div className="mt-auto mt-auto">
            <div className="flex flex-wrap px-8 pb-8 text-sm">
              <a href="/">Confidentialité</a>
              <span className="px-2">&bull;</span>
              <a href="/">Conditions</a>
              <span className="px-2">&bull;</span>
              <a href="/">Licences Open Source</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
