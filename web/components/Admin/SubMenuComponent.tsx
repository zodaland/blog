import Chaser from '../Chaser';

import { SubMenuProps } from '../../interfaces';

const menus = ['main', 'board'];

const SubMenuComponent = ({ menu, setMenu }: SubMenuProps) => {
    return (
        <Chaser className="sub xl:flex justify-end hidden w-fit h-fit pl-auto" subject="Menu">
            <ul className="space-y-2 text-center">
                {menus.map((menuItem: string, key) => (
                    <li
                        className=" font-thin tracking-tighter"
                        key={key}
                        onClick={() => setMenu(menuItem)}
                    >
                        <span
                            className={
                                'cursor-pointer duration-150 ' +
                                (menuItem === menu ? 'text-sky-500 font-bold' : '')
                            }
                        >
                            {menuItem}
                        </span>
                    </li>
                ))}
            </ul>
        </Chaser>
    );
};

export default SubMenuComponent;
